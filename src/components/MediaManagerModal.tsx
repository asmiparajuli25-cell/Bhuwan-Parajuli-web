import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image as ImageIcon, Video, Mic, Package, MessageSquare, Plus, Trash2, Upload, Box, Edit2, LogIn, Save } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { db, auth, storage, signInWithGoogle, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { onAuthStateChanged, User } from 'firebase/auth';

type MediaType = 'photo' | 'video' | 'audio' | 'status' | 'product';

interface MediaItem {
  id: string;
  type: MediaType;
  createdAt: number;
  title?: string;
  text?: string;
  price?: string;
  url?: string;
  userId: string;
}

interface MediaManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MediaManagerModal: React.FC<MediaManagerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<MediaType>('photo');
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Form states
  const [inputText, setInputText] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Edit states
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editInputTitle, setEditInputTitle] = useState('');
  const [editInputText, setEditInputText] = useState('');
  const [editInputPrice, setEditInputPrice] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen) {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchItems: MediaItem[] = [];
          snapshot.forEach((doc) => {
            fetchItems.push(doc.data() as MediaItem);
          });
          setItems(fetchItems);
        }, (error) => {
          console.error("Error fetching posts:", error);
          handleFirestoreError(error, OperationType.GET, 'posts');
        });
        return () => {
          unsubscribe();
        };
      } catch (error) {
         handleFirestoreError(error, OperationType.GET, 'posts');
      }
    }
  }, [isOpen]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePublish = async () => {
    if (!user) {
      alert("Please sign in to post.");
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const postId = uuidv4();
      const newItem: MediaItem = {
        id: postId,
        type: activeTab,
        createdAt: Date.now(),
        userId: user.uid,
      };

      if (activeTab === 'status') {
        if (!inputText.trim()) {
          alert('Status cannot be empty.');
          setIsUploading(false);
          return;
        }
        newItem.text = inputText;
      } else {
        if (!selectedFile) {
          alert('Please select a file.');
          setIsUploading(false);
          return;
        }
        
        newItem.title = inputTitle;
        if (activeTab === 'product') {
          if (!inputPrice) {
             alert('Please enter a price.');
             setIsUploading(false);
             return;
          }
          newItem.price = inputPrice;
          newItem.text = inputText;
        }
        
        // Instead of Firebase Storage, we convert the file to a base64 string and save it to Firestore directly.
        // We compress images to keep them under the 1MB Firestore document limit.
        let fileDataUrl = '';
        if (selectedFile.type.startsWith('image/')) {
           fileDataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => {
                 const img = new Image();
                 img.onload = () => {
                   const canvas = document.createElement('canvas');
                   let { width, height } = img;
                   const MAX_DIMENSION = 800; // Limit image size to prevent exceeding 1MB
                   if (width > height && width > MAX_DIMENSION) {
                     height *= MAX_DIMENSION / width;
                     width = MAX_DIMENSION;
                   } else if (height > MAX_DIMENSION) {
                     width *= MAX_DIMENSION / height;
                     height = MAX_DIMENSION;
                   }
                   canvas.width = width;
                   canvas.height = height;
                   const ctx = canvas.getContext('2d');
                   ctx?.drawImage(img, 0, 0, width, height);
                   resolve(canvas.toDataURL('image/jpeg', 0.7));
                 };
                 img.onerror = reject;
                 if (e.target?.result) img.src = e.target.result as string;
              };
              reader.onerror = reject;
              reader.readAsDataURL(selectedFile);
           });
        } else {
           // For audio/video, enforce a 700KB limit
           if (selectedFile.size > 700 * 1024) {
             alert('File is too large! Please select an audio or video file smaller than 700KB. Or compress it first.');
             setIsUploading(false);
             return;
           }
           fileDataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target?.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(selectedFile);
           });
        }
        
        newItem.url = fileDataUrl;
      }

      await setDoc(doc(db, 'posts', postId), newItem);
      
      // Reset form
      setInputText('');
      setInputTitle('');
      setInputPrice('');
      setSelectedFile(null);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error(err);
      handleFirestoreError(err, OperationType.CREATE, 'posts');
      alert("Failed to publish post.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (item: MediaItem) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, 'posts', item.id));
      } catch(e) {
        console.error("Delete failed.", e);
        handleFirestoreError(e, OperationType.DELETE, `posts/${item.id}`);
        alert("Delete failed.");
      }
    }
  };

  const startEdit = (item: MediaItem) => {
    setEditingItemId(item.id);
    setEditInputTitle(item.title || '');
    setEditInputText(item.text || '');
    setEditInputPrice(item.price || '');
  };

  const cancelEdit = () => {
    setEditingItemId(null);
  };

  const saveEdit = async (item: MediaItem) => {
    try {
      const updates: any = {};
      if (item.type !== 'status') updates.title = editInputTitle;
      updates.text = editInputText;
      if (item.type === 'product') updates.price = editInputPrice;

      await updateDoc(doc(db, 'posts', item.id), updates);
      setEditingItemId(null);
    } catch (e) {
      console.error("Failed to edit", e);
      handleFirestoreError(e, OperationType.UPDATE, `posts/${item.id}`);
      alert("Edit failed.");
    }
  };

  const getAcceptType = () => {
    switch (activeTab) {
      case 'photo': return 'image/*';
      case 'video': return 'video/*';
      case 'audio': return 'audio/*';
      case 'product': return 'image/*';
      default: return '*/*';
    }
  };

  const tabs: { id: MediaType, label: string, icon: React.ReactNode }[] = [
    { id: 'photo', label: 'Photos', icon: <ImageIcon size={18} /> },
    { id: 'product', label: 'Products', icon: <Package size={18} /> },
    { id: 'status', label: 'Statuses', icon: <MessageSquare size={18} /> },
    { id: 'video', label: 'Videos', icon: <Video size={18} /> },
    { id: 'audio', label: 'Audio', icon: <Mic size={18} /> },
  ];

  const filteredItems = items.filter(item => item.type === activeTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10 shrink-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Box className="w-6 h-6 text-blue-600" />
                Media & Updates Feed
              </h2>
              <p className="text-sm text-gray-500 mt-1">Everyone can view. Sign in to post, edit, or delete your own items.</p>
            </div>
            <div className="flex items-center gap-4">
              {!user ? (
                 <button onClick={handleLogin} className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                   <LogIn size={16} /> Sign In to Post
                 </button>
              ) : (
                 <div className="flex items-center gap-2">
                   <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} alt="User" className="w-8 h-8 rounded-full" />
                   <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate hidden sm:inline-block">{user.displayName || user.email}</span>
                 </div>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700 focus:outline-none ml-2"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
            {/* Sidebar / Tabs */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50 p-4 shrink-0 overflow-x-auto md:overflow-y-auto">
              <div className="flex md:flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                        setActiveTab(tab.id);
                        setSelectedFile(null);
                        setInputTitle('');
                        setInputText('');
                        setInputPrice('');
                        setUploadProgress(0);
                        setEditingItemId(null);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden bg-white">
               {/* Upload / Create Section */}
                 <div className="p-6 border-b border-gray-100 bg-slate-50/50">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {activeTab === 'status' ? 'Post a Status' : `Upload ${tabs.find(t => t.id === activeTab)?.label.slice(0, -1)}`}
                    </h3>
                    
                    <div className="flex flex-col gap-4 max-w-2xl">
                       {activeTab !== 'status' && (
                          <div>
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleFileChange} 
                              accept={getAcceptType()}
                              className="hidden" 
                            />
                            <div 
                              onClick={handleFileClick}
                              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${selectedFile ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}`}
                            >
                               {selectedFile ? (
                                 <div 
                                   className="relative w-full overflow-hidden" 
                                   onClick={(e) => {
                                      e.stopPropagation();
                                      handleFileClick();
                                   }}
                                 >
                                   <FilePreview file={selectedFile} activeTab={activeTab} />
                                   <button 
                                     onClick={(e) => {
                                         e.stopPropagation();
                                         setSelectedFile(null);
                                         if (fileInputRef.current) fileInputRef.current.value = '';
                                     }}
                                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100 shadow-sm transition"
                                     title="Remove file"
                                   >
                                     <X size={16} />
                                   </button>
                                 </div>
                               ) : (
                                 <div className="text-center text-gray-500">
                                   <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                                   <p className="font-medium">
                                      {user ? "Click to select a file" : "Select a file (requires sign in to upload)"}
                                   </p>
                                   <p className="text-xs mt-1">Supports {getAcceptType()}</p>
                                 </div>
                               )}
                            </div>
                            {isUploading && uploadProgress > 0 && selectedFile && (
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                              </div>
                            )}
                          </div>
                       )}

                       {(activeTab === 'photo' || activeTab === 'video' || activeTab === 'audio') && (
                         <input 
                           type="text" 
                           placeholder="Title (optional)" 
                           value={inputTitle}
                           onChange={(e) => setInputTitle(e.target.value)}
                           className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                         />
                       )}

                       {activeTab === 'product' && (
                         <>
                           <input 
                             type="text" 
                             placeholder="Product Name" 
                             value={inputTitle}
                             onChange={(e) => setInputTitle(e.target.value)}
                             className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                           />
                           <input 
                             type="text" 
                             placeholder="Price (e.g. $99.99)" 
                             value={inputPrice}
                             onChange={(e) => setInputPrice(e.target.value)}
                             className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                           />
                           <textarea 
                             placeholder="Product Description" 
                             value={inputText}
                             onChange={(e) => setInputText(e.target.value)}
                             className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[80px]"
                           />
                         </>
                       )}

                       {activeTab === 'status' && (
                         <textarea 
                           placeholder="What's happening?" 
                           value={inputText}
                           onChange={(e) => setInputText(e.target.value)}
                           className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[120px] resize-none"
                         />
                       )}

                       <div className="flex justify-start mt-2">
                         <button
                           onClick={user ? handlePublish : handleLogin}
                           disabled={user ? (isUploading || (activeTab === 'status' ? !inputText.trim() : !selectedFile)) : false}
                           className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                         >
                           {isUploading ? (
                             <>
                               <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                               {uploadProgress > 0 ? `${Math.round(uploadProgress)}%` : 'Processing...'}
                             </>
                           ) : (
                             <>
                               {!user ? <LogIn size={18} /> : (activeTab === 'status' ? <MessageSquare size={18} /> : <Upload size={18} />)}
                               {!user ? 'Sign In to Upload' : (activeTab === 'status' ? 'Post Status' : 'Upload File')}
                             </>
                           )}
                         </button>
                       </div>
                    </div>
                 </div>

               {/* Grid / Feed Area */}
               <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                  {filteredItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                       {tabs.find(t => t.id === activeTab)?.icon}
                       <p className="mt-4 font-medium text-lg text-gray-600">No {tabs.find(t => t.id === activeTab)?.label} yet</p>
                       <p className="text-sm mt-1 text-gray-400">Be the first to post something here.</p>
                    </div>
                  ) : (
                    <div className={`grid gap-6 ${activeTab === 'status' || activeTab === 'audio' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
                      {filteredItems.map(item => {
                         const isOwner = user?.uid === item.userId;
                         const isEditing = editingItemId === item.id;
                         return (
                           <div key={item.id} className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group relative">
                              {/* Owner Actions */}
                              {isOwner && !isEditing && (
                                <div className="absolute top-2 right-2 flex items-center gap-1 z-10 transition-opacity">
                                   <button 
                                     onClick={() => startEdit(item)}
                                     className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-blue-500 shadow-sm"
                                     title="Edit"
                                   >
                                     <Edit2 size={14} />
                                   </button>
                                   <button 
                                     onClick={() => handleDelete(item)}
                                     className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-red-500 shadow-sm"
                                     title="Delete"
                                   >
                                     <Trash2 size={14} />
                                   </button>
                                </div>
                              )}

                              {/* Media Display */}
                              {item.type === 'photo' && item.url && (
                                <div className="aspect-square bg-gray-100 overflow-hidden">
                                  <img src={item.url} alt={item.title || 'Photo'} className="w-full h-full object-cover" />
                                </div>
                              )}
                              {item.type === 'product' && item.url && (
                                <div className="aspect-square bg-gray-100 overflow-hidden">
                                  <img src={item.url} alt={item.title || 'Product'} className="w-full h-full object-cover" />
                                </div>
                              )}
                              {item.type === 'video' && item.url && (
                                <div className="aspect-video bg-black flex items-center justify-center overflow-hidden">
                                    <video src={item.url} controls className="max-w-full max-h-full" />
                                </div>
                              )}
                              {item.type === 'audio' && (
                                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative">
                                   {item.url ? (
                                       <audio src={item.url} controls className="w-full" style={{ minWidth: '200px' }} />
                                   ) : (
                                       <div className="w-full h-12 bg-gray-200 animate-pulse rounded-full"></div>
                                   )}
                                </div>
                              )}
                              
                              {/* Content Details / Edit Mode */}
                              <div className="p-4 flex-1 flex flex-col">
                                 {isEditing ? (
                                   <div className="flex flex-col gap-3">
                                      {item.type !== 'status' && (
                                        <input 
                                          type="text" 
                                          value={editInputTitle} 
                                          onChange={(e) => setEditInputTitle(e.target.value)} 
                                          placeholder="Title"
                                          className="w-full px-3 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                                        />
                                      )}
                                      {item.type === 'product' && (
                                        <input 
                                          type="text" 
                                          value={editInputPrice} 
                                          onChange={(e) => setEditInputPrice(e.target.value)} 
                                          placeholder="Price"
                                          className="w-full px-3 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 text-sm"
                                        />
                                      )}
                                      <textarea 
                                           value={editInputText} 
                                           onChange={(e) => setEditInputText(e.target.value)} 
                                           placeholder={item.type === 'status' ? "What's happening?" : "Description..."}
                                           className="w-full px-3 py-1.5 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 text-sm min-h-[80px]"
                                         />
                                      <div className="flex justify-end gap-2 mt-2">
                                        <button onClick={cancelEdit} className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 font-medium">Cancel</button>
                                        <button onClick={() => saveEdit(item)} className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1 font-medium">
                                          <Save size={12} /> Save
                                        </button>
                                      </div>
                                   </div>
                                 ) : (
                                   <>
                                     {item.type === 'status' ? (
                                        <p className="text-gray-800 whitespace-pre-wrap text-sm pt-2">{item.text}</p>
                                     ) : (
                                        <>
                                          {item.title && <h4 className="font-semibold text-gray-900 truncate truncate-2-lines">{item.title}</h4>}
                                          {item.type === 'product' && (
                                              <p className="text-blue-600 font-bold mt-1">{item.price}</p>
                                          )}
                                          {item.text && <p className="text-sm text-gray-500 mt-2 line-clamp-3">{item.text}</p>}
                                        </>
                                     )}
                                     
                                     <div className="mt-auto pt-3 flex items-center justify-between">
                                        <p className="text-xs text-gray-400">
                                          {new Date(item.createdAt).toLocaleString(undefined, {
                                            dateStyle: 'medium',
                                            timeStyle: 'short'
                                          })}
                                        </p>
                                     </div>
                                   </>
                                 )}
                              </div>
                           </div>
                         );
                      })}
                    </div>
                  )}
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MediaManagerModal;

const FilePreview: React.FC<{ file: File; activeTab: string }> = ({ file, activeTab }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!previewUrl) return null;

  if ((activeTab === 'photo' || activeTab === 'product') && file.type.startsWith('image/')) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img src={previewUrl} alt="Preview" className="h-full object-contain" />
      </div>
    );
  }

  if (activeTab === 'video' && file.type.startsWith('video/')) {
    return (
      <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
        <video src={previewUrl} controls className="max-h-full max-w-full" />
      </div>
    );
  }

  if (activeTab === 'audio' && file.type.startsWith('audio/')) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg w-full flex items-center justify-center">
        <audio src={previewUrl} controls className="w-full" />
      </div>
    );
  }

  return (
    <div className="text-center p-4 bg-white rounded-lg">
      <p className="font-medium text-gray-800">{file.name}</p>
      <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
      <div className="text-blue-600 text-sm mt-3 font-medium hover:underline">Change File</div>
    </div>
  );
};
