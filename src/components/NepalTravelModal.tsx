import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Compass, Image as ImageIcon, Calendar, Camera } from 'lucide-react';

interface NepalTravelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NepalTravelModal({ isOpen, onClose }: NepalTravelModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full h-full bg-[#f8fafc] overflow-y-auto relative custom-scrollbar flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-md transition-all shadow-lg"
          >
            <X size={24} />
          </button>

          {/* Hero Section */}
          <section className="relative w-full h-[70vh] sm:h-[85vh] flex items-center justify-center overflow-hidden shrink-0">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000")' }}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#f8fafc] via-black/40 to-black/60" />
            
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm">
                  The ultimate Himalayan destination
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl tracking-tighter mb-4 leading-tight">
                  Discover the Magic of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Nepal</span>
                </h1>
                <p className="text-lg md:text-2xl text-slate-200 font-medium max-w-3xl mx-auto drop-shadow-md mb-10 leading-relaxed">
                  Journey to the roof of the world. Explore the mighty Himalayas, unearth magnificent ancient temples, and immerse yourself in a vibrant cultural heritage that spans millennia.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(5,150,105,0.4)] hover:shadow-[0_0_30px_rgba(5,150,105,0.6)] flex items-center gap-2 transform hover:-translate-y-1">
                    <Compass size={20} />
                    Start Exploring
                  </button>
                  <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-md transition-all border border-white/30 flex items-center gap-2 transform hover:-translate-y-1">
                    <Calendar size={20} />
                    Plan a Tour
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50 flex flex-col items-center gap-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-sm font-medium tracking-widest uppercase">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                <div className="w-1.5 h-2.5 bg-white/50 rounded-full"></div>
              </div>
            </motion.div>
          </section>

          {/* Quick Stats/Features */}
          <section className="relative -mt-16 z-30 px-4 max-w-6xl mx-auto mb-20 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: 'Highest Peaks', value: '8 of 14', icon: '🏔️' },
                { label: 'UNESCO Sites', value: '4 Sites', icon: '🏛️' },
                { label: 'Ethnic Groups', value: '125+', icon: '👥' },
                { label: 'Flora & Fauna', value: 'Diverse', icon: '🐅' },
              ].map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={stat.label} 
                  className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 text-center shadow-xl border border-slate-100"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Why Visit Nepal Section */}
          <section className="py-12 px-4 max-w-7xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6 leading-tight">
                    More Than Just <span className="text-emerald-500">Mountains</span>
                  </h2>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    While Nepal is famous for Mount Everest and the spectacular Himalayan range, it is also a country of profound cultural richness, ancient history, and incredible biodiversity. 
                  </p>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    From the dense, wildlife-rich jungles of the south to the serene, spiritual monasteries perched on high ridges, Nepal offers an unparalleled variety of experiences for every type of traveler.
                  </p>
                  
                  <div className="space-y-4">
                    {['World-Class Trekking & Mountaineering', 'Rich Spiritual & Cultural Heritage', 'Exhilarating Wildlife Safaris', 'Warm & Welcoming Hospitality'].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          ✓
                        </div>
                        <span className="font-medium text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="grid grid-cols-2 gap-4 h-[500px]">
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  src="https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?q=80&w=800" 
                  className="w-full h-full object-cover rounded-3xl rounded-tr-none shadow-xl"
                  alt="Nepalese culture"
                />
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  src="https://images.unsplash.com/photo-1542640244-8da765e9ab3b?q=80&w=800" 
                  className="w-full h-full object-cover rounded-3xl rounded-bl-none shadow-xl mt-8"
                  alt="Architecture of Nepal"
                />
              </div>
            </div>
          </section>

          {/* Popular Activities (New Section) */}
          <section className="py-20 bg-slate-100 mt-12 w-full">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">Popular Activities</h2>
                <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6" />
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">Experience the thrill of adventure and the peace of spirituality.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Trekking & Hiking", desc: "Walk the legendary trails of Annapurna and Everest.", icon: "🏔️", color: "bg-blue-100 text-blue-600" },
                  { title: "Jungle Safari", desc: "Spot rhinos and tigers in Chitwan and Bardia.", icon: "🐘", color: "bg-green-100 text-green-600" },
                  { title: "Cultural Tours", desc: "Explore ancient palaces, stupas, and local villages.", icon: "⛩️", color: "bg-orange-100 text-orange-600" },
                  { title: "Adventure Sports", desc: "Paragliding, bungee jumping, and white-water rafting.", icon: "🪂", color: "bg-red-100 text-red-600" },
                  { title: "Spiritual Retreats", desc: "Yoga, meditation, and monastery stays.", icon: "🧘", color: "bg-purple-100 text-purple-600" },
                  { title: "Culinary Tours", desc: "Taste authentic MoMos, Dal Bhat, and Newari cuisine.", icon: "🥟", color: "bg-yellow-100 text-yellow-600" }
                ].map((activity, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    key={activity.title} 
                    className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100"
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">{activity.title}</h3>
                    <p className="text-slate-600">{activity.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Destinations Section */}
          <section className="py-24 px-4 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4">Featured Destinations</h2>
              <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6" />
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                From the bustling streets of Kathmandu to the serene lakes of Pokhara and the majestic peaks of the Himalayas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Destination Card 1 */}
              <div className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1542640244-8da765e9ab3b?q=80&w=800" 
                    alt="Kathmandu Durbar Square" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">Kathmandu Valley</h3>
                    <div className="flex items-center gap-1 text-slate-300 text-sm">
                      <MapPin size={14} />
                      <span>Capital City & Heritage</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    Explore ancient temples, bustling markets, and UNESCO World Heritage sites in the cultural heart of Nepal.
                  </p>
                  <button className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                    View Details <Compass size={16} />
                  </button>
                </div>
              </div>

              {/* Destination Card 2 */}
              <div className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581793745862-f155f9a65609?q=80&w=800" 
                    alt="Pokhara Fewa Lake" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">Pokhara</h3>
                    <div className="flex items-center gap-1 text-slate-300 text-sm">
                      <MapPin size={14} />
                      <span>City of Lakes</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    The ultimate gateway to the Annapurna circuit, offering stunning lake views, paragliding, and a relaxed atmosphere.
                  </p>
                  <button className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                    View Details <Compass size={16} />
                  </button>
                </div>
              </div>

              {/* Destination Card 3 */}
              <div className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800" 
                    alt="Everest Base Camp" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">Everest Region</h3>
                    <div className="flex items-center gap-1 text-slate-300 text-sm">
                      <MapPin size={14} />
                      <span>The Himalayas</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    Trek to the base camp of the highest mountain in the world, experiencing Sherpa culture and breathtaking vistas.
                  </p>
                  <button className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                    View Details <Compass size={16} />
                  </button>
                </div>
              </div>
              
              {/* Destination Card 4 */}
              <div className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544368143-bf6b801a6132?q=80&w=800" 
                    alt="Chitwan National Park" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">Chitwan</h3>
                    <div className="flex items-center gap-1 text-slate-300 text-sm">
                      <MapPin size={14} />
                      <span>Wildlife Safari</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    Discover dense forests, one-horned rhinos, Bengal tigers, and diverse wildlife in the Terai region.
                  </p>
                  <button className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                    View Details <Compass size={16} />
                  </button>
                </div>
              </div>
              
              {/* Destination Card 5 */}
              <div className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1533083313-1fcfbf9fbfac?q=80&w=800" 
                    alt="Lumbini" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">Lumbini</h3>
                    <div className="flex items-center gap-1 text-slate-300 text-sm">
                      <MapPin size={14} />
                      <span>Birthplace of Buddha</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    A peaceful pilgrimage site featuring ancient ruins, beautiful monasteries built by different nations, and the Maya Devi Temple.
                  </p>
                  <button className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                    View Details <Compass size={16} />
                  </button>
                </div>
              </div>
              
              {/* Destination Card 6 */}
              <div className="group rounded-3xl overflow-hidden shadow-lg bg-white border border-slate-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1464319409848-111ecdb1df20?q=80&w=800" 
                    alt="Mustang" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">Mustang</h3>
                    <div className="flex items-center gap-1 text-slate-300 text-sm">
                      <MapPin size={14} />
                      <span>The Forbidden Kingdom</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    A barren, striking landscape that shares culture and geography with Tibet, offering unique off-the-beaten-path trekking.
                  </p>
                  <button className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1">
                    View Details <Compass size={16} />
                  </button>
                </div>
              </div>

            </div>
          </section>
          
          <footer className="bg-slate-900 py-12 px-4 text-center mt-auto">
            <h3 className="text-2xl font-bold text-white mb-2">Nepal Travel & Tours</h3>
            <p className="text-slate-400">Experience the magic of the Himalayas.</p>
          </footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
