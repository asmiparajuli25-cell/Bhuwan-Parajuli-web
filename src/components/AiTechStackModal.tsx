import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Code, Cpu, Database, Blocks, Layout, Terminal, Bot, Server, Shield, Sparkles } from 'lucide-react';

interface AiTechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiTechStackModal({ isOpen, onClose }: AiTechStackModalProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'frontend' | 'tools' | 'languages'>('ai');

  if (!isOpen) return null;

  const stackDetails = {
    ai: {
      title: "AI & Machine Learning",
      icon: <Bot className="w-6 h-6 text-indigo-400" />,
      description: "The intelligent core of our system, powered by cutting-edge models.",
      items: [
        { name: "Google GenAI SDK", desc: "Interact directly with Google's Gemini models for text and image generation.", useCase: "Chatbots, translators, automated invoice generation.", code: "import { GoogleGenAI } from '@google/genai';" },
        { name: "Gemini 3.1 Pro", desc: "Advanced reasoning, instruction following, and code generation model.", useCase: "The core AI engine running the assistant.", code: "await ai.models.generateContent({ model: 'gemini-3.1-pro' });" }
      ]
    },
    languages: {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6 text-emerald-400" />,
      description: "The foundational syntax and logic driving the platform.",
      items: [
        { name: "TypeScript", desc: "A strongly typed programming language that builds on JavaScript.", useCase: "Ensuring type safety, preventing runtime errors, structuring complex logic.", code: "interface User { id: string; name: string; }" },
        { name: "JavaScript (ES6+)", desc: "Dynamically typed scripting language.", useCase: "Runtime evaluation and dynamic UI interactions.", code: "const data = await response.json();" },
        { name: "HTML5 / CSS3", desc: "Core web standards for structure and styling.", useCase: "Document layout and base semantic structure.", code: "<main class=\"app-container\">...</main>" }
      ]
    },
    frontend: {
      title: "Frontend Stack",
      icon: <Layout className="w-6 h-6 text-cyan-400" />,
      description: "Libraries and frameworks used to construct the user interface.",
      items: [
        { name: "React 19", desc: "A library for building web and native user interfaces.", useCase: "Component-based UI architecture.", code: "function Panel() { return <div>Ui Component</div> }" },
        { name: "Vite 6", desc: "Next Generation Frontend Tooling.", useCase: "Lightning fast HMR and optimized production builds.", code: "npm run dev" },
        { name: "Tailwind CSS v4", desc: "A utility-first CSS framework.", useCase: "Rapid UI development with semantic class names.", code: "<div className=\"flex items-center text-red-500\" />" },
        { name: "Framer Motion", desc: "A production-ready motion library for React.", useCase: "Fluid animations, spring transitions, and gesture controls.", code: "<motion.div animate={{ opacity: 1 }} />" }
      ]
    },
    tools: {
      title: "Tools & Ecosystem",
      icon: <Blocks className="w-6 h-6 text-pink-400" />,
      description: "Supporting libraries and infrastructure that bring features to life.",
      items: [
        { name: "Lucide React", desc: "Beautiful & consistent icons.", useCase: "Scalable vector graphics used throughout the app.", code: "<Bot size={24} />" },
        { name: "Recharts", desc: "A composable charting library built on React components.", useCase: "Rendering data visualizations like EMI calculators.", code: "<LineChart data={data} />" },
        { name: "jspdf & html2canvas", desc: "Client-side generation of PDF documents.", useCase: "Exporting invoices and placards to PDF.", code: "const pdf = new jsPDF(); pdf.save('doc.pdf');" },
        { name: "Firebase", desc: "Google's mobile platform that helps you quickly develop high-quality apps.", useCase: "Database, Serverless architecture, Authentication.", code: "import { getFirestore } from 'firebase/firestore';" }
      ]
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      >
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={onClose} />
        
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          className="relative w-full max-w-6xl h-[90vh] sm:h-[85vh] bg-slate-900 rounded-3xl border border-slate-700/50 shadow-2xl flex flex-col md:flex-row overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 bg-slate-800/50 hover:bg-slate-700 rounded-full text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Sidebar Navigation */}
          <div className="w-full md:w-80 bg-slate-950/50 border-r border-slate-800/50 flex flex-col shrink-0">
            <div className="p-6 md:p-8 border-b border-slate-800/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  <Cpu className="text-indigo-400 w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">System Info</h2>
              </div>
              <p className="text-slate-400 text-sm">Explore the tech stack, AI models, and tools powering this platform.</p>
            </div>

            <div className="flex overflow-x-auto md:flex-col md:overflow-visible p-4 gap-2 no-scrollbar">
              {(Object.keys(stackDetails) as Array<keyof typeof stackDetails>).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap md:whitespace-normal shrink-0 ${
                    activeTab === tab 
                      ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-inner' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {stackDetails[tab].icon}
                  {stackDetails[tab].title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-900/50 relative">
            <div className="p-6 md:p-10 max-w-4xl mx-auto">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-slate-800 rounded-2xl shadow-inner border border-slate-700/50">
                    {stackDetails[activeTab].icon}
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white">{stackDetails[activeTab].title}</h3>
                    <p className="text-slate-400 text-lg">{stackDetails[activeTab].description}</p>
                  </div>
                </div>

                <div className="space-y-6 mt-10">
                  {stackDetails[activeTab].items.map((item, index) => (
                    <motion.div 
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 transition-colors group"
                    >
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-2">
                            {item.name}
                            <Sparkles className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h4>
                          <p className="text-slate-300 mb-4">{item.desc}</p>
                          <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Use Case / Purpose</span>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.useCase}</p>
                          </div>
                        </div>
                        <div className="lg:w-1/3">
                          <div className="bg-[#0d1117] rounded-xl border border-slate-700/50 overflow-hidden h-full flex flex-col">
                            <div className="bg-slate-800/50 px-3 py-1.5 border-b border-slate-700/50 flex items-center gap-2">
                              <Terminal className="w-3 h-3 text-slate-400" />
                              <span className="text-xs text-slate-400 font-mono">Example Setup</span>
                            </div>
                            <div className="p-4 overflow-x-auto flex-1 flex items-center">
                              <code className="text-sm font-mono text-emerald-400">
                                {item.code}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
