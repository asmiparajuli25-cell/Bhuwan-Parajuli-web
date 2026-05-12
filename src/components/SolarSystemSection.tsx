import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X, Globe, Orbit, Clock, Cloud, Layers, Activity, Languages } from 'lucide-react';
import { planetsData, translations, Language } from './solarSystemData';


import WorldWeatherInline from './WorldWeatherInline';

export default function SolarSystemSection() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState<number | null>(null);
  const [planetZoom, setPlanetZoom] = useState<number>(1);
  const [textZoom, setTextZoom] = useState<number>(1);
  const [infoPage, setInfoPage] = useState<number>(0);
  
  const selectedPlanet = selectedPlanetIndex !== null ? planetsData[selectedPlanetIndex] : null;
  const t = translations[lang];

  useEffect(() => {
    if (selectedPlanetIndex !== null) {
      document.body.style.overflow = 'hidden';
      setPlanetZoom(1);
      setTextZoom(1);
      setInfoPage(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPlanetIndex]);

  const handlePlanetWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setPlanetZoom(prev => Math.min(Math.max(1, prev - e.deltaY * 0.005), 3));
  };

  const handleTextWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setTextZoom(prev => Math.min(Math.max(0.7, prev - e.deltaY * 0.002), 2));
    }
  };


  return (
    <section id="space" className="relative py-16 md:py-24 bg-[#0B1021] text-white overflow-hidden font-sans">
      {/* Starry Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1021] via-transparent to-[#0B1021]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex justify-end mb-4 pr-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'np' : 'en')}
            className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 text-white px-4 py-2 rounded-full border border-slate-700 transition-colors"
          >
            <Languages size={18} className={lang === 'np' ? 'text-cyan-400' : 'text-slate-400'} />
            <span className="font-medium text-sm">{lang === 'en' ? 'नेपाली' : 'English'}</span>
          </button>
        </div>
<div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold tracking-widest text-orange-500 uppercase mb-3"
          >
            {t.title}
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-500 mb-6"
          >
            {t.subtitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-slate-300 text-lg whitespace-pre-wrap"
          >
            {t.description}
          </motion.p>
        </div>

        {/* Global Weather Highlights */}
        <div className="mb-16">
          <WorldWeatherInline />
        </div>

            {/* Animated Solar System Overview view */}
        <div className="relative w-full max-w-3xl mx-auto h-64 sm:h-80 md:h-96 mb-12 flex items-center justify-center -mt-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent rounded-full blur-2xl"></div>

          <div className="relative w-full h-full flex items-center justify-center overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] md:[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]">
            {/* Sun */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              onClick={() => setSelectedPlanetIndex(0)}
              className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 shadow-lg md:shadow-[0_0_40px_rgba(234,179,8,0.4)] z-10 cursor-pointer pointer-events-auto hover:shadow-xl transition-shadow will-change-transform"
              title={planetsData[0][lang].name}
            />

            {/* Render orbits and planets */}
            {planetsData.slice(1).map((planet, idx) => {
              // Skip the Moon, so we recalculate a proper offset
              const visualIdx = planet.en.name === 'Sun' ? 0 :
                planet.en.name === 'Mercury' ? 1 :
                planet.en.name === 'Venus' ? 2 :
                planet.en.name === 'Earth' ? 3 :
                planet.en.name === 'Mars' ? 4 :
                planet.en.name === 'Jupiter' ? 5 :
                planet.en.name === 'Saturn' ? 6 :
                planet.en.name === 'Uranus' ? 7 :
                planet.en.name === 'Neptune' ? 8 : 0;

              const baseSize = 80;
              const step = 45; // roughly 45px per orbit
              const orbitSize = baseSize + visualIdx * step;
              const duration = 10 + visualIdx * 8;

              const planetColors: Record<string, string> = {
                Mercury: 'from-slate-400 to-slate-600',
                Venus: 'from-orange-300 to-amber-700',
                Earth: 'from-blue-400 to-green-600',
                Mars: 'from-red-500 to-orange-800',
                Jupiter: 'from-orange-400 to-amber-900',
                Saturn: 'from-yellow-200 to-yellow-600',
                Uranus: 'from-cyan-300 to-blue-500',
                Neptune: 'from-blue-600 to-indigo-900',
              };

              const planetSizes: Record<string, string> = {
                Mercury: 'w-1.5 h-1.5 md:w-2 md:h-2',
                Venus: 'w-2 h-2 md:w-3 md:h-3',
                Earth: 'w-2.5 h-2.5 md:w-3.5 md:h-3.5',
                Mars: 'w-2 h-2 md:w-2.5 md:h-2.5',
                Jupiter: 'w-4 h-4 md:w-6 md:h-6',
                Saturn: 'w-3.5 h-3.5 md:w-5 md:h-5',
                Uranus: 'w-3 h-3 md:w-4 md:h-4',
                Neptune: 'w-3 h-3 md:w-4 md:h-4',
              };

              return (
                <div key={planet.en.name} className="absolute flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                    style={{ width: orbitSize, height: orbitSize }}
                    className="absolute rounded-full border border-white/10 border-dashed will-change-transform"
                  >
                    <div className="relative w-full h-full">
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br ${planetColors[planet.en.name]} ${planetSizes[planet.en.name]} shadow-[0_0_10px_rgba(255,255,255,0.2)] flex items-center justify-center cursor-pointer pointer-events-auto hover:scale-[2] transition-transform origin-center`}
                        style={{ top: 0, transform: 'translate(-50%, -50%)' }}
                        onClick={() => setSelectedPlanetIndex(idx + 1)}
                        title={planet[lang].name}
                      >
                        {/* Add Saturn's ring */}
                        {planet.en.name === 'Saturn' && (
                          <div className="absolute w-[180%] h-[30%] -rotate-12 rounded-[50%] border border-yellow-200/50" />
                        )}
                        {/* Add Earth's Moon */}
                        {planet.en.name === 'Earth' && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            style={{ width: 14, height: 14 }}
                            className="absolute rounded-full border-white/30 border-dotted will-change-transform"
                          >
                             <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-slate-200 rounded-full" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advanced Info: All Planets */}
        <div className="mt-16 sm:mt-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t.exploreAllPlanets}
            </h3>
            <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 bg-sky-950/30 p-6 sm:p-8 rounded-3xl border border-sky-800/40 shadow-[inset_0_0_40px_rgba(14,165,233,0.1)] relative overflow-hidden">
            {/* Inner background image for the grid */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-screen pointer-events-none z-0"></div>
            
            {planetsData.map((planet, idx) => (
              <motion.div
                key={planet.en.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                tabIndex={0}
                role="button"
                className="bg-slate-800/40 md:backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:bg-slate-800/60 transition-colors group cursor-pointer flex flex-col relative z-20 pointer-events-auto"
                onClick={() => setSelectedPlanetIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                     setSelectedPlanetIndex(idx);
                  }
                }}
              >
                <div className={`h-32 sm:h-40 bg-gradient-to-br ${planet.color} relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                  <img 
                    src={planet.image} 
                    alt={planet[lang].name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow-2xl relative z-20 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">{planet[lang].name}</h4>
                  <p className="text-sm text-cyan-400 mb-4">{planet[lang].distance}</p>
                  
                  <div className="space-y-3 text-sm text-slate-300 flex-1">
                    <div className="flex gap-2">
                      <span className="text-orange-400 font-medium whitespace-nowrap">{t.time}:</span>
                      <span className="truncate" title={planet[lang].time}>{planet[lang].time}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-orange-400 font-medium whitespace-nowrap">{t.gas}:</span>
                      <span className="truncate" title={planet[lang].gas}>{planet[lang].gas}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-orange-400 font-medium whitespace-nowrap">{t.moons}:</span>
                      <span className="truncate" title={planet[lang].moons}>{planet[lang].moons}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-700 pointer-events-auto">
                    <button 
                      className="inline-flex text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors items-center gap-1 group-hover:gap-2 w-full text-left focus:outline-none"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedPlanetIndex(idx);
                      }}
                      type="button"
                    >
                       {t.clickToExplore} &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Galaxy Info Card */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-6 bg-gradient-to-br from-sky-900/60 to-blue-950/60 md:backdrop-blur-md border border-sky-500/30 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-center shadow-lg md:shadow-[0_0_30px_rgba(14,165,233,0.15)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>
              
              <div className="w-full lg:w-1/3 flex justify-center relative z-10">
                <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-lg md:shadow-[0_0_40px_rgba(56,189,248,0.4)] border-4 border-sky-500/20">
                  <img src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2000" alt="Milky Way Galaxy" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="w-full lg:w-2/3 space-y-5 relative z-10">
                <h4 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-200 flex items-center gap-3">
                  <span className="text-4xl">🌌</span> Our Galaxy: The Milky Way
                </h4>
                <p className="text-sky-100/90 text-base sm:text-lg leading-relaxed">
                  The Milky Way is the galaxy that includes our Solar System, describing its appearance from Earth: a hazy band of light seen in the night sky formed from stars that cannot be individually distinguished by the naked eye. It is a barred spiral galaxy with an estimated visible diameter of 100,000–200,000 light-years.
                </p>
                <div className="bg-sky-950/50 p-4 rounded-2xl border border-sky-800/50">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-sky-200">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div> <strong>Type:</strong> Barred Spiral Galaxy</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div> <strong>Age:</strong> ~13.6 Billion Years</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div> <strong>Stars:</strong> 100 - 400 Billion</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div> <strong>Center:</strong> Sagittarius A* (Black Hole)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-16 sm:mt-24 bg-slate-800/40 md:backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 sm:p-10 md:p-16 mb-8 text-slate-200 leading-relaxed shadow-lg md:shadow-xl max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-4">
              The Solar System & Earth Overview
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-12">
            
            {/* Solar System section */}
            <section className="space-y-4">
              <h4 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                <span className="text-2xl">🌞</span> The Solar System
              </h4>
              <p className="text-base sm:text-lg mb-4 text-slate-300">
                The Solar System is a vast region of space centered around the Sun, held together by gravity. It formed about 4.6 billion years ago.
              </p>
              <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                <h5 className="text-xl font-semibold text-cyan-400 mb-3">Main Components</h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2 sm:pl-6 list-disc marker:text-cyan-500">
                  <li>The Sun (99.86% of total mass)</li>
                  <li>8 planets</li>
                  <li>Dwarf planets (like Pluto)</li>
                  <li>Moons (200+ known)</li>
                  <li>Asteroids, comets, meteoroids</li>
                  <li>Interplanetary dust and gas</li>
                </ul>
              </div>
            </section>

            {/* The Sun section */}
            <section className="space-y-4">
              <h4 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                <span className="text-2xl">☀️</span> The Sun
              </h4>
              <p className="text-base sm:text-lg mb-4 text-slate-300">
                The Sun is a giant ball of hot plasma where nuclear fusion happens.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/30">
                  <h5 className="font-semibold text-orange-400 mb-2 border-b border-orange-500/20 pb-2">Key Facts</h5>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li><strong className="text-white">Type:</strong> Yellow dwarf star</li>
                    <li><strong className="text-white">Diameter:</strong> ~1.39 million km</li>
                    <li><strong className="text-white">Temp (Surface):</strong> ~5,500°C</li>
                    <li><strong className="text-white">Temp (Core):</strong> ~15 million °C</li>
                  </ul>
                </div>
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/30">
                  <h5 className="font-semibold text-orange-400 mb-2 border-b border-orange-500/20 pb-2">Speed & Light</h5>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>Moves around Milky Way at ~220 km/s</li>
                    <li>Takes ~225 million years for one orbit</li>
                    <li><strong>Light to Earth:</strong> ~8 mins 20 secs</li>
                    <li><strong>Light to Neptune:</strong> ~4 hours</li>
                  </ul>
                </div>
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-700/30">
                  <h5 className="font-semibold text-orange-400 mb-2 border-b border-orange-500/20 pb-2">What's found on it?</h5>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>Plasma (ionized gas)</li>
                    <li>Solar flares</li>
                    <li>Sunspots</li>
                    <li>Magnetic fields</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* The Planets */}
            <section className="space-y-4">
              <h4 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                <span className="text-2xl">🪐</span> The Planets (in order from the Sun)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "1. Mercury", desc: "Closest to Sun, no atmosphere, extreme temps, no moons." },
                  { name: "2. Venus", desc: "Thick CO₂ atmosphere, hottest planet (~465°C), no moons." },
                  { name: "3. 🌍 Earth", desc: "Special—covered below." },
                  { name: "4. Mars", desc: "Red Planet, thin atmosphere, Moons: Phobos & Deimos." },
                  { name: "5. Jupiter", desc: "Gas giant, largest planet, Great Red Spot, 90+ moons." },
                  { name: "6. Saturn", desc: "Famous for rings, 80+ moons (Titan is largest)." },
                  { name: "7. Uranus", desc: "Rotates on its side, cold atmosphere." },
                  { name: "8. Neptune", desc: "Strong winds, deep blue color." }
                ].map((p, i) => (
                  <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/80 transition-colors">
                    <strong className="text-white block mb-1">{p.name}</strong>
                    <span className="text-sm text-slate-400">{p.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Earth */}
            <section className="space-y-6">
              <h4 className="text-2xl font-bold text-white flex items-center gap-2 mb-2 pb-2 border-b border-cyan-500/30">
                <span className="text-2xl">🌍</span> Earth – The Living Planet
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Facts  */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-blue-500/20">
                  <h5 className="font-semibold text-blue-400 mb-3 text-lg">Basic Facts</h5>
                  <ul className="space-y-2 text-slate-300">
                    <li><strong className="text-white">Distance from Sun:</strong> ~150 million km (1 AU)</li>
                    <li><strong className="text-white">One year:</strong> 365.25 days</li>
                    <li><strong className="text-white">One day:</strong> 24 hours</li>
                    <li><strong className="text-emerald-400">Only known planet with life</strong></li>
                  </ul>
                </div>

                {/* Orbit & Location */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-indigo-500/20">
                  <h5 className="font-semibold text-indigo-400 mb-3 text-lg flex items-center gap-2"><span className="text-xl">🌌</span> Orbit & Location</h5>
                  <p className="text-sm text-slate-300 mb-2">
                    Earth orbits in the <strong className="text-amber-300">Habitable Zone</strong> (Goldilocks Zone) at ~107,000 km/h.
                  </p>
                  <p className="text-sm text-slate-400">
                    <strong className="text-slate-300">Galaxy:</strong> Orion Arm, Milky Way<br/>
                    <strong className="text-slate-300">Shape:</strong> Elliptical orbit (not a perfect circle)
                  </p>
                </div>
                
                {/* Atmosphere */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-blue-500/20">
                  <h5 className="font-semibold text-blue-400 mb-3 text-lg flex items-center gap-2"><span className="text-xl">🌬️</span> Atmosphere (Air)</h5>
                  <p className="text-sm text-slate-300 mb-2">
                    78% nitrogen, 21% oxygen, 1% other gases (CO₂, argon).
                  </p>
                  <p className="text-sm text-slate-400">
                    <strong className="text-slate-300">Importance:</strong> Supports breathing, protects from harmful radiation, controls temperature.
                  </p>
                </div>

                {/* Water */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-blue-500/20">
                  <h5 className="font-semibold text-blue-400 mb-3 text-lg flex items-center gap-2"><span className="text-xl">💧</span> Water</h5>
                  <p className="text-sm text-slate-300 mb-2">
                    Covers ~71% of Earth. Found in Oceans, Rivers, Lakes, Glaciers.
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    <strong className="text-slate-300">Oceans:</strong> Pacific, Atlantic, Indian, Arctic, Southern.
                  </p>
                </div>

                {/* Land */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-blue-500/20">
                  <h5 className="font-semibold text-blue-400 mb-3 text-lg flex items-center gap-2"><span className="text-xl">🌍</span> Land</h5>
                  <p className="text-sm text-slate-300 mb-2">
                    Continents: Asia, Africa, Europe, North America, South America, Australia, Antarctica.
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    Includes Mountains, Plains, Deserts.
                  </p>
                </div>
                
                {/* Forests */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-emerald-500/20">
                  <h5 className="font-semibold text-emerald-400 mb-3 text-lg flex items-center gap-2"><span className="text-xl">🌳</span> Forests</h5>
                  <p className="text-sm text-slate-300 mb-2">
                    Tropical forests (Amazon), Temperate forests, Boreal forests.
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    <strong className="text-slate-300">Importance:</strong> Produce oxygen, store carbon, support wildlife.
                  </p>
                </div>

                {/* The Moon & Distances */}
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-500/30">
                  <h5 className="font-semibold text-slate-300 mb-3 text-lg flex items-center gap-2"><span className="text-xl">🌙</span> The Moon & Beyond</h5>
                  <p className="text-sm text-slate-300 mb-2">
                    Earth's 1 natural satellite. Dist: ~384,400 km. Light travel: ~1.3s. Causes tides.
                  </p>
                  <div className="mt-3 text-xs text-slate-400 bg-black/30 p-2 rounded">
                    <strong>Distances:</strong> Earth → Mars: ~54.6M km | Earth → Jupiter: ~588M km | Earth → Neptune: ~4.3B km
                  </div>
                </div>
              </div>
            </section>

            {/* Human Conditions */}
            <section className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 sm:p-8 rounded-3xl border border-indigo-500/30 space-y-6">
              <h4 className="text-2xl font-bold text-white flex items-center gap-2 mb-2 pb-2">
                <span className="text-2xl">🧑</span> Human Conditions on Earth
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h5 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2"><span>🏠</span> Habitat</h5>
                  <p className="text-sm text-slate-300">Humans live in cities, villages, forests, deserts. Built environments: houses, buildings.</p>
                </div>
                <div>
                  <h5 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2"><span>🍎</span> Food</h5>
                  <p className="text-sm text-slate-300">Sources: Plants (grains, fruits, vegetables), Animals (meat, dairy).</p>
                </div>
                <div>
                  <h5 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2"><span>❤️</span> Health</h5>
                  <p className="text-sm text-slate-300">Depends on clean water, nutrition, medical care.</p>
                </div>
                <div>
                  <h5 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2"><span>🎓</span> Education</h5>
                  <p className="text-sm text-slate-300">Learning systems: Schools, Colleges, Universities. For Knowledge, Skills, Development of society.</p>
                </div>
              </div>
              
              <div className="bg-black/30 p-4 rounded-xl mt-4">
                <h5 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2"><span>🌐</span> Society & Life</h5>
                <p className="text-sm text-slate-300">Technology connects people globally. Cultures differ across regions. Economy, politics, and environment affect living conditions.</p>
              </div>
            </section>

            {/* Summary */}
            <section className="mt-8 border-t border-slate-700/50 pt-8 text-center">
              <h4 className="text-2xl font-bold text-white flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl">🌌</span> Summary
              </h4>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto italic font-medium leading-relaxed">
                "The Solar System is a complex and dynamic system centered on the Sun, with planets, moons, and other objects moving in precise orbits. Among all these, Earth is unique because it supports life, thanks to its atmosphere, water, and suitable temperature."
              </p>
            </section>

          </div>
        </div>

      </div>

      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 md:backdrop-blur-md"
            onClick={() => setSelectedPlanetIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[85vh] md:h-[70vh] overflow-hidden bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedPlanetIndex(null)}
                className="absolute top-4 right-4 z-[60] p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
                title="Close"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row flex-1 overflow-y-auto custom-scrollbar md:overflow-hidden">
                <div 
                  className={`md:w-2/5 w-full min-h-[40vh] md:min-h-0 md:h-full flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-br ${selectedPlanet?.color} relative overflow-hidden shrink-0 group`}
                  onWheel={handlePlanetWheel}
                >
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000')] bg-cover bg-center opacity-60 mix-blend-screen"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-black/40 to-[#1a1744]/80"></div>
                  </div>

                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: planetZoom, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                    className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full shadow-2xl relative z-10 mb-4 sm:mb-6 flex items-center justify-center border border-white/10 overflow-hidden bg-black transition-transform duration-75"
                  >
                     <motion.img 
                       initial={{ rotate: 0 }}
                       animate={{ rotate: 360 }}
                       transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                       src={selectedPlanet?.image} 
                       alt={selectedPlanet?.[lang]?.name}
                       className="w-full h-full object-cover scale-[1.02]"
                     />
                     <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
                       <span className="text-white md:backdrop-blur-sm bg-black/40 xl:bg-transparent px-3 py-1 rounded-full text-sm font-medium">Scroll to Zoom</span>
                     </div>
                  </motion.div>

                  {/* Sun and Moon motion for Earth in Modal */}
                  {selectedPlanet?.isEarth && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none mb-6">
                      {/* Moon orbit track */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="absolute w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full border border-slate-300/40 border-dotted z-20 will-change-transform"
                      >
                        <div className="absolute top-4 left-8 w-5 h-5 rounded-full bg-gradient-to-br from-slate-100 to-slate-400 shadow-[0_0_12px_rgba(203,213,225,0.8)]" title="Moon" />
                      </motion.div>
                    </div>
                  )}
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-5xl font-black text-white relative z-10 drop-shadow-lg"
                  >
                    {selectedPlanet?.[lang]?.name}
                  </motion.h2>
                </div>
                
                <div className="md:w-3/5 w-full md:h-full p-6 sm:p-10 text-slate-300 flex flex-col flex-1 relative">
                  <div 
                    className="flex-1 relative md:overflow-hidden"
                    onWheel={handleTextWheel}
                    style={{ fontSize: `${textZoom}rem` }}
                  >
                    <AnimatePresence mode="wait">
                      {infoPage === 0 && (
                        <motion.div 
                          key="page0"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="pt-2 pb-8 md:absolute md:inset-0 md:overflow-y-auto custom-scrollbar md:pr-2"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                <Orbit size={20} />
                                <h4 className="font-semibold text-white">{t.distance}</h4>
                              </div>
                              <p className="text-[0.875em]">{selectedPlanet[lang].distance}</p>
                            </div>
                            
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                <Clock size={20} />
                                <h4 className="font-semibold text-white">{t.time}</h4>
                              </div>
                              <p className="text-[0.875em]">{selectedPlanet[lang].time}</p>
                            </div>
                            
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                <Cloud size={20} />
                                <h4 className="font-semibold text-white">{t.gas}</h4>
                              </div>
                              <p className="text-[0.875em]">{selectedPlanet[lang].gas}</p>
                            </div>
                            
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                <Layers size={20} />
                                <h4 className="font-semibold text-white">{t.composition}</h4>
                              </div>
                              <p className="text-[0.875em]">{selectedPlanet[lang].composition}</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 sm:col-span-2">
                              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                <Activity size={20} />
                                <h4 className="font-semibold text-white">{t.motion}</h4>
                              </div>
                              <p className="text-[0.875em]">{selectedPlanet[lang].motion}</p>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 sm:col-span-2">
                              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                                <Globe size={20} />
                                <h4 className="font-semibold text-white">{t.moons}</h4>
                              </div>
                              <p className="text-[0.875em]">{selectedPlanet[lang].moons}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {infoPage === 1 && selectedPlanet.isEarth && selectedPlanet.earthDetails && (
                        <motion.div 
                          key="page1_earth"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="pt-2 pb-8 md:absolute md:inset-0 md:overflow-y-auto custom-scrollbar md:pr-2"
                        >
                          <div className="min-h-full pb-4">
                            <h4 className="text-[1.25em] font-bold text-white mb-4 flex items-center gap-2">
                              <Globe className="text-blue-400" />
                              {t.earthConditions}
                            </h4>
                            <div className="space-y-4">
                              <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                                <strong className="text-blue-300 block mb-1">{t.waterAndLand}</strong>
                                <p className="text-[0.875em] text-slate-300">
                                  {selectedPlanet.earthDetails[lang].water} {selectedPlanet.earthDetails[lang].land}
                                </p>
                              </div>
                              <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/20">
                                <strong className="text-green-300 block mb-1">{t.airAndLife}</strong>
                                <p className="text-[0.875em] text-slate-300">
                                  {selectedPlanet.earthDetails[lang].air} {selectedPlanet.earthDetails[lang].life}
                                </p>
                                {selectedPlanet.earthDetails[lang].extendedData && (
                                  <div className="mt-4 pt-4 border-t border-green-500/20">
                                    <p className="text-[0.75em] text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                                      {selectedPlanet.earthDetails[lang].extendedData}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {((infoPage === 1 && !selectedPlanet.isEarth) || (infoPage === 2 && selectedPlanet.isEarth)) && (
                        <motion.div 
                          key="page2_desc"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="pt-2 pb-8 md:absolute md:inset-0 md:overflow-y-auto custom-scrollbar md:pr-2"
                        >
                          <div className="min-h-full bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700">
                            <div className="flex gap-3">
                              <Info className="shrink-0 text-cyan-500 mt-1" size={24} />
                              <p className="text-[1em] text-slate-300 leading-relaxed whitespace-pre-wrap">
                                {("description" in selectedPlanet[lang] && selectedPlanet[lang].description) ? 
                                  selectedPlanet[lang].description : 
                                  `In the vastness of the universe, ${selectedPlanet?.[lang]?.name} is just one of many celestial bodies, each with its own unique harsh environment, standing in stark contrast to the life-sustaining conditions found on Earth.`
                                }
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Pagination Controls */}
                  <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center shrink-0">
                    <button 
                      onClick={() => setInfoPage(prev => Math.max(0, prev - 1))}
                      disabled={infoPage === 0}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${infoPage === 0 ? 'text-slate-500 bg-slate-800/50 cursor-not-allowed' : 'text-white bg-blue-600/30 hover:bg-blue-600/50'}`}
                    >
                      Prev
                    </button>
                    
                    <div className="flex gap-2 relative z-10 group cursor-help" title="Scroll anywhere above to zoom text!">
                      {Array.from({ length: selectedPlanet.isEarth ? 3 : 2 }).map((_, i) => (
                        <div 
                          key={`dot-${i}`}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${i === infoPage ? 'bg-cyan-400' : 'bg-slate-600'}`} 
                        />
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setInfoPage(prev => Math.min(selectedPlanet.isEarth ? 2 : 1, prev + 1))}
                      disabled={infoPage === (selectedPlanet.isEarth ? 2 : 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${infoPage === (selectedPlanet.isEarth ? 2 : 1) ? 'text-slate-500 bg-slate-800/50 cursor-not-allowed' : 'text-white bg-blue-600/30 hover:bg-blue-600/50'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
