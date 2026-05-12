import React, { useState, useEffect } from 'react';
import { Map, X, Users, MapPin, ChevronDown, ChevronUp, Info, Loader2, Sparkles, BookOpen, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

const provinces = [
  { 
    name: 'Kosī (कोशी)', 
    districts: 14, 
    population: '4,961,412',
    districtNames: ['भोजपुर', 'धनकुटा', 'इलाम', 'झापा', 'खोटाङ', 'मोरङ', 'ओखलढुङ्गा', 'पाँचथर', 'सङ्खुवासभा', 'सोलुखुम्बु', 'सुनसरी', 'ताप्लेजुङ', 'तेह्रथुम', 'उदयपुर']
  },
  { 
    name: 'Madhesh (मधेश)', 
    districts: 8, 
    population: '6,114,600',
    districtNames: ['बारा', 'धनुषा', 'महोत्तरी', 'पर्सा', 'रौतहट', 'सप्तरी', 'सर्लाही', 'सिराहा']
  },
  { 
    name: 'Bagmati (बागमती)', 
    districts: 13, 
    population: '6,116,866',
    districtNames: ['भक्तपुर', 'चितवन', 'धादिङ', 'दोलखा', 'काठमाडौं', 'काभ्रेपलाञ्चोक', 'ललितपुर', 'मकवानपुर', 'नुवाकोट', 'रामेछाप', 'रसुवा', 'सिन्धुली', 'सिन्धुपाल्चोक']
  },
  { 
    name: 'Gandaki (गण्डकी)', 
    districts: 11, 
    population: '2,466,427',
    districtNames: ['बागलुङ', 'गोरखा', 'कास्की', 'लमजुङ', 'मनाङ', 'मुस्ताङ', 'म्याग्दी', 'नवलपुर', 'पर्वत', 'स्याङ्जा', 'तनहुँ']
  },
  { 
    name: 'Lumbini (लुम्बिनी)', 
    districts: 12, 
    population: '5,122,078',
    districtNames: ['अर्घाखाँची', 'बाँके', 'बर्दिया', 'दाङ', 'पूर्वी रुकुम', 'गुल्मी', 'कपिलवस्तु', 'परासी', 'पाल्पा', 'प्युठान', 'रोल्पा', 'रुपन्देही']
  },
  { 
    name: 'Karnali (कर्णाली)', 
    districts: 10, 
    population: '1,688,412',
    districtNames: ['दैलेख', 'डोल्पा', 'हुम्ला', 'जाजरकोट', 'जुम्ला', 'कालिकोट', 'मुगु', 'सल्यान', 'सुर्खेत', 'पश्चिम रुकुम']
  },
  { 
    name: 'Sudurpashchim (सुदूरपश्चिम)', 
    districts: 9, 
    population: '2,694,783',
    districtNames: ['अछाम', 'बैतडी', 'बझाङ', 'बाजुरा', 'डडेल्धुरा', 'दार्चुला', 'डोटी', 'कैलाली', 'कञ्चनपुर']
  },
];

interface NepalInfoWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NepalInfoWidget({ isOpen, onClose }: NepalInfoWidgetProps) {
  const [expandedProvince, setExpandedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [districtInfo, setDistrictInfo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleProvince = (name: string) => {
    if (expandedProvince === name) {
      setExpandedProvince(null);
    } else {
      setExpandedProvince(name);
    }
  };

  useEffect(() => {
    if (!selectedDistrict) {
      setDistrictInfo('');
      return;
    }

    const fetchDistrictInfo = async () => {
      setIsLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `Provide detailed, factual, and strictly structured information about the "${selectedDistrict}" district in Nepal. 
        Focus specifically on:
        - Municipalities: Name the metropolitan, sub-metropolitan municipalities, and rural municipalities (villages).
        - Demographics & Culture: Living conditions, primary languages spoken, major castes/ethnic groups, primary professions/occupations, and major local festivals.
        - Economics & Education: General level of education/literacy rate in the area, and an estimate on per capita income/economic status compared to the national average.
        
        Keep it concise, well-formatted using markdown (use bolding and bullet points), and easy to read. Exclude conversational filler. 
        CRITICAL: The ENTIRE response MUST be written in the Nepali language (नेपाली भाषामा).`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          }
        });

        setDistrictInfo(response.text || 'Information not available.');
      } catch (error) {
        console.error('Failed to fetch district info:', error);
        setDistrictInfo('Failed to load district information. Please check your connection or try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistrictInfo();
  }, [selectedDistrict]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[420px] bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/40 overflow-hidden flex flex-col max-h-[65vh]"
        >
          <div className="bg-gradient-to-r from-red-600 to-blue-800 p-4 text-white flex justify-between items-center shrink-0 shadow-sm relative z-10">
            <h3 className="font-bold flex items-center gap-2 text-[15px]">
              <Map size={18} className="text-white/90" />
              नेपाल जनसांख्यिकी र जानकारी
            </h3>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-all p-1.5 rounded-full hover:bg-white/20 active:scale-95">
              <X size={18} />
            </button>
          </div>
            
            <div className="p-0 overflow-y-auto flex-1 relative bg-slate-50/50">
              {/* National Stats Snapshot */}
              <div className="p-3 bg-white border-b border-slate-100 flex flex-col gap-3">
                <div className="flex flex-wrap sm:grid sm:grid-cols-3 gap-2">
                  <div className="bg-blue-50 py-2 px-1 rounded-lg border border-blue-100 flex-1 flex flex-col items-center text-center shadow-sm">
                    <div className="flex items-center gap-1 text-blue-600 mb-0.5">
                      <Users size={12} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-blue-700/80">नेपालको जनसंख्या</span>
                    </div>
                    <span className="text-[13px] font-bold text-slate-800">२.९१ करोड</span>
                  </div>
                  <div className="bg-emerald-50 py-2 px-1 rounded-lg border border-emerald-100 flex-1 flex flex-col items-center text-center shadow-sm">
                    <div className="flex items-center gap-1 text-emerald-600 mb-0.5">
                      <Banknote size={12} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-700/80">नेपाल प्रतिव्यक्ति आय</span>
                    </div>
                    <span className="text-[13px] font-bold text-slate-800">~$1,381 USD</span>
                  </div>
                  <div className="bg-purple-50 py-2 px-1 rounded-lg border border-purple-100 flex-1 flex flex-col items-center text-center shadow-sm sm:col-span-1 min-w-[100px]">
                    <div className="flex items-center gap-1 text-purple-600 mb-0.5">
                      <BookOpen size={12} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-purple-700/80">साक्षरता दर</span>
                    </div>
                    <span className="text-[13px] font-bold text-slate-800">७६.३%</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                  <Sparkles size={10} className="text-amber-500" />
                  गहिरो एआई विवरणको लागि जिल्ला चयन गर्नुहोस्।
                </div>
              </div>

              {/* Provinces Section */}
              <div className="p-3">
                <div className="flex items-center gap-2 text-slate-500 mb-2 px-1">
                  <MapPin size={14} />
                  <span className="text-[13px] font-bold text-slate-700">७ प्रदेश र ७७ जिल्लाहरू</span>
                </div>
                
                <div className="space-y-2">
                  {provinces.map((p) => (
                    <div key={p.name} className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all">
                      <button 
                        onClick={() => toggleProvince(p.name)}
                        className="w-full flex justify-between items-center p-2.5 hover:bg-slate-50 transition-colors text-left"
                      >
                        <div>
                          <div className="font-bold text-sm text-slate-800">{p.name}</div>
                          <div className="text-[11px] text-slate-500">जनसंख्या: {p.population}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-slate-200">
                            {p.districts} जिल्ला
                          </div>
                          {expandedProvince === p.name ? (
                            <ChevronUp size={18} className="text-slate-400" />
                          ) : (
                            <ChevronDown size={18} className="text-slate-400" />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedProvince === p.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-50 border-t border-slate-100"
                          >
                            <div className="p-3 flex flex-wrap gap-2">
                              {p.districtNames.map((district) => (
                                <button 
                                  key={district} 
                                  onClick={() => setSelectedDistrict(district)}
                                  className="inline-block bg-white border border-slate-200 shadow-sm text-slate-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95"
                                >
                                  {district}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* District Detail Modal */}
              <AnimatePresence>
                {selectedDistrict && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute inset-0 bg-slate-50 z-10 flex flex-col shadow-[-10px_0_20px_rgba(0,0,0,0.05)]"
                  >
                    <div className="bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
                      <h4 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                        <MapPin size={20} className="text-red-600" />
                        {selectedDistrict} जिल्ला
                      </h4>
                      <button onClick={() => setSelectedDistrict(null)} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-5">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full text-blue-600 gap-3 py-20">
                          <Loader2 size={32} className="animate-spin" />
                          <p className="font-medium text-sm text-slate-600">एआईबाट जानकारी संकलन गरिदै...</p>
                        </div>
                      ) : (
                        <div className="prose prose-sm prose-slate max-w-none pb-10">
                          <div className="markdown-body text-slate-700 prose-h3:text-blue-800 prose-h3:text-lg prose-h3:mb-2 prose-h3:mt-4 prose-p:mb-3 prose-ul:my-2 prose-li:mb-1">
                            <Markdown>{districtInfo}</Markdown>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}
