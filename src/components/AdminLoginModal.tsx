import React, { useState } from 'react';
import { Lock, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'BINAY' && password === 'B321') {
      setError('');
      onSuccess();
      onClose();
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] w-full max-w-sm overflow-hidden relative border border-slate-100"
            style={{ maxHeight: '85vh', overflowY: 'auto' }}
          >
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-full transition-all active:scale-95"
            >
              <X size={18} />
            </button>
            
            <div className="p-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={28} />
              </div>
              
              <h2 className="text-xl font-extrabold text-center text-slate-800 mb-1 tracking-tight">Privacy Admin</h2>
              <p className="text-center text-[11px] font-bold text-slate-400 mb-6 uppercase tracking-widest">Restricted Access</p>
              
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                    placeholder="Enter username"
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                    placeholder="Enter password"
                  />
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-semibold text-center bg-red-50 p-2 rounded-lg"
                  >
                    {error}
                  </motion.p>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] flex items-center justify-center gap-2 mt-2 text-sm"
                >
                  <Lock size={16} />
                  Confirm Access
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
