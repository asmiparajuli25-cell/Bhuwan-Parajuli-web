import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, X, Sparkles, Loader2, Download, Trash2, Search, Share2, Edit2, Copy, MoreHorizontal, MessageSquare, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface ImageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageGeneratorModal({ isOpen, onClose }: ImageGeneratorModalProps) {
  const [activeTab, setActiveTab] = useState<'image' | 'chat'>('image');
  
  // Image Generator State
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! I'm BiN AI. How can I help you today?"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  const handleChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatting) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: chatInput.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatting(true);

    try {
      const chatHistory = messages
        .filter(m => m.id !== '1')
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
        .join('\n');
      
      const fullPrompt = chatHistory 
        ? `${chatHistory}\nUser: ${userMessage.text}`
        : userMessage.text;

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: fullPrompt,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are BiN AI, a helpful assistant with access to real-time information. Provide accurate and real-world information.",
        }
      });

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "I'm sorry, I couldn't generate a response."
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I'm having trouble connecting right now. Please try again later."
      }]);
    } finally {
      setIsChatting(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: prompt }
          ]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      const newImages: string[] = [];
      const parts = response?.candidates?.[0]?.content?.parts || [];
      
      for (const part of parts) {
        if (part.inlineData) {
          newImages.push(`data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`);
        }
      }

      if (newImages.length === 0) {
        throw new Error("No images were returned by the AI.");
      }

      setGeneratedImages(newImages);

    } catch (err: any) {
      console.error("Image generation failed:", err);
      setError(err.message || "Failed to generate images. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imgUrl: string, index: number) => {
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = `generated-image-${index + 1}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDelete = () => {
    setGeneratedImages([]);
    setPrompt('');
  };

  const handleCopy = async (imgUrl: string) => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      alert('Image copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy image:', err);
      alert('Failed to copy image.');
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
            className="bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '85dvh' }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-white shrink-0">
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Sparkles size={20} className="text-yellow-300" />
                  BiN AI Tool
                </div>
                <button 
                  onClick={onClose}
                  className="sm:hidden text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex bg-white/20 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('image')}
                  className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'image' ? 'bg-white text-purple-600 shadow-sm' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <ImageIcon size={16} />
                  Image Gen
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 sm:flex-none px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'chat' ? 'bg-white text-purple-600 shadow-sm' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <MessageSquare size={16} />
                  Chatbot
                </button>
              </div>

              <button 
                onClick={onClose}
                className="hidden sm:block text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4 bg-slate-50">
              {activeTab === 'image' ? (
                <>
                  <div className="flex flex-col gap-2 shrink-0">
                    <label htmlFor="prompt" className="text-sm font-medium text-slate-700">
                      Describe the image you want to create
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        id="prompt"
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="e.g. A futuristic city skyline at sunset with flying cars..."
                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        disabled={isGenerating}
                      />
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 shrink-0"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <ImageIcon size={18} />
                            Generate
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 shrink-0">
                      {error}
                    </div>
                  )}

                  <div className="flex-1 min-h-[300px] bg-white rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative overflow-hidden group p-3">
                    {isGenerating ? (
                      <div className="flex flex-col items-center gap-4 text-slate-400">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles size={48} className="text-purple-400" />
                        </motion.div>
                        <p className="font-medium animate-pulse">Creating your masterpiece...</p>
                      </div>
                    ) : generatedImages.length > 0 ? (
                      <div className="w-full h-full grid grid-cols-1 gap-3 overflow-y-auto pr-1 place-items-center">
                        {generatedImages.map((img, idx) => (
                          <div 
                            key={idx} 
                            className={`relative group/item rounded-2xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 w-full max-w-sm aspect-square`}
                          >
                            <img 
                              src={img} 
                              alt={`${prompt} - variation ${idx + 1}`} 
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover will-change-transform"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover/item:opacity-100 transition-opacity duration-300">
                              <button 
                                onClick={() => handleCopy(img)} 
                                className="p-2 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-lg backdrop-blur-md transition-colors flex items-center gap-1.5"
                                title="Copy Image"
                              >
                                <Copy size={14} />
                                <span className="hidden sm:inline">Copy</span>
                              </button>
                              <button 
                                onClick={() => handleDownload(img, idx)} 
                                className="p-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium rounded-lg shadow-lg transition-colors flex items-center gap-1.5"
                                title="Download Image"
                              >
                                <Download size={14} />
                                <span className="hidden sm:inline">Download</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-slate-400">
                        <ImageIcon size={48} className="text-slate-300" />
                        <p className="text-center px-4">Your generated images will appear here in a beautiful gallery</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-3 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-blue-600 text-white rounded-tr-sm' 
                            : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                        }`}>
                          <div className="markdown-body text-sm">
                            <Markdown>{msg.text}</Markdown>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isChatting && (
                      <div className="flex gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                          <Bot size={16} />
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-100 rounded-tl-sm flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-3 border-t border-slate-100 bg-slate-50 shrink-0">
                    <form onSubmit={handleChat} className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                        disabled={isChatting}
                      />
                      <button
                        type="submit"
                        disabled={isChatting || !chatInput.trim()}
                        className="p-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                      >
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
