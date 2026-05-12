export type Language = 'en' | 'np';

export const translations = {
  en: {
    title: 'BiNTec Space',
    subtitle: 'Our Solar System',
    description: 'The Solar System is the gravitationally bound system of the Sun and the masses that orbit it, most prominently its eight planets, of which Earth is one. The system formed about 4.6 billion years ago when a dense region of a molecular cloud collapsed, creating the Sun and a protoplanetary disc from which the orbiting bodies assembled.\n\nThe Sun accounts for 99.86% of the Solar System\'s total mass. Inside the Sun\'s core, hydrogen is fused into helium, releasing energy that is emitted through the Sun\'s photosphere. This creates the heliosphere and a decreasing temperature gradient across the Solar System',
    clickToExplore: 'Click to explore',
    exploreAllPlanets: 'Explore All Planets',
    distance: 'Distance',
    time: 'Orbit & Rotation',
    gas: 'Atmosphere (Gas)',
    composition: 'Composition',
    motion: 'Motion',
    moons: 'Moons',
    earthConditions: 'Earth Conditions',
    waterAndLand: 'Water & Land',
    airAndLife: 'Air, Humans, Animals & Birds',
    defaultDesc: 'In the vastness of the universe, celestial bodies have their own unique harsh environments, standing in stark contrast to the life-sustaining conditions found on Earth.'
  },
  np: {
    title: 'विनटेक अन्तरिक्ष',
    subtitle: 'हाम्रो सौर्यमण्डल',
    description: 'सौर्य प्रणाली सूर्य र यसको परिक्रमा गर्ने पिण्डहरूको गुरुत्वाकर्षणद्वारा बाँधिएको प्रणाली हो, जसमा मुख्य रूपमा आठ ग्रहहरू रहेका छन्, र पृथ्वी तीमध्ये एक हो। यो प्रणाली करिब ४.६ बिलियन वर्ष বাতাসে घना क्षेत्र भत्किएर बनेको थियो, जसबाट सूर्य र एक प्रोटोप्लानेटरी डिस्कको निर्माण भयो जहाँबाट परिक्रमा गर्ने पिण्डहरू भेला भए।\n\nसौर्यमण्डलको कुल द्रव्यमानको ९९.८६% सूर्यले ओगटेको छ। सूर्यको भित्री भागमा, हाइड्रोजन हेलियममा फ्यूज हुन्छ, जसले ऊर्जा रिलिज गर्छ जुन सूर्यको फोटोस्फियर मार्फत निस्कन्छ। यसले हेलिओस्फियर र सौर्यमण्डलभरि घट्दो तापक्रम ग्रेडिएन्ट सिर्जना गर्दछ।',
    clickToExplore: 'अन्वेषण गर्न क्लिक गर्नुहोस्',
    exploreAllPlanets: 'सबै ग्रहहरू अन्वेषण गर्नुहोस्',
    distance: 'कक्षा र दूरी',
    time: 'समय',
    gas: 'वातावरण (ग्यास)',
    composition: 'संरचना',
    motion: 'गति (Motion)',
    moons: 'चन्द्रमाहरू',
    earthConditions: 'पृथ्वीको अवस्था',
    waterAndLand: 'पानी र जमिन',
    airAndLife: 'हावा, मानिस, जनावर र चरा',
    defaultDesc: 'ब्रह्माण्डको विशालतामा, खगोलीय पिण्डहरूको आफ्नै अद्वितीय कठोर वातावरण हुन्छ, जुन पृथ्वीमा पाइने जीवन-समर्थक अवस्थाहरूको तुलनामा एकदम फरक हुन्छ।'
  }
};

