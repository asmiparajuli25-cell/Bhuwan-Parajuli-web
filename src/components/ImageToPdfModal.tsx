import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText, Trash2, Image as ImageIcon, Loader2, Eye, RefreshCw, Settings, Save, Layout, Download, ExternalLink } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface ImageToPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageToPdfModal({ isOpen, onClose }: ImageToPdfModalProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);
  const [pdfOrientation, setPdfOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: string[] = [];
      const files = Array.from(e.target.files) as File[];
      
      let loadedCount = 0;
      files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
          }
          loadedCount++;
          if (loadedCount === files.length) {
            setImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const triggerReplace = (index: number) => {
    setReplaceIndex(index);
    replaceInputRef.current?.click();
  };

  const handleReplaceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && replaceIndex !== null) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => {
            const newArray = [...prev];
            newArray[replaceIndex] = event.target!.result as string;
            return newArray;
          });
        }
        setReplaceIndex(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const clearAll = () => {
    setImages([]);
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const createPdfDocument = async () => {
    const doc = new jsPDF({
      orientation: pdfOrientation,
      unit: 'mm',
      format: 'a4'
    });
    
    for (let i = 0; i < images.length; i++) {
      const imgData = images[i];
      const img = await loadImage(imgData);
      
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      
      let finalWidth = pdfWidth;
      let finalHeight = (img.height * pdfWidth) / img.width;
      
      if (finalHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = (img.width * pdfHeight) / img.height;
      }
      
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      if (i > 0) {
        doc.addPage();
      }
      
      // Draw to a canvas to normalize as clean JPEG
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF'; // ensure white background for transparent PNGs
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const cleanJpeg = canvas.toDataURL('image/jpeg', 0.95);
        doc.addImage(cleanJpeg, 'JPEG', x, y, finalWidth, finalHeight);
      } else {
        // Fallback
        doc.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);
      }
    }
    return doc;
  };

  const generatePdf = async (action: 'save' | 'view') => {
    if (images.length === 0) return;
    setIsConverting(true);
    setErrorMsg(null);
    
    try {
      // Yield to React to show loading state
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const doc = await createPdfDocument();
      
      if (action === 'save') {
        doc.save('Converted_Photos.pdf');
      } else if (action === 'view') {
        const pdfBlob = new Blob([doc.output('arraybuffer')], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(pdfBlob);
        setPreviewUrl(blobUrl);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      setErrorMsg("Failed to generate PDF. Please try again. " + (error instanceof Error ? error.message : ""));
    } finally {
      setIsConverting(false);
    }
  };

  const handleClose = () => {
    setImages([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center lg:p-6 bg-slate-900/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white lg:rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col w-full h-full lg:h-auto lg:max-h-[85dvh] lg:max-w-4xl text-slate-800"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 sm:p-6 flex justify-between items-center text-white shrink-0 shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg hidden sm:block">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl leading-tight">Photos to PDF</h3>
              <p className="text-xs sm:text-sm text-emerald-100 hidden sm:block">Upload and convert images into a PDF document</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row bg-slate-50 relative">
          
          {/* Main Content Area */}
          <div className="flex-1 lg:overflow-y-auto p-4 sm:p-6 lg:border-r border-slate-200">
            {previewUrl ? (
              <div className="flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-4 sticky top-0 bg-slate-50 py-2 z-10">
                  <h4 className="font-bold text-lg text-slate-800 hidden sm:block">Preview</h4>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <a 
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-4 py-2 sm:py-2.5 bg-slate-800 text-white hover:bg-slate-700 rounded-lg sm:rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ExternalLink size={16} />
                      <span>Open tab</span>
                    </a>
                    <button 
                      onClick={() => setPreviewUrl(null)}
                      className="flex-1 sm:flex-none px-4 py-2 sm:py-2.5 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg sm:rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      Back
                    </button>
                  </div>
                </div>
                <div className="w-full lg:h-[600px] h-[500px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
                  <object 
                    data={previewUrl} 
                    type="application/pdf"
                    className="w-full h-full border-none" 
                  >
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white">
                      <FileText size={48} className="text-slate-400 mb-4" />
                      <p className="text-slate-600 mb-4 max-w-sm text-sm">Your mobile browser doesn't support automatic inline PDF previews.</p>
                      <a 
                        href={previewUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-medium transition-colors inline-block shadow-md w-full sm:w-auto"
                      >
                        View Full PDF
                      </a>
                    </div>
                  </object>
                </div>
              </div>
            ) : images.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center py-10 lg:py-0">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-emerald-100 text-center max-w-md w-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-emerald-500">
                    <ImageIcon size={32} className="sm:w-10 sm:h-10" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Upload Photos</h4>
                  <p className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8 px-4">
                    Select images to create your custom PDF document
                  </p>
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 sm:py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
                  >
                    <Upload size={20} />
                    Browse Photos
                  </button>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6 pb-6 lg:pb-0">
                <div className="flex items-center justify-between sticky top-0 bg-slate-50 pt-2 pb-4 z-10 border-b border-slate-200 lg:border-none lg:static lg:bg-transparent">
                  <h4 className="font-bold text-base sm:text-lg text-slate-800">
                    Selected ({images.length})
                  </h4>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 sm:px-4 py-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 sm:gap-2"
                    >
                      <Upload size={14} className="sm:w-4 sm:h-4" />
                      <span>Add</span>
                    </button>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <button 
                      onClick={clearAll}
                      className="px-3 sm:px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 sm:gap-2"
                    >
                      <Trash2 size={14} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Clear</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group aspect-[3/4] bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded backdrop-blur-md z-10">
                        {index + 1}
                      </div>
                      
                      <button 
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 sm:p-2 rounded-lg backdrop-blur-md z-10 shadow-sm transition-colors"
                        title="Remove"
                      >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                      </button>

                      <button 
                        onClick={() => triggerReplace(index)}
                        className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-slate-700 p-1.5 sm:p-2 rounded-lg backdrop-blur-md z-10 shadow-sm transition-colors border border-slate-200"
                        title="Replace"
                      >
                        <RefreshCw size={14} className="sm:w-4 sm:h-4" />
                      </button>
                      
                      <img 
                        src={img} 
                        alt={`Photo ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  
                  {/* Hidden input for replacing a single image */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={replaceInputRef}
                    onChange={handleReplaceFileChange}
                  />
                  
                  {/* Add more button tile */}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-[3/4] rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-500 hover:bg-emerald-50 transition-all gap-1 sm:gap-2"
                  >
                    <Upload size={20} className="sm:w-6 sm:h-6" />
                    <span className="text-[10px] sm:text-sm font-medium">Add Photo</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Controls */}
          {images.length > 0 && (
            <div className="w-full lg:w-72 xl:w-80 bg-white lg:border-l border-t lg:border-t-0 border-slate-200 flex flex-col shrink-0 sm:pb-0 z-20 sticky lg:static bottom-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] lg:shadow-none">
              <div className="p-4 sm:p-5 flex-1 lg:overflow-y-auto hidden lg:block">
                <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Settings size={18} className="text-emerald-600" />
                  PDF Settings
                </h4>
                
                <div className="space-y-6">
                  {/* Orientation Setting */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Layout size={16} />
                      Page Orientation
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setPdfOrientation('portrait')}
                        className={`py-3 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                          pdfOrientation === 'portrait' 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 relative' 
                            : 'border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-8 h-10 border-2 border-current rounded-sm"></div>
                        <span className="text-sm font-medium">Portrait</span>
                      </button>
                      <button 
                        onClick={() => setPdfOrientation('landscape')}
                        className={`py-3 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                          pdfOrientation === 'landscape' 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700 relative' 
                            : 'border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-10 h-8 border-2 border-current rounded-sm"></div>
                        <span className="text-sm font-medium">Landscape</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons for Both Mobile and Desktop */}
              <div className="p-3 sm:p-5 bg-white lg:bg-slate-50 border-t border-slate-200 space-y-2 sm:space-y-3 shrink-0">
                
                {/* Mobile Orientation Toggle (only shows on mobile) */}
                <div className="lg:hidden flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Layout size={14} />
                    Orientation:
                  </label>
                  <div className="flex bg-slate-100 rounded-lg p-1">
                     <button 
                        onClick={() => setPdfOrientation('portrait')}
                        className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${pdfOrientation === 'portrait' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600'}`}
                     >Portrait</button>
                     <button 
                        onClick={() => setPdfOrientation('landscape')}
                        className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${pdfOrientation === 'landscape' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600'}`}
                     >Landscape</button>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-2 sm:p-3 bg-red-50 text-red-600 rounded-lg sm:rounded-xl text-xs font-semibold border border-red-100 leading-tight">
                    {errorMsg}
                  </div>
                )}
                <div className="flex lg:flex-col gap-2 sm:gap-3">
                  <button 
                    onClick={() => generatePdf('view')}
                    disabled={isConverting}
                    className="flex-1 lg:w-full bg-slate-100 lg:bg-white border border-slate-200 lg:border-slate-300 hover:bg-slate-200 lg:hover:bg-slate-50 text-slate-700 font-medium py-2.5 sm:py-3.5 px-3 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConverting ? (
                      <Loader2 size={16} className="animate-spin text-emerald-500 sm:w-5 sm:h-5" />
                    ) : (
                      <>
                        <Eye size={16} className="text-slate-500 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Preview</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => generatePdf('save')}
                    disabled={isConverting}
                    className="flex-1 lg:w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 sm:py-3.5 px-3 rounded-xl shadow-[0_4px_12px_rgba(5,150,105,0.25)] flex items-center justify-center gap-1.5 sm:gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    {isConverting ? (
                      <>
                        <Loader2 size={16} className="animate-spin sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Saving...</span>
                      </>
                    ) : (
                      <>
                        <Download size={16} className="sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Download</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
