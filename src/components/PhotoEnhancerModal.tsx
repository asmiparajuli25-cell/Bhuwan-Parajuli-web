import React, { useState, useRef } from 'react';
import { X, Upload, Download, Wand2, Sliders, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhotoEnhancerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultFilters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  sepia: 0,
  blur: 0,
};

export default function PhotoEnhancerModal({ isOpen, onClose }: PhotoEnhancerModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const [filters, setFilters] = useState(defaultFilters);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setFilters(defaultFilters);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAutoEnhance = () => {
    // Simulating an AI auto-enhance by applying an optimal "punchy" preset
    setFilters({
      brightness: 105,
      contrast: 115,
      saturation: 120,
      sepia: 0,
      blur: 0,
    });
  };

  const handleDownload = () => {
    if (!image || !canvasRef.current || !imageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match the original image
    canvas.width = imageRef.current.naturalWidth;
    canvas.height = imageRef.current.naturalHeight;

    // Apply filters to canvas context
    ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) sepia(${filters.sepia}%) blur(${filters.blur}px)`;
    
    // Draw the image onto the canvas
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

    // Create download link
    const link = document.createElement('a');
    link.download = 'enhanced-photo.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const filterStyle = {
    filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) sepia(${filters.sepia}%) blur(${filters.blur}px)`,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-700 rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden w-full max-w-4xl text-white"
        style={{ maxHeight: '85dvh' }}
      >
        {/* Header */}
        <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 text-blue-400 p-2 rounded-lg">
              <Wand2 size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Photo Enhancer</h3>
              <p className="text-xs text-slate-400">Upload and enhance your images</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {!image ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <label className="w-full max-w-md aspect-video border-2 border-dashed border-slate-600 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all group">
                <div className="p-4 bg-slate-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={32} className="text-blue-400" />
                </div>
                <h4 className="text-lg font-medium mb-2">Upload a photo</h4>
                <p className="text-sm text-slate-400 text-center px-4">
                  Click or drag and drop an image here to start enhancing
                </p>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          ) : (
            <>
              {/* Image Preview Area */}
              <div className="flex-1 bg-slate-950 p-4 sm:p-8 flex items-center justify-center relative overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Hidden canvas for downloading */}
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Actual image preview */}
                  <img 
                    ref={imageRef}
                    src={image} 
                    alt="Preview" 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-all duration-200"
                    style={filterStyle}
                  />
                </div>
                
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-4 left-4 bg-slate-800/80 hover:bg-slate-700 text-white px-4 py-2 rounded-lg backdrop-blur-sm text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Upload size={16} />
                  New Image
                </button>
              </div>

              {/* Controls Sidebar */}
              <div className="w-full lg:w-80 bg-slate-800 border-l border-slate-700 flex flex-col h-full overflow-y-auto">
                <div className="p-6 space-y-8">
                  {/* Auto Enhance Button */}
                  <div>
                    <button 
                      onClick={handleAutoEnhance}
                      className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                    >
                      <Wand2 size={18} />
                      Auto Enhance
                    </button>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-slate-300 mb-4">
                      <Sliders size={18} />
                      <h4 className="font-medium">Adjustments</h4>
                    </div>

                    {/* Brightness */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <label className="text-slate-400">Brightness</label>
                        <span className="text-blue-400">{filters.brightness}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="200" 
                        value={filters.brightness}
                        onChange={(e) => setFilters({...filters, brightness: Number(e.target.value)})}
                        className="w-full accent-blue-500"
                      />
                    </div>

                    {/* Contrast */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <label className="text-slate-400">Contrast</label>
                        <span className="text-blue-400">{filters.contrast}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="200" 
                        value={filters.contrast}
                        onChange={(e) => setFilters({...filters, contrast: Number(e.target.value)})}
                        className="w-full accent-blue-500"
                      />
                    </div>

                    {/* Saturation */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <label className="text-slate-400">Saturation</label>
                        <span className="text-blue-400">{filters.saturation}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="200" 
                        value={filters.saturation}
                        onChange={(e) => setFilters({...filters, saturation: Number(e.target.value)})}
                        className="w-full accent-blue-500"
                      />
                    </div>

                    {/* Sepia */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <label className="text-slate-400">Warmth (Sepia)</label>
                        <span className="text-blue-400">{filters.sepia}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="100" 
                        value={filters.sepia}
                        onChange={(e) => setFilters({...filters, sepia: Number(e.target.value)})}
                        className="w-full accent-blue-500"
                      />
                    </div>

                    {/* Blur */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <label className="text-slate-400">Blur</label>
                        <span className="text-blue-400">{filters.blur}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" max="20" step="0.5"
                        value={filters.blur}
                        onChange={(e) => setFilters({...filters, blur: Number(e.target.value)})}
                        className="w-full accent-blue-500"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-700 space-y-3">
                    <button 
                      onClick={() => setFilters(defaultFilters)}
                      className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <RefreshCw size={18} />
                      Reset Filters
                    </button>
                    <button 
                      onClick={handleDownload}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
                    >
                      <Download size={18} />
                      Download Image
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