export const planetsData = [
  {
    en: {
      name: 'Sun',
      distance: 'Center of the Solar System',
      time: '27 Earth days (Equatorial rotation)',
      gas: 'Hydrogen (73%), Helium (25%), Trace elements',
      composition: 'Plasma and gases, 15 million °C core',
      motion: 'Rotates on its axis, orbits Milky Way center at 220 km/s',
      moons: 'Orbited by 8 planets, millions of asteroids/comets',
      description: 'The Sun is a yellow dwarf star, a hot ball of glowing gases at the heart of our solar system. Its gravity holds the solar system together, keeping everything from the biggest planets to the smallest particles in its orbit. It provides the heat and light necessary for life on Earth.'
    },
    np: {
      name: 'सूर्य (Sun)',
      distance: 'सौर्यमण्डलको केन्द्र',
      time: '२७ पृथ्वी दिन (भूमध्य रेखामा घूर्णन)',
      gas: 'हाइड्रोजन (७३%), हिलियम (२५%), अन्य तत्वहरू',
      composition: 'प्लाज्मा र ग्यासहरू, १.५ करोड °C कोर',
      motion: 'आफ्नै अक्षमा घुम्छ, आकाशगंगाको केन्द्रलाई २२० किमी/सेकेन्डमा परिक्रमा गर्छ',
      moons: '८ ग्रह र लाखौं क्षुद्रग्रहहरूद्वारा परिक्रमा गरिन्छ',
      description: 'सूर्य एउटा पहेँलो वामन तारा हो। यसको गुरुत्वाकर्षणले सम्पूर्ण सौर्यमण्डललाई एकसाथ बाँधेर राख्छ। यसले पृथ्वीमा जीवनको लागि आवश्यक ताप र प्रकाश प्रदान गर्दछ।'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
    color: 'from-yellow-400 to-orange-700'
  },
  {
    en: {
      name: 'Mercury',
      distance: '57.9 million km',
      time: '88 Earth days (Orbit), 59 Earth days (Rotation)',
      gas: 'Trace amounts of hydrogen, helium, oxygen',
      composition: 'Rocky, metallic core (70% metals, 30% silicates)',
      motion: 'Fastest planet, travels at 47 km/s',
      moons: '0 Moons',
      description: 'Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets in the Solar System. It has a rocky body like Earth, but it is heavily cratered and completely devoid of any atmosphere.'
    },
    np: {
      name: 'बुध (Mercury)',
      distance: '५ करोड ७९ लाख किमी',
      time: "८८ पृथ्वी दिन (कक्षीय), ५९ पृथ्वी दिन (घूर्णन)",
      gas: 'हाइड्रोजन, हिलियम, अक्सिजनको थोरै मात्रा',
      composition: 'चट्टानी, धात्विक कोर',
      motion: 'सबैभन्दा छिटो ग्रह, ४७ किमी/सेकेन्डमा यात्रा गर्छ',
      moons: '० चन्द्रमा',
      description: 'बुध सौर्यमण्डलको सबैभन्दा सानो र सूर्यको सबैभन्दा नजिकको ग्रह हो। यसको गुरुत्वाकर्षण निकै कमजोर छ र यसमा कुनै वायुमण्डल छैन। यसको सतहमा चन्द्रमामा जस्तै धेरै क्रेटरहरू पाइन्छन्।'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg',
    color: 'from-slate-400 to-slate-600'
  },
  {
    en: {
      name: 'Venus',
      distance: '108.2 million km',
      time: '225 Earth days (Orbit), 243 Earth days (Rotation)',
      gas: 'Carbon dioxide (96%), Nitrogen (3.5%)',
      composition: 'Rocky mantle, metallic core',
      motion: 'Retrograde rotation (spins backwards)',
      moons: '0 Moons',
      description: 'Venus is the second planet from the Sun. It is a terrestrial planet and is sometimes called Earth\'s "sister planet" because of their similar size, mass, proximity to the Sun, and bulk composition. It has a dense atmosphere consisting mainly of carbon dioxide, which causes a strong greenhouse effect.'
    },
    np: {
      name: 'शुक्र (Venus)',
      distance: '१० करोड ८२ लाख किमी',
      time: "२२५ पृथ्वी दिन (कक्षीय), २४३ पृथ्वी दिन (घूर्णन)",
      gas: 'कार्बन डाइअक्साइड (९६%), नाइट्रोजन (३.५%)',
      composition: 'चट्टानी म्यान्टल, धात्विक कोर',
      motion: 'उल्टो घूर्णन (पछाडि घुम्छ)',
      moons: '० चन्द्रमा',
      description: 'शुक्र सूर्यबाट दोस्रो ग्रह हो। यसको आकार र संरचना पृथ्वीजस्तै भएकाले यसलाई पृथ्वीको "जुम्ल्याहा बहिनी" पनि भनिन्छ। यसको बाक्लो वायुमण्डलमा कार्बन डाइअक्साइडको मात्रा धेरै भएकाले यहाँ खतरनाक हरितगृह प्रभाव (Greenhouse Effect) हुन्छ।'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg',
    color: 'from-orange-300 to-amber-700'
  },
  {
    en: {
      name: 'Earth',
      distance: '149.6 million km',
      time: '365.25 days (Orbit), 24 hours (Rotation)',
      gas: 'Nitrogen (78%), Oxygen (21%), Argon (0.9%)',
      composition: 'Iron core, rocky mantle, crust with water',
      motion: 'Travels at 30 km/s in orbit',
      moons: '1 Moon (The Moon)',
      description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. This is made possible by Earth being an ocean world, the only one in the Solar System sustaining liquid surface water. Almost all of Earth's water is contained in its global ocean, covering 70.8% of Earth's crust. The remaining 29.2% of Earth's crust is land, most of which is located in the form of continental landmasses within Earth's land hemisphere. Most of Earth's land is at least somewhat humid and covered by vegetation, while large ice sheets at Earth's polar deserts retain more water than Earth's groundwater, lakes, rivers, and atmospheric water combined. Earth's crust consists of slowly moving tectonic plates, which interact to produce mountain ranges, volcanoes, and earthquakes. Earth has a liquid outer core that generates a magnetosphere capable of deflecting most of the destructive solar winds and cosmic radiation.\n\nEarth has a dynamic atmosphere, which sustains Earth's surface conditions and protects it from most meteoroids and UV-light at entry. It is composed primarily of nitrogen and oxygen. Water vapor is widely present in the atmosphere, forming clouds that cover most of the planet. The water vapor acts as a greenhouse gas and, together with other greenhouse gases in the atmosphere, particularly carbon dioxide (CO2), creates the conditions for both liquid surface water and water vapor to persist via the capturing of energy from the Sun's light. This process maintains the current average surface temperature of 14.76 °C (58.57 °F), at which water is liquid under normal atmospheric pressure. Differences in the amount of captured energy between geographic regions (as with the equatorial region receiving more sunlight than the polar regions) drive atmospheric and ocean currents, producing a global climate system with different climate regions, and a range of weather phenomena such as precipitation, allowing components such as carbon and nitrogen to cycle."
    },
    np: {
      name: 'पृथ्वी (Earth)',
      distance: '१४ करोड ९६ लाख किमी',
      time: "३६५.२५ दिन (कक्षीय), २४ घण्टा (घूर्णन)",
      gas: 'नाइट्रोजन (७८%), अक्सिजन (२१%), आर्गन (०.९%)',
      composition: 'फलाम कोर, चट्टानी म्यान्टल, पानीसहितको क्रस्ट',
      motion: 'कक्षामा ३० किमी/सेकेन्डमा यात्रा गर्छ',
      moons: '१ चन्द्रमा',
      description: "पृथ्वी सूर्यबाट तेस्रो ग्रह हो र जीवनलाई आश्रय दिने एकमात्र ज्ञात खगोलीय पिण्ड हो। पृथ्वीको ७०% भन्दा बढी सतह पानीले ढाकेको छ, जसले जीवन सम्भव तुल्याउँछ। तरल पानी, जीवनको लागि आवश्यक ग्यासहरू, र उपयुक्त तापक्रमले यसलाई अद्वितीय बनाउँछ। यसको भित्री भागमा पग्लिएको फलामको कोर छ जसले चुम्बकीय क्षेत्र उत्पन्न गर्छ र खतरनाक सौर्य विकिरणबाट बचाउँछ।"
    },
    isEarth: true,
    earthDetails: {
      en: {
        water: '71% of surface covered in liquid water; deep oceans driving weather patterns.',
        land: 'Dynamic tectonic plates forming continents, mountains, and diverse landscapes.',
        air: 'Life-sustaining atmosphere, protecting from solar radiation, creating moderate temperatures.',
        life: 'Millions of species, including humans, animals, and birds in complex, interconnected ecosystems.',
        extendedData: "Earth as seen from Meteosat-12 in 2025, during the March equinox\n\nDesignations\nAlternative names: The world, The globe, Terra, Tellus, Gaia\nAdjectives: Earthly, Terrestrial, Terran, Tellurian\nSymbol: 🜨 and ♁\n\nOrbital characteristics\nEpoch J2000\nAphelion: 152,097,597 km\nPerihelion: 147,098,450 km\nSemi-major axis: 149,598,023 km\nEccentricity: 0.0167086\nOrbital period (sidereal): 365.256363004 d\nAverage orbital speed: 29.7827 km/s\nMean anomaly: 358.617°\nInclination: 7.155° – Sun's equator; 1.57869° – invariable plane; 0.00005° – J2000 ecliptic\nLongitude of ascending node: −11.26064°\nTime of perihelion: 3 January 2026\nArgument of perihelion: 114.20783°\nSatellites: 1, the Moon\n\nPhysical characteristics\nMean radius: 6371.0 km\nEquatorial radius: 6378.137 km\nPolar radius: 6356.752 km\nFlattening: 1/298.257222101\nCircumference: 40075.017 km equatorial, 40007.86 km meridional\nSurface area: 510072000 km2 (Land: 148940000 km2, Water: 361132000 km2)\nVolume: 1.08321×10^12 km3\nMass: (5.97217±0.00028)×10^24 kg\nMean density: 5.513 g/cm3\nSurface gravity: 9.80665 m/s2\nMoment of inertia factor: 0.3307\nEscape velocity: 11.186 km/s\nSidereal rotation period: 0.99726968 d\nEquatorial rotation velocity: 1674.4 km/h\nAxial tilt: 23.4392811°\nAlbedo: 0.434 geometric, 0.294 Bond\nTemperature: 255 K (−18 °C)\nSurface temp: min −89.2 °C, mean 14.76 °C, max 56.7 °C\nSurface equivalent dose rate: 0.274 μSv/h\nAbsolute magnitude (H): −3.99\n\nAtmosphere\nSurface pressure: 101.325 kPa (at sea level)\nComposition by volume:\n78.08% nitrogen (dry air)\n20.95% oxygen (dry air)\n≤1% water vapor (variable)\n0.9340% argon\n0.0415% carbon dioxide\n0.00182% neon\n0.00052% helium\n0.00017% methane\n0.00011% krypton\n0.00006% hydrogen\nSource: [3]"
      },
      np: {
        water: '७१% सतह तरल पानीले ढाकेको छ; गहिरो महासागरहरूले मौसम प्रणाली सञ्चालन गर्दछ।',
        land: 'महाद्वीप, पहाड, र विविध परिदृश्यहरू बनाउने गतिशील टेक्टोनिक प्लेटहरू।',
        air: 'जीवन-समर्थन गर्ने वायुमण्डल, सौर्य विकिरणबाट बचाउँछ र मध्यम तापक्रम सिर्जना गर्छ।',
        life: 'जटिल, अन्तरसम्बन्धित इकोसिस्टममा मानिस, जनावर र चराहरूसहित लाखौं प्रजातिहरू।',
        extendedData: "विस्तृत डाटा (Extended Data):\n\nभौतिक विशेषताहरू:\nऔसत त्रिज्या: ६३७१.० किमी\nभूमध्य रेखाको परिधि: ४००७५ किमी\nसतह क्षेत्र: ५१०,०७२,००० वर्ग किमी (सुख्खा जमिन: १४८,९४०,००० वर्ग किमी, पानी: ३६१,१३२,००० वर्ग किमी)\nऔसत घनत्व: ५.५१३ ग्राम/घन सेमी\nगुरुत्वाकर्षण: ९.८०६६५ मिटर/सेकेन्ड वर्ग\n\nवायुमण्डल:\nनाइट्रोजन: ७८.०८%\nअक्सिजन: २०.९५%\nपानीको बाफ: १% भन्दा कम\nआर्गन: ०.९३४%\nकार्बन डाइअक्साइड: ०.०४१५%\nस्रोत: [३]"
      }
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
    color: 'from-blue-400 to-green-600'
  },
  {
    en: {
      name: 'Moon',
      distance: '384,400 km from Earth',
      time: '27.3 Earth days (Orbit around Earth & Rotation)',
      gas: 'Extremely thin exosphere (Helium, Neon, Hydrogen)',
      composition: 'Rocky crust, solid silicate mantle, iron-core',
      motion: 'Tidally locked to Earth (shows same face)',
      moons: '0 Moons (It is a moon)',
      description: "Earth's only natural satellite. It is the fifth largest moon in the solar system and the largest among planetary satellites relative to the size of the planet that it orbits. Its gravitational pull is responsible for the tides on Earth."
    },
    np: {
      name: 'चन्द्रमा (Moon)',
      distance: 'पृथ्वीबाट ३८४,४०० किमी',
      time: "२७.३ पृथ्वी दिन (तथा घूर्णन)",
      gas: 'अत्यन्त पातलो एक्सोस्फियर (हिलियम, नियोन, हाइड्रोजन)',
      composition: 'चट्टानी क्रस्ट, ठोस सिलिकेट म्यान्टल',
      motion: 'पृथ्वीसँग टाइडल्ली लक छ (सधैँ एउटै अनुहार देखाउँछ)',
      moons: '० चन्द्रमा',
      description: "पृथ्वीको एक मात्र प्राकृतिक उपग्रह। यो हाम्रो सौर्यमण्डलको पाँचौं ठूलो चन्द्रमा हो। यसको गुरुत्वाकर्षणले पृथ्वीमा छालहरू (tides) ल्याउँछ।"
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg',
    color: 'from-gray-300 to-gray-500'
  },
  {
    en: {
      name: 'Mars',
      distance: '227.9 million km',
      time: '687 Earth days (Orbit), 24.6 hours (Rotation)',
      gas: 'Carbon dioxide (95.3%), Nitrogen (2.7%)',
      composition: 'Iron-rich rocks, dusty surface with ice caps',
      motion: 'Pronounced elliptical orbit',
      moons: '2 Moons (Phobos, Deimos)',
      description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often referred to as the "Red Planet" because the iron oxide prevalent on its surface gives it a reddish appearance. It harbors Olympus Mons, the largest volcano and highest known mountain on any planet in the Solar System.'
    },
    np: {
      name: 'मंगल (Mars)',
      distance: '२२ करोड ७९ लाख किमी',
      time: "६८७ पृथ्वी दिन (कक्षीय), २४.६ घण्टा (घूर्णन)",
      gas: 'कार्बन डाइअक्साइड (९५.३%), नाइट्रोजन (२.७%)',
      composition: 'फलामयुक्त चट्टान, बरफसहितको धुलोयुक्त सतह',
      motion: 'अण्डाकार कक्षा',
      moons: '२ चन्द्रमा (फोबोस र डेमोस)',
      description: 'मंगल सूर्यबाट चौथो ग्रह हो। यसको सतहमा रहेको आइरन अक्साइड(फलामको खिया)ले यसलाई रातो देखाउने भएकोले यसलाई "रातो ग्रह" पनि भनिन्छ। सौर्यमण्डलको सबैभन्दा ठूलो ज्वालामुखी "ओलिम्पस मोन्स" यसै ग्रहमा रहेको छ।'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
    color: 'from-red-500 to-orange-800'
  },
  {
    en: {
      name: 'Jupiter',
      distance: '778.6 million km',
      time: '12 Earth years (Orbit), 10 hours (Rotation)',
      gas: 'Hydrogen (89%), Helium (10%)',
      composition: 'Gas giant, possible rocky core, metallic hydrogen layer',
      motion: 'Fastest rotation in the solar system',
      moons: '95 Moons (Europa, Ganymede, Io, Callisto...)',
      description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined. It is famous for its Great Red Spot, a giant storm that has been raging for hundreds of years.'
    },
    np: {
      name: 'बृहस्पति (Jupiter)',
      distance: '७७ करोड ८६ लाख किमी',
      time: "१२ पृथ्वी वर्ष (कक्षीय), १० घण्टा (घूर्णन)",
      gas: 'हाइड्रोजन (८९%), हिलियम (१०%)',
      composition: 'ग्यास विशाल, सम्भावित चट्टानी कोर',
      motion: 'सौर्यमण्डलमा सबैभन्दा छिटो घूर्णन गति',
      moons: '९५ चन्द्रमाहरू (युरोपा, ग्यानिमेड...)',
      description: 'बृहस्पति सूर्यबाट पाँचौं र सौर्यमण्डलको सबैभन्दा ठूलो ग्रह हो। यो एउटा ग्यासको विशाल पिण्ड हो, जसको पिण्ड सौर्यमण्डलका अन्य सबै ग्रहहरूको कुल पिण्डभन्दा साढे दुई गुणा बढी छ। यसको "ग्रेट रेड स्पट" भनिने सयौं वर्षदेखि चलिरहेको आँधी धेरै प्रसिद्ध छ।'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg',
    color: 'from-orange-400 to-amber-900'
  },
  {
    en: {
      name: 'Saturn',
      distance: '1.43 billion km',
      time: '29.5 Earth years (Orbit), 10.7 hours (Rotation)',
      gas: 'Hydrogen (96%), Helium (3%)',
      composition: 'Gas giant with spectacular icy ring system',
      motion: 'Significant equatorial bulge due to fast rotation',
      moons: '146 Moons (Titan, Enceladus, Mimas...)',
      description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It is best known for its prominent ring system, which is composed mostly of ice particles, with a smaller amount of rocky debris and dust.'
    },
    np: {
      name: 'शनि (Saturn)',
      distance: '१.४३ अर्ब किमी',
      time: "२९.५ पृथ्वी वर्ष (कक्षीय), १०.७ घण्टा (घूर्णन)",
      gas: 'हाइड्रोजन (९६%), हिलियम (३%)',
      composition: 'आकर्षक बरफका रिङहरूसहितको ग्यास विशाल',
      motion: 'तीव्र घूर्णनका कारण भूमध्यरेखामा ठूलो फुलावट',
      moons: '१४६ चन्द्रमाहरू (टाइटन, एन्सेलाडस...)',
      description: 'शनि सूर्यबाट छैटौं र सौर्यमण्डलको दोस्रो सबैभन्दा ठूलो ग्रह हो। यो एउटा ग्यास विशाल हो जसको औसत अर्धव्यास पृथ्वीको भन्दा साढे नौ गुणा बढी छ। शनि यसको मनमोहक रिङ (चक्का) प्रणालीका लागि प्रसिद्ध छ, जुन मुख्यतया बरफका कणहरू र केही चट्टानी धुलोले बनेको छ।'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
    color: 'from-yellow-200 to-yellow-600'
  },
  {
    en: {
      name: 'Uranus',
      distance: '2.87 billion km',
      time: '84 Earth years (Orbit), 17.2 hours (Rotation)',
      gas: 'Hydrogen (83%), Helium (15%), Methane (2%)',
      composition: 'Ice giant (water, ammonia, methane ices over rocky core)',
      motion: 'Rolls on its side (98-degree axial tilt)',
      moons: '28 Moons (Titania, Oberon, Umbriel...)',
      description: 'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is unique among the planets because its axis of rotation is tilted sideways, nearly parallel to its orbital plane.'
    },
    np: {
      name: 'अरुण (Uranus)',
      distance: '२.८७ अर्ब किमी',
      time: "८४ पृथ्वी वर्ष (कक्षीय), १७.२ घण्टा (घूर्णन)",
      gas: 'हाइड्रोजन (८३%), हिलियम (१५%), मिथेन (२%)',
      composition: 'आइस जाइन्ट (चट्टानी कोरमाथि पानी र बरफ)',
      motion: 'आफ्नै छेउमा ढल्किएर घुम्छ (९८-डिग्री झुकाव)',
      moons: '२८ चन्द्रमाहरू (टाइटानिया, ओबेरोन...)',
      description: 'अरुण सूर्यबाट सातौं ग्रह हो। सौर्यमण्डलमा यसको तेस्रो ठूलो अर्धव्यास र चौथो ठूलो पिण्ड रहेको छ। यसको घुम्ने अक्ष लगभग यसको कक्षीय समतलसँग समानान्तर ९८ डिग्री झुकेको हुनाले, यो ग्रह आफ्नो छेउमा ढल्केर घुम्ने एक मात्र ग्रह हो।'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
    color: 'from-cyan-300 to-blue-500'
  },
  {
    en: {
      name: 'Neptune',
      distance: '4.5 billion km',
      time: '165 Earth years (Orbit), 16.1 hours (Rotation)',
      gas: 'Hydrogen (80%), Helium (19%), Methane (1.5%)',
      composition: 'Ice giant, active and violent weather systems',
      motion: 'Extreme winds up to 2,100 km/h',
      moons: '16 Moons (Triton, Proteus, Nereid...)',
      description: 'Neptune is the eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. It is 17 times the mass of Earth and slightly more massive than its near-twin Uranus.'
    },
    np: {
      name: 'वरुण (Neptune)',
      distance: '४.५ अर्ब किमी',
      time: "१६५ पृथ्वी वर्ष (कक्षीय), १६.१ घण्टा (घूर्णन)",
      gas: 'हाइड्रोजन (८०%), हिलियम (१९%), मिथेन (१.५%)',
      composition: 'आइस जाइन्ट, आँधीबेहरीयुक्त मौसम प्रणालीहरू',
      motion: '२,१०० किमी/घण्टा सम्मको चरम हावा',
      moons: '१६ चन्द्रमाहरू (ट्राइटन, प्रोटियस...)',
      description: 'वरुण सूर्यबाट आठौं र सबैभन्दा टाढा रहेको ज्ञात ग्रह हो। व्यासको आधारमा यो चौथो ठूलो र पिण्डको आधारमा तेस्रो ठूलो ग्रह हो। यसको पिण्ड पृथ्वीको भन्दा १७ गुणा बढी छ र यसलाई यसको जुम्ल्याहा ग्रह अरुण(Uranus) जस्तै आइस जाइन्ट मानिन्छ।'
    },
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
    color: 'from-blue-600 to-indigo-900'
  }
];
