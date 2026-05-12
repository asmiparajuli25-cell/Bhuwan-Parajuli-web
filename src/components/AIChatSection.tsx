import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, Send, User, Bot, Loader2, Trash2, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function AIChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: "Hi! I'm BP AI Desk. Ask me any question!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setInput(prev => prev ? `${prev} ${finalTranscript}` : finalTranscript);
        } else if (interimTranscript) {
          // You could optionally display interim results somewhere, but for simplicity we'll just update input when final
          // Or we can just set input to interim, but it might overwrite previous text.
          // Let's just use final results for input to avoid overwriting.
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          alert('Microphone access was denied. Please allow microphone access to use voice search.');
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'model',
        text: "Hi! I'm BP AI Desk. Ask me any question!"
      }
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Build chat history for context
      const contents = messages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      
      contents.push({
        role: 'user',
        parts: [{ text: userMessage.text }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: contents,
        config: {
          systemInstruction: "You are BP AI Desk, a highly capable and helpful AI assistant. You must understand and respond fluently in both English and Nepali language. If the user asks in Nepali, reply in Nepali. Provide accurate, detailed, and helpful answers to ensure the best possible results.",
          temperature: 0.7,
          tools: [{ googleSearch: {} }],
        }
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || "Sorry, I couldn't generate a response."
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I encountered an error. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chat" className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <MessageSquare className="text-blue-400" size={32} />
            AI Q&A Chat
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 text-lg">
            Ask me anything! I'm here to help answer your questions.
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[500px] md:h-[600px] w-full">
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-2 text-slate-300">
              <Bot size={20} className="text-blue-400" />
              <span className="font-medium">BP AI Desk</span>
            </div>
            <button
              onClick={clearChat}
              className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-slate-700/50 flex items-center gap-2 text-sm"
              title="Clear Conversation"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'model' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                    <Bot size={18} className="text-blue-400 sm:w-5 sm:h-5" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 text-sm sm:text-base ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-700 text-slate-200 rounded-tl-none border border-slate-600'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-600 flex items-center justify-center shrink-0 border border-slate-500">
                    <User size={18} className="text-white sm:w-5 sm:h-5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 sm:gap-4 justify-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Bot size={18} className="text-blue-400 sm:w-5 sm:h-5" />
                </div>
                <div className="bg-slate-700 text-slate-200 rounded-2xl rounded-tl-none p-3 sm:p-4 border border-slate-600 flex items-center gap-3 text-sm sm:text-base">
                  <Loader2 size={18} className="animate-spin text-blue-400 sm:w-5 sm:h-5" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-2 sm:p-4 bg-slate-800 border-t border-slate-700">
            <form onSubmit={handleSend} className="flex gap-2 sm:gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 min-w-0 bg-slate-900 border border-slate-700 rounded-xl px-3 py-3 sm:px-5 sm:py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-sm sm:text-base"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading}
                className={`p-3 sm:p-4 rounded-xl transition-colors flex items-center justify-center shrink-0 ${
                  isListening 
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 animate-pulse' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
                title={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff size={18} className="sm:w-5 sm:h-5" /> : <Mic size={18} className="sm:w-5 sm:h-5" />}
              </button>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 text-white rounded-xl px-4 py-3 sm:px-6 sm:py-4 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline font-medium">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
