import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Search, Filter, ShoppingCart, Tag, MapPin, Image as ImageIcon, Heart, MessageCircle } from 'lucide-react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db, auth, signInWithGoogle, handleFirestoreError, OperationType } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  location: string;
  createdAt: number;
}

const CATEGORIES = ['Electronics', 'Vehicles', 'Real Estate', 'Fashion', 'Home Goods', 'Other'];
const CONDITIONS = ['New', 'Like New', 'Used', 'For Parts'];

export default function MarketplaceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthChecking(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const q = query(collection(db, 'marketplace_products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedProducts: Product[] = [];
      snapshot.forEach(doc => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(fetchedProducts);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'marketplace_products');
    });

    return () => unsubscribe();
  }, [isOpen]);

  const [activeTab, setActiveTab] = useState<'browse' | 'sell' | 'my-listings' | 'favorites'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('marketplace_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('marketplace_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product> & { priceString?: string }>({
    title: '',
    description: '',
    priceString: '',
    condition: 'New',
    category: 'Electronics',
    imageUrl: '',
    location: ''
  });

  const handleSell = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("You must be signed in to list a product.");
      try {
        await signInWithGoogle();
      } catch (e) {}
      return;
    }
    if (!newProduct.title || !newProduct.priceString) {
      alert("Title and Price are required.");
      return;
    }

    const productId = crypto.randomUUID();
    const product: Product = {
      id: productId,
      title: newProduct.title!,
      description: newProduct.description || '',
      price: Number(newProduct.priceString),
      condition: newProduct.condition || 'New',
      category: newProduct.category || 'Other',
      imageUrl: newProduct.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      sellerId: currentUser.uid,
      sellerName: currentUser.displayName || 'Anonymous User',
      location: newProduct.location || 'Unknown location',
      createdAt: Date.now()
    };

    try {
      await setDoc(doc(db, 'marketplace_products', productId), product);
      alert("Product listed successfully!");
      setActiveTab('browse');
      setNewProduct({
        title: '', description: '', priceString: '', condition: 'New', category: 'Electronics', imageUrl: '', location: ''
      });
    } catch (error) {
       handleFirestoreError(error, OperationType.CREATE, 'marketplace_products');
    }
  };

  const [selectedProductToBuy, setSelectedProductToBuy] = useState<Product | null>(null);
  const [buyerInfo, setBuyerInfo] = useState({ name: '', phone: '', address: '' });
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const handleBuy = (product: Product) => {
    setSelectedProductToBuy(product);
  };

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductToBuy || !buyerInfo.name || !buyerInfo.phone || !buyerInfo.address) {
      alert("Please fill out all fields.");
      return;
    }
    
    setIsSubmittingOrder(true);
    const orderId = crypto.randomUUID();
    
    const orderPayload: any = {
      id: orderId,
      productId: selectedProductToBuy.id,
      productTitle: selectedProductToBuy.title,
      price: selectedProductToBuy.price,
      buyerName: buyerInfo.name,
      buyerPhone: buyerInfo.phone,
      shippingAddress: buyerInfo.address,
      status: 'pending',
      createdAt: Date.now()
    };
    
    if (currentUser) {
      orderPayload.buyerId = currentUser.uid;
    }

    try {
      await setDoc(doc(db, 'marketplace_orders', orderId), orderPayload);
      alert(`Order placed successfully for ${selectedProductToBuy.title}!`);
      setSelectedProductToBuy(null);
      setBuyerInfo({ name: '', phone: '', address: '' });
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // newest first by default assuming standard listing order
  });

  const favoriteProducts = products.filter(p => favorites.includes(p.id));
  const myProducts = products.filter(p => currentUser ? p.sellerId === currentUser.uid : false);
  const isOwner = currentUser?.email === 'asmi.parajuli25@gmail.com';

  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-5 sm:p-6 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                  <ShoppingCart size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">BiN_Store</h2>
                  <p className="text-emerald-100 text-sm font-medium">Buy & sell items locally</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-95"
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-hide shrink-0">
              <button
                onClick={() => setActiveTab('browse')}
                className={`flex-1 py-4 px-4 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'browse' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
              >
                Browse Items
              </button>
              {isOwner && (
                <>
                  <button
                    onClick={() => setActiveTab('sell')}
                    className={`flex-1 py-4 px-4 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'sell' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                  >
                    Sell an Item
                  </button>
                  <button
                    onClick={() => setActiveTab('my-listings')}
                    className={`flex-1 py-4 px-4 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'my-listings' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                  >
                    My Listings
                  </button>
                </>
              )}
              <button
                onClick={() => setActiveTab('favorites')}
                className={`flex-1 py-4 px-4 text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'favorites' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
              >
                Favorites ({favorites.length})
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto bg-slate-50 min-h-[400px]">
              {activeTab === 'browse' && (
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                    <div className="shrink-0 flex gap-2">
                       <select
                         value={sortBy}
                         onChange={(e) => setSortBy(e.target.value as any)}
                         className="px-4 py-3 rounded-xl border border-slate-200 font-medium text-sm text-slate-600 focus:outline-none focus:border-emerald-400 bg-white"
                       >
                         <option value="newest">Newest First</option>
                         <option value="price-asc">Price: Low to High</option>
                         <option value="price-desc">Price: High to Low</option>
                       </select>
                    </div>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide shrink-0">
                     <button 
                       onClick={() => setSelectedCategory('All')} 
                       className={`px-4 py-2 rounded-xl border font-medium text-sm whitespace-nowrap transition-colors ${selectedCategory === 'All' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'}`}
                     >
                       All
                     </button>
                     {CATEGORIES.map(cat => (
                       <button 
                         key={cat}
                         onClick={() => setSelectedCategory(cat)} 
                         className={`px-4 py-2 rounded-xl border font-medium text-sm whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'}`}
                       >
                         {cat}
                       </button>
                     ))}
                  </div>

                  {/* Product Grid */}
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-700">No products found</h3>
                      <p className="text-slate-500 mt-1">Try adjusting your search or category filters.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map(product => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 overflow-hidden group flex flex-col">
                          <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                               <button 
                                 onClick={(e) => toggleFavorite(product.id, e)}
                                 className={`p-2 rounded-full backdrop-blur shadow-sm transition-colors ${favorites.includes(product.id) ? 'bg-rose-50 text-rose-500' : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white'}`}
                               >
                                 <Heart size={16} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                               </button>
                            </div>
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                              {product.condition}
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                               <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{product.title}</h3>
                               <span className="font-black text-emerald-600 shrink-0 ml-3">NRs. {product.price.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-slate-500 line-clamp-2 mb-3 flex-1">{product.description}</p>
                            
                            <div className="flex items-center gap-2 mb-4 text-xs font-medium text-slate-600">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.sellerName}`} alt="avatar" className="w-5 h-5 rounded-full bg-slate-200" />
                               <span>{product.sellerName}</span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                               <div className="flex items-center gap-1.5"><Tag size={14} className="text-slate-400"/> {product.category}</div>
                               <div className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {product.location}</div>
                            </div>
                            
                            <div className="flex gap-2 mt-auto">
                              <button onClick={() => handleBuy(product)} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors shrink-0">
                                 Buy Now
                              </button>
                              <button onClick={() => alert(`Messaging ${product.sellerName}...`)} className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors">
                                 <MessageCircle size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'sell' && (
                <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800">List a New Product</h3>
                    <p className="text-sm text-slate-500 mt-1">Fill out the details below to sell your item.</p>
                  </div>
                  <form onSubmit={handleSell} className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Title *</label>
                        <input 
                          type="text" 
                          required
                          value={newProduct.title}
                          onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                          placeholder="e.g. Vintage Leather Jacket" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                        <textarea 
                          rows={3}
                          value={newProduct.description}
                          onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                          className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none" 
                          placeholder="Describe the item, features, any flaws..." 
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price (NRs.) *</label>
                          <input 
                            type="number" 
                            required
                            min="0"
                            value={newProduct.priceString || ''}
                            onChange={e => setNewProduct({...newProduct, priceString: e.target.value})}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            placeholder="e.g. 1500" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Condition</label>
                          <select 
                            value={newProduct.condition}
                            onChange={e => setNewProduct({...newProduct, condition: e.target.value})}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                          >
                            {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
                          <select 
                            value={newProduct.category}
                            onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                          >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                          <input 
                            type="text" 
                            value={newProduct.location}
                            onChange={e => setNewProduct({...newProduct, location: e.target.value})}
                            className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            placeholder="e.g. Kathmandu" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Image</label>
                        <div className="flex gap-3">
                           <div className="relative flex-1">
                             <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                             <input 
                               type="text" 
                               value={newProduct.imageUrl || ''}
                               onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}
                               className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" 
                               placeholder="Or paste an image URL..." 
                             />
                           </div>
                           <label className="shrink-0 flex items-center justify-center px-4 py-3 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 font-semibold rounded-xl cursor-pointer transition-colors">
                              <span>+ Upload</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      if (ev.target?.result) {
                                        setNewProduct({...newProduct, imageUrl: ev.target.result as string});
                                      }
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                           </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                       <button type="button" onClick={() => setActiveTab('browse')} className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                          Cancel
                       </button>
                       <button type="submit" className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-sm shadow-emerald-600/30">
                          List Product
                       </button>
                    </div>
                  </form>
                </div>
              )}
              {(activeTab === 'favorites' || activeTab === 'my-listings') && (
                <div className="space-y-6">
                  {/* Grid */}
                  {((activeTab === 'favorites' ? favoriteProducts : myProducts).length === 0) ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-700">No products found</h3>
                      <p className="text-slate-500 mt-1">
                        {activeTab === 'favorites' ? "You haven't added any items to your favorites yet." : "You haven't listed any items for sale yet."}
                      </p>
                      {activeTab === 'favorites' && (
                         <button onClick={() => setActiveTab('browse')} className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-xl shadow-sm hover:bg-emerald-700 font-medium transition-colors">
                           Browse Items
                         </button>
                      )}
                      {activeTab === 'my-listings' && (
                         <button onClick={() => setActiveTab('sell')} className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-xl shadow-sm hover:bg-emerald-700 font-medium transition-colors">
                           List an Item
                         </button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(activeTab === 'favorites' ? favoriteProducts : myProducts).map(product => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 overflow-hidden group flex flex-col">
                          <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                               <button 
                                 onClick={(e) => toggleFavorite(product.id, e)}
                                 className={`p-2 rounded-full backdrop-blur shadow-sm transition-colors ${favorites.includes(product.id) ? 'bg-rose-50 text-rose-500' : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white'}`}
                               >
                                 <Heart size={16} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                               </button>
                            </div>
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
                              {product.condition}
                            </div>
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                               <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{product.title}</h3>
                               <span className="font-black text-emerald-600 shrink-0 ml-3">NRs. {product.price.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-slate-500 line-clamp-2 mb-3 flex-1">{product.description}</p>
                            
                            <div className="flex items-center gap-2 mb-4 text-xs font-medium text-slate-600">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.sellerName}`} alt="avatar" className="w-5 h-5 rounded-full bg-slate-200" />
                               <span>{product.sellerName}</span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                               <div className="flex items-center gap-1.5"><Tag size={14} className="text-slate-400"/> {product.category}</div>
                               <div className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400"/> {product.location}</div>
                            </div>
                            
                            <div className="flex gap-2 mt-auto">
                              <button onClick={() => handleBuy(product)} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors shrink-0">
                                 Buy Now
                              </button>
                              <button onClick={() => alert(`Messaging ${product.sellerName}...`)} className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors">
                                 <MessageCircle size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* Checkout Modal Overlay */}
    <AnimatePresence>
      {selectedProductToBuy && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative"
          >
             <button
                onClick={() => setSelectedProductToBuy(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X size={20} className="text-slate-500" />
              </button>
              
              <div className="bg-slate-50 p-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-800">Checkout</h3>
                <p className="text-sm text-slate-500 mt-1">Complete your order for {selectedProductToBuy.title}</p>
              </div>
              
              <div className="p-6">
                <div className="flex gap-4 items-center p-3 bg-slate-50 rounded-xl mb-6">
                  <img src={selectedProductToBuy.imageUrl} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-700 line-clamp-1">{selectedProductToBuy.title}</h4>
                    <p className="text-emerald-600 font-bold mt-1">NRs. {selectedProductToBuy.price.toLocaleString()}</p>
                  </div>
                </div>
                
                <form onSubmit={submitOrder} className="space-y-4">
                   <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                     <input 
                       type="text" required
                       value={buyerInfo.name}
                       onChange={e => setBuyerInfo({...buyerInfo, name: e.target.value})}
                       className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                     <input 
                       type="tel" required
                       value={buyerInfo.phone}
                       onChange={e => setBuyerInfo({...buyerInfo, phone: e.target.value})}
                       className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Delivery Address</label>
                     <textarea 
                       required rows={3}
                       value={buyerInfo.address}
                       onChange={e => setBuyerInfo({...buyerInfo, address: e.target.value})}
                       className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                     />
                   </div>
                   
                   <button type="submit" disabled={isSubmittingOrder} className="w-full py-3 mt-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-bold rounded-xl transition-colors shadow-sm">
                      {isSubmittingOrder ? 'Placing Order...' : 'Confirm Order'}
                   </button>
                </form>
              </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
