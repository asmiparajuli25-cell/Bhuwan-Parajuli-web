import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LayoutTemplate, Download, Languages, Palette, Type, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, Square } from 'lucide-react';
import html2canvas from 'html2canvas';

interface PlacardGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const backgrounds = [
  { id: 'gradient-1', class: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500', name: 'Magic' },
  { id: 'gradient-2', class: 'bg-gradient-to-tr from-amber-200 via-orange-400 to-rose-500', name: 'Sunset' },
  { id: 'gradient-3', class: 'bg-gradient-to-r from-emerald-400 to-cyan-400', name: 'Ocean' },
  { id: 'gradient-4', class: 'bg-gradient-to-b from-gray-900 to-gray-600', name: 'Dark' },
  { id: 'solid-1', class: 'bg-[#003893]', name: 'Nepal Blue' },
  { id: 'solid-2', class: 'bg-[#DC143C]', name: 'Crimson Red' },
  { id: 'solid-3', class: 'bg-white', name: 'Clean White' },
];

const templates = {
  english: {
    birthday: { title: 'Happy Birthday', message: 'Wishing you a day filled with happiness and a year filled with joy.' },
    newyear: { title: 'Happy New Year', message: 'May this new year bring you much joy and fun. May you find peace, love and success.' },
    festival: { title: 'Happy Holidays', message: 'Wishing you joy and peace during this holiday season.' },
    custom: { title: 'Your Title Here', message: 'Write your custom message here...' }
  },
  nepali: {
    birthday: { title: 'जन्मदिनको शुभकामना', message: 'तपाईँको जीवनमा सधैँ सुख, शान्ति र समृद्धि छाओस्, जन्मदिनको धेरै धेरै शुभकामना !' },
    newyear: { title: 'नयाँ वर्षको शुभकामना', message: 'नयाँ वर्षले तपाईको जीवनमा अपार खुसी र सफलता ल्याओस् ।' },
    festival: { title: 'चाडपर्वको शुभकामना', message: 'यस पावन अवसरमा तपाई र तपाईको परिवारमा सुख, शान्ति र सुस्वास्थ्यको कामना गर्दछौं।' },
    custom: { title: 'तपाईको शीर्षक यहाँ', message: 'तपाईको सन्देश यहाँ लेख्नुहोस्...' }
  }
};

export default function PlacardGeneratorModal({ isOpen, onClose }: PlacardGeneratorModalProps) {
  const [language, setLanguage] = useState<'english' | 'nepali'>('english');
  const [type, setType] = useState<keyof typeof templates.english>('birthday');
  
  const [title, setTitle] = useState(templates.english.birthday.title);
  const [message, setMessage] = useState(templates.english.birthday.message);
  const [topLabel, setTopLabel] = useState('');
  const [bottomLabel, setBottomLabel] = useState('');
  
  const [textAlign, setTextAlign] = useState<'text-left' | 'text-center' | 'text-right'>('text-center');
  const [frameStyle, setFrameStyle] = useState('border-0');
  
  const [bgClass, setBgClass] = useState(backgrounds[0].class);
  const [customBgImage, setCustomBgImage] = useState<string | null>(null);
  
  const [activeTextSection, setActiveTextSection] = useState<'title'|'message'|'labels'>('title');
  const [textStyles, setTextStyles] = useState({
    title: { font: 'font-sans', size: 'medium', color: 'text-white' },
    message: { font: 'font-sans', size: 'medium', color: 'text-white' },
    labels: { font: 'font-sans', size: 'medium', color: 'text-white' }
  });

  const updateTextStyle = (key: 'font' | 'size' | 'color', value: string) => {
    setTextStyles(prev => ({
      ...prev,
      [activeTextSection]: {
        ...prev[activeTextSection],
        [key]: value
      }
    }));
  };
  const placardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Handle template change
  const handleTypeChange = (newType: keyof typeof templates.english) => {
    setType(newType);
    setTitle(templates[language][newType].title);
    setMessage(templates[language][newType].message);
  };

  const handleLanguageChange = (newLang: 'english' | 'nepali') => {
    setLanguage(newLang);
    setTitle(templates[newLang][type].title);
    setMessage(templates[newLang][type].message);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomBgImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCustomImage = () => {
    setCustomBgImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const handleDownload = async () => {
    if (!placardRef.current) return;
    setIsExporting(true);
    try {
        const canvas = await html2canvas(placardRef.current, {
            scale: 2, // High quality
            useCORS: true,
            backgroundColor: null
        });
        
        const image = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = image;
        a.download = `placard-${Date.now()}.png`;
        a.click();
    } catch (err) {
        console.error("Failed to generate image", err);
        alert("Failed to generate image");
    } finally {
        setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-5xl overflow-hidden flex flex-col"
            style={{ maxHeight: '90dvh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-2 font-bold text-lg">
                <LayoutTemplate size={20} className="text-cyan-200" />
                BiNTech Placard Builder
              </div>
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
              
              {/* Left Panel: Settings */}
              <div className="w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto border-r border-slate-100 bg-slate-50 space-y-6">
                
                {/* Language & Type Selection */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Languages size={16} /> Language & Category
                  </h3>
                  <div className="flex gap-2">
                    <button 
                       onClick={() => handleLanguageChange('english')}
                       className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${language === 'english' ? 'bg-cyan-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                    >
                      English
                    </button>
                    <button 
                       onClick={() => handleLanguageChange('nepali')}
                       className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${language === 'nepali' ? 'bg-cyan-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                    >
                      नेपाली (Nepali)
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {(['birthday', 'newyear', 'festival', 'custom'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => handleTypeChange(t)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors capitalize ${type === t ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Type size={16} /> Content
                  </h3>
                  
                  <div>
                     <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                     <input 
                       type="text" 
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all font-medium"
                     />
                  </div>
                  
                  <div>
                     <label className="block text-xs font-medium text-slate-500 mb-1">Message</label>
                     <textarea 
                       value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       rows={3}
                       className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none"
                     />
                  </div>
                  
                    <div className="grid grid-cols-2 gap-3">
                    <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Top Label / To</label>
                       <input 
                         type="text" 
                         value={topLabel}
                         onChange={(e) => setTopLabel(e.target.value)}
                         placeholder="e.g. To John, / Dear..."
                         className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                       />
                    </div>
                    <div>
                       <label className="block text-xs font-medium text-slate-500 mb-1">Bottom Label / From</label>
                       <input 
                         type="text" 
                         value={bottomLabel}
                         onChange={(e) => setBottomLabel(e.target.value)}
                         placeholder="e.g. From Jane / Love..."
                         className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                       />
                    </div>
                  </div>

                  {/* Text Design Options */}
                  <div className="pt-2 border-t border-slate-200 mt-4 space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-medium text-slate-500">Typography & Alignment</label>
                        <select 
                          value={activeTextSection} 
                          onChange={(e) => setActiveTextSection(e.target.value as any)}
                          className="text-xs border border-slate-300 rounded outline-none px-2 py-1 bg-slate-50 text-slate-700 font-medium"
                        >
                          <option value="title">Title Text</option>
                          <option value="message">Message Text</option>
                          <option value="labels">Labels</option>
                        </select>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <button onClick={() => updateTextStyle('font', 'font-sans')} className={`px-3 py-1.5 text-xs font-sans rounded-md border ${textStyles[activeTextSection].font === 'font-sans' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>Sans</button>
                        <button onClick={() => updateTextStyle('font', 'font-serif')} className={`px-3 py-1.5 text-xs font-serif rounded-md border ${textStyles[activeTextSection].font === 'font-serif' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>Serif</button>
                        <button onClick={() => updateTextStyle('font', 'font-mono')} className={`px-3 py-1.5 text-xs font-mono rounded-md border ${textStyles[activeTextSection].font === 'font-mono' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>Mono</button>
                        
                        <div className="w-px bg-slate-200 mx-1"></div>
                        
                        <button onClick={() => updateTextStyle('color', 'text-white')} className={`w-6 h-6 rounded-full bg-white border border-slate-300 ${textStyles[activeTextSection].color === 'text-white' ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}></button>
                        <button onClick={() => updateTextStyle('color', 'text-slate-900')} className={`w-6 h-6 rounded-full bg-slate-900 border border-slate-700 ${textStyles[activeTextSection].color === 'text-slate-900' ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}></button>
                        <button onClick={() => updateTextStyle('color', 'text-yellow-400')} className={`w-6 h-6 rounded-full bg-yellow-400 border border-yellow-500 ${textStyles[activeTextSection].color === 'text-yellow-400' ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}></button>
                        <button onClick={() => updateTextStyle('color', 'text-[#003893]')} className={`w-6 h-6 rounded-full bg-[#003893] border border-[#002f7a] ${textStyles[activeTextSection].color === 'text-[#003893]' ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}></button>
                        <button onClick={() => updateTextStyle('color', 'text-rose-500')} className={`w-6 h-6 rounded-full bg-rose-500 border border-rose-600 ${textStyles[activeTextSection].color === 'text-rose-500' ? 'ring-2 ring-offset-1 ring-blue-500' : ''}`}></button>
                      </div>
                      
                      <div className="flex gap-2">
                        <button onClick={() => setTextAlign('text-left')} className={`p-2 rounded-md border ${textAlign === 'text-left' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}><AlignLeft size={16} /></button>
                        <button onClick={() => setTextAlign('text-center')} className={`p-2 rounded-md border ${textAlign === 'text-center' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}><AlignCenter size={16} /></button>
                        <button onClick={() => setTextAlign('text-right')} className={`p-2 rounded-md border ${textAlign === 'text-right' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}><AlignRight size={16} /></button>

                        <div className="w-px bg-slate-200 mx-1"></div>

                        <button onClick={() => updateTextStyle('size', 'small')} className={`px-3 py-1 rounded-md border text-xs ${textStyles[activeTextSection].size === 'small' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>A</button>
                        <button onClick={() => updateTextStyle('size', 'medium')} className={`px-3 py-1 rounded-md border text-sm ${textStyles[activeTextSection].size === 'medium' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>A</button>
                        <button onClick={() => updateTextStyle('size', 'large')} className={`px-3 py-1 rounded-md border text-base ${textStyles[activeTextSection].size === 'large' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>A</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appearance */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Palette size={16} /> Appearance
                  </h3>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2">Background Theme</label>
                    <div className="flex flex-wrap gap-2">
                       {backgrounds.map((bg) => (
                          <button
                            key={bg.id}
                            onClick={() => {
                              setBgClass(bg.class);
                              clearCustomImage();
                            }}
                            title={bg.name}
                            className={`w-10 h-10 rounded-full border-2 transition-transform ${bg.class} ${!customBgImage && bgClass === bg.class ? 'scale-110 border-blue-600 shadow-lg' : 'border-slate-200 hover:scale-105'}`}
                          />
                       ))}
                    </div>
                  </div>

                  <div className="mt-4">
                     <label className="block text-xs font-medium text-slate-500 mb-2">Or Use Custom Image</label>
                     <div className="flex items-center gap-3">
                       <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          id="placard-bg-upload" 
                          ref={fileInputRef}
                          onChange={handleImageUpload} 
                       />
                       <label 
                          htmlFor="placard-bg-upload" 
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all border ${customBgImage ? 'bg-cyan-50 text-cyan-700 border-cyan-200' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
                       >
                         <ImageIcon size={16} /> 
                         {customBgImage ? 'Image Uploaded' : 'Upload Image'}
                       </label>
                       {customBgImage && (
                          <button 
                             onClick={clearCustomImage}
                             className="text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-1"
                          >
                             Remove
                          </button>
                       )}
                     </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2 mt-4">Frame Design</label>
                    <div className="flex gap-2 mb-4">
                       <button onClick={() => setFrameStyle('border-0')} className={`px-3 py-1.5 rounded-md border text-xs font-medium ${frameStyle === 'border-0' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>None</button>
                       <button onClick={() => setFrameStyle('border-2 border-current')} className={`px-3 py-1.5 rounded-md border text-xs font-medium ${frameStyle === 'border-2 border-current' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>Thin</button>
                       <button onClick={() => setFrameStyle('border-[6px] border-current')} className={`px-3 py-1.5 rounded-md border text-xs font-medium ${frameStyle === 'border-[6px] border-current' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>Thick</button>
                       <button onClick={() => setFrameStyle('border-4 border-double border-current')} className={`px-3 py-1.5 rounded-md border text-xs font-medium ${frameStyle === 'border-4 border-double border-current' ? 'bg-cyan-100 border-cyan-300 text-cyan-800' : 'bg-white border-slate-200 text-slate-600'}`}>Double</button>
                    </div>
                  </div>
                </div>

              </div>
              
              {/* Right Panel: Preview Area */}
              <div className="w-full lg:w-1/2 bg-slate-100 flex flex-col p-4 sm:p-6 overflow-y-auto min-h-[400px]">
                <div className="flex justify-between items-center mb-4 shrink-0">
                  <h3 className="font-semibold text-slate-700">Live Preview</h3>
                  <button
                    onClick={handleDownload}
                    disabled={isExporting}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
                  >
                     {isExporting ? 'Generating...' : <><Download size={16} /> Download</>}
                  </button>
                </div>
                
                <div className="flex-1 flex items-center justify-center py-4">
                   <div className="w-full max-w-sm shrink-0">
                      
                      {/* PLACARD CANVAS */}
                      <div 
                         id="placard-canvas"
                         ref={placardRef}
                         className={`w-full aspect-[4/5] rounded-3xl shadow-2xl p-8 flex flex-col relative overflow-hidden transition-all duration-500 ${!customBgImage ? bgClass : 'bg-slate-900'}`}
                         style={{ transform: 'translateZ(0)' }} 
                      >
                         {customBgImage && (
                            <img 
                               src={customBgImage} 
                               alt="Custom Background" 
                               className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
                            />
                         )}
                         <div className={`flex flex-col h-full justify-between relative z-10 ${textAlign} ${frameStyle} p-4 sm:p-6 transition-all duration-300 rounded-2xl`}>
                            
                            <div className="mt-2 text-inherit">
                               {topLabel && (
                                   <p className={`font-medium opacity-80 mb-6 tracking-wider ${textStyles.labels.font} ${textStyles.labels.color} ${textStyles.labels.size === 'small' ? 'text-xs' : textStyles.labels.size === 'medium' ? 'text-sm' : 'text-base'}`}>
                                     {topLabel}
                                   </p>
                               )}
                               <h1 className={`font-black tracking-tighter leading-[1.05] mb-6 ${textStyles.title.font} ${textStyles.title.color} ${textStyles.title.size === 'small' ? 'text-4xl sm:text-5xl' : textStyles.title.size === 'medium' ? 'text-5xl sm:text-7xl' : 'text-6xl sm:text-8xl'} relative inline-block drop-shadow-2xl after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-2/5 after:h-2 after:bg-current after:rounded-full after:opacity-70`} style={{ textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                                 {title}
                               </h1>
                            </div>
                            
                            <div className="text-inherit relative mt-4">
                               <p className={`relative z-10 leading-relaxed font-bold p-6 sm:p-8 bg-white/15 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.15)] ${textStyles.message.font} ${textStyles.message.color} ${textStyles.message.size === 'small' ? 'text-lg sm:text-xl mb-2' : textStyles.message.size === 'medium' ? 'text-2xl sm:text-3xl mb-3' : 'text-3xl sm:text-4xl mb-4'} before:content-['"'] before:absolute before:-top-6 before:left-2 before:text-8xl before:opacity-20 before:font-serif before:leading-none before:-z-10`}>
                                 {message}
                               </p>
                            </div>

                            <div className="mb-2 text-inherit">
                               {bottomLabel && (
                                   <>
                                     <div className={`h-1 opacity-30 mt-8 mb-4 rounded-full ${textStyles.labels.color && textStyles.labels.color.includes('text') ? textStyles.labels.color.replace('text-', 'bg-') : 'bg-current'} ${textAlign === 'text-center' ? 'mx-auto w-12' : textAlign === 'text-right' ? 'ml-auto w-12' : 'w-12'}`}></div>
                                     <p className={`font-bold drop-shadow-sm ${textStyles.labels.font} ${textStyles.labels.color} ${textStyles.labels.size === 'small' ? 'text-base' : textStyles.labels.size === 'medium' ? 'text-lg' : 'text-xl'}`}>{bottomLabel}</p>
                                   </>
                               )}
                            </div>
                         </div>
                      </div>
                      
                   </div>
                </div>
                
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
