/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Download,
  Code,
  Monitor,
  Shield,
  Cpu,
  Smartphone,
  Briefcase,
  GraduationCap,
  Languages,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Cloud,
  Database,
  MessageCircle,
  Send,
  RefreshCw,
  Palette,
  Trash2,
  Search,
  Share2,
  Wand2,
  Settings,
  Rocket,
  PenTool,
  Terminal,
  Sliders,
  Calculator,
  Coins,
  Map,
  LayoutGrid,
  TrendingUp,
  User,
  LayoutTemplate,
  FileText,
  Globe,
  Receipt,
  Image as ImageIcon,
  Quote,
  Heart,
  Users,
  UserCheck,
  UserPlus,
  MessageSquare,
  Bell,
  BellRing,
  Newspaper,
  ShoppingCart,
} from "lucide-react";

const Chatbot = lazy(() => import("./components/Chatbot"));
const WeatherTimeWidget = lazy(() => import("./components/WeatherTimeWidget"));
const NepalInfoWidget = lazy(() => import("./components/NepalInfoWidget"));
const NepalMarketRatesWidget = lazy(
  () => import("./components/NepalMarketRatesWidget"),
);
const CurrencyConverterWidget = lazy(
  () => import("./components/CurrencyConverterWidget"),
);
const ScientificCalculatorWidget = lazy(
  () => import("./components/ScientificCalculatorWidget"),
);
const AdminLoginModal = lazy(() => import("./components/AdminLoginModal"));
const ImageGeneratorModal = lazy(
  () => import("./components/ImageGeneratorModal"),
);
const PhotoEnhancerModal = lazy(
  () => import("./components/PhotoEnhancerModal"),
);
const ImageToPdfModal = lazy(() => import("./components/ImageToPdfModal"));
const ITCoursesModal = lazy(() => import("./components/ITCoursesModal"));
const TranslatorModal = lazy(() => import("./components/TranslatorModal"));
const InvoiceGeneratorModal = lazy(
  () => import("./components/InvoiceGeneratorModal"),
);
const MediaManagerModal = lazy(() => import("./components/MediaManagerModal"));
const PlacardGeneratorModal = lazy(
  () => import("./components/PlacardGeneratorModal"),
);
const QuotesModal = lazy(() => import("./components/QuotesModal"));
const AiTechStackModal = lazy(() => import("./components/AiTechStackModal"));
const NepalTravelModal = lazy(() => import("./components/NepalTravelModal"));
const MarketplaceModal = lazy(() => import("./components/MarketplaceModal"));
import AnalogClock from "./components/AnalogClock";
import SmartInfoWidget from "./components/SmartInfoWidget";
import TypewriterText from "./components/TypewriterText";
import EmiCalculator from "./components/EmiCalculator";
import SolarSystemSection from "./components/SolarSystemSection";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false);
  const [isPhotoEnhancerOpen, setIsPhotoEnhancerOpen] = useState(false);
  const [isPdfConverterOpen, setIsPdfConverterOpen] = useState(false);
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isInvoiceGeneratorOpen, setIsInvoiceGeneratorOpen] = useState(false);
  const [isPlacardGeneratorOpen, setIsPlacardGeneratorOpen] = useState(false);
  const [isQuotesModalOpen, setIsQuotesModalOpen] = useState(false);
  const [isLogoMenuOpen, setIsLogoMenuOpen] = useState(false);
  const [isAiTechStackOpen, setIsAiTechStackOpen] = useState(false);
  const [isMediaManagerOpen, setIsMediaManagerOpen] = useState(false);
  const [isITCoursesOpen, setIsITCoursesOpen] = useState(false);
  const [isNepalTravelOpen, setIsNepalTravelOpen] = useState(false);
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [activeWidget, setActiveWidget] = useState<
    "weather" | "calc" | "currency" | "nepal" | "market" | null
  >(null);
  const [isToolboxOpen, setIsToolboxOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState("default");
  const [activeNav, setActiveNav] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1243);
  const [isJoinedSub, setIsJoinedSub] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(856);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const themes = [
    "default",
    "emerald",
    "violet",
    "rose",
    "amber",
    "teal",
    "cyan",
    "indigo",
    "fuchsia",
    "orange",
    "slate",
  ];

  const toggleWidget = (
    widget: "weather" | "calc" | "currency" | "nepal" | "market",
  ) => {
    setActiveWidget((prev) => (prev === widget ? null : widget));
    setIsToolboxOpen(true);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handle body scroll locking when modals/widgets are open
  useEffect(() => {
    const isAnyModalOpen =
      isAdminModalOpen ||
      isImageGeneratorOpen ||
      isPhotoEnhancerOpen ||
      isPdfConverterOpen ||
      isTranslatorOpen ||
      isChatbotOpen ||
      isInvoiceGeneratorOpen ||
      isPlacardGeneratorOpen ||
      isQuotesModalOpen ||
      isAiTechStackOpen ||
      isMediaManagerOpen ||
      isNepalTravelOpen ||
      isToolboxOpen ||
      isContactOpen ||
      isMobileMenuOpen ||
      activeWidget !== null;

    if (isAnyModalOpen) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [
    isAdminModalOpen,
    isImageGeneratorOpen,
    isPhotoEnhancerOpen,
    isPdfConverterOpen,
    isTranslatorOpen,
    isChatbotOpen,
    isInvoiceGeneratorOpen,
    isPlacardGeneratorOpen,
    isQuotesModalOpen,
    isAiTechStackOpen,
    isMediaManagerOpen,
    isNepalTravelOpen,
    isToolboxOpen,
    isContactOpen,
    isMobileMenuOpen,
    activeWidget,
  ]);

  useEffect(() => {
    // Audio context click sounds were removed for performance and UX reasons.
  }, []);

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const navItems = [
    { id: "about", label: "About", icon: <User size={20} /> },
    { id: "skills", label: "Skills", icon: <Code size={20} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={20} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={20} /> },
    { id: "projects", label: "Projects", icon: <LayoutGrid size={20} /> },
    { id: "emi", label: "EMI Calc", icon: <Calculator size={20} /> },
    { id: "space", label: "Space", icon: <Rocket size={20} /> },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <MessageCircle size={20} />,
    },
    { id: "contact", label: "Contact", icon: <Mail size={20} /> },
  ];

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const searchItems = [
    ...navItems.map((item) => ({
      ...item,
      type: "section" as const,
      action: () => scrollToSection(item.id),
    })),
    {
      id: "image-generator",
      label: "Image Generator",
      icon: <Wand2 size={20} />,
      type: "tool" as const,
      action: () => setIsImageGeneratorOpen(true),
    },
    {
      id: "it-courses",
      label: "IT Courses & Tracks",
      icon: <GraduationCap size={20} />,
      type: "tool" as const,
      action: () => setIsITCoursesOpen(true),
    },
    {
      id: "photo-enhancer",
      label: "Photo Enhancer",
      icon: <Sparkles size={20} />,
      type: "tool" as const,
      action: () => setIsPhotoEnhancerOpen(true),
    },
    {
      id: "pdf-converter",
      label: "Image to PDF",
      icon: <FileText size={20} />,
      type: "tool" as const,
      action: () => setIsPdfConverterOpen(true),
    },
    {
      id: "translator",
      label: "Translator",
      icon: <Languages size={20} />,
      type: "tool" as const,
      action: () => setIsTranslatorOpen(true),
    },
    {
      id: "invoice-generator",
      label: "Invoice Generator",
      icon: <Receipt size={20} />,
      type: "tool" as const,
      action: () => setIsInvoiceGeneratorOpen(true),
    },
    {
      id: "placard-generator",
      label: "Placard Generator",
      icon: <LayoutTemplate size={20} />,
      type: "tool" as const,
      action: () => setIsPlacardGeneratorOpen(true),
    },
    {
      id: "quotes",
      label: "Quotes",
      icon: <Quote size={20} />,
      type: "tool" as const,
      action: () => setIsQuotesModalOpen(true),
    },
    {
      id: "tech-stack",
      label: "System Info",
      icon: <Cpu size={20} />,
      type: "tool" as const,
      action: () => setIsAiTechStackOpen(true),
    },
    {
      id: "media-manager",
      label: "Media Manager",
      icon: <ImageIcon size={20} />,
      type: "tool" as const,
      action: () => setIsMediaManagerOpen(true),
    },
    {
      id: "marketplace",
      label: "BiN_Store",
      icon: <ShoppingCart size={20} />,
      type: "tool" as const,
      action: () => setIsMarketplaceOpen(true),
    },
    {
      id: "nepal-travel",
      label: "Nepal Travel & Tours",
      icon: <MapPin size={20} />,
      type: "tool" as const,
      action: () => setIsNepalTravelOpen(true),
    },
    {
      id: "weather",
      label: "Weather & Time",
      icon: <Cloud size={20} />,
      type: "tool" as const,
      action: () => toggleWidget("weather"),
    },
    {
      id: "calc",
      label: "Scientific Calculator",
      icon: <Calculator size={20} />,
      type: "tool" as const,
      action: () => toggleWidget("calc"),
    },
    {
      id: "currency",
      label: "Currency Converter",
      icon: <Coins size={20} />,
      type: "tool" as const,
      action: () => toggleWidget("currency"),
    },
    {
      id: "nepal",
      label: "Nepal Info",
      icon: <Map size={20} />,
      type: "tool" as const,
      action: () => toggleWidget("nepal"),
    },
    {
      id: "market",
      label: "Market Rates",
      icon: <TrendingUp size={20} />,
      type: "tool" as const,
      action: () => toggleWidget("market"),
    },
    {
      id: "chatbot",
      label: "AI Assistant",
      icon: <MessageCircle size={20} />,
      type: "tool" as const,
      action: () => setIsChatbotOpen(true),
    },
  ];

  const filteredSearchItems = searchItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#EAEBED] font-sans text-[#006989]">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 md:backdrop-blur-md"
        style={{ backgroundColor: "rgba(1, 68, 33, 0.95)" }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] animate-gradient-x opacity-80"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #AD0E37, #F7B538, #014421, #F7B538, #AD0E37)",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 flex-row-reverse">
            <div className="flex items-center gap-4">
              <div
                className="flex-shrink-0 flex items-center gap-2 cursor-pointer relative"
                onClick={() => setIsLogoMenuOpen(!isLogoMenuOpen)}
              >
                <motion.div
                  className="rounded-xl p-[2px] shadow-lg shadow-[#AD0E37]/40 animate-gradient-x"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent, #AD0E37, transparent)",
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="rounded-[10px] overflow-hidden bg-[#FFD700] flex items-center justify-center">
                    <img
                      src="/logo.png"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/100x100/ffd700/014421?text=BiN";
                      }}
                      alt="BiN Logo"
                      width="40"
                      height="40"
                      decoding="async"
                      className="w-10 h-10 object-contain p-1"
                    />
                  </div>
                </motion.div>

                <AnimatePresence>
                  {isLogoMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-14 right-0 mt-2 w-64 bg-[#014421] border border-[#F7B538]/30 rounded-xl shadow-2xl overflow-hidden py-2 z-50 text-left"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsITCoursesOpen(true);
                          setIsLogoMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F7B538]/10 text-left transition-colors"
                      >
                        <GraduationCap size={18} className="text-[#F7B538]" />
                        <span className="text-white text-sm font-medium">
                          Famous IT Courses
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-2 lg:space-x-4 items-center">
              {/* Search Bar */}
              <div
                className={`relative group hidden lg:block mr-2 transition-all duration-300 ${isSearchFocused || searchQuery ? "w-48" : "w-9"}`}
              >
                <div
                  className={`absolute inset-y-0 left-0 flex items-center pointer-events-none transition-all duration-300 ${isSearchFocused || searchQuery ? "pl-3" : "pl-2.5"}`}
                >
                  <Search
                    size={16}
                    className={
                      isSearchFocused || searchQuery
                        ? "text-[#F7B538]/70"
                        : "text-[#F7B538]"
                    }
                  />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() =>
                    setTimeout(() => setIsSearchFocused(false), 200)
                  }
                  placeholder={
                    isSearchFocused || searchQuery ? "Search app..." : ""
                  }
                  className={`w-full bg-[#014421]/50 border border-[#F7B538]/30 text-[#F7B538] placeholder-[#F7B538]/50 rounded-full py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F7B538]/50 focus:bg-[#014421] transition-all ${isSearchFocused || searchQuery ? "pl-9 pr-4" : "pl-9 pr-0 cursor-pointer hover:bg-[#014421]/80 shadow-sm shadow-[#AD0E37]/20 p-[2px]"}`}
                />
                <AnimatePresence>
                  {isSearchFocused && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-[#014421] border border-[#F7B538]/30 rounded-xl shadow-2xl overflow-hidden py-2"
                    >
                      {filteredSearchItems.length > 0 ? (
                        <div className="max-h-64 overflow-y-auto custom-scrollbar">
                          {filteredSearchItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => {
                                item.action();
                                setSearchQuery("");
                                setIsSearchFocused(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#F7B538]/10 text-left transition-colors"
                            >
                              <span className="text-[#F7B538]">
                                {item.icon}
                              </span>
                              <div>
                                <div className="text-white text-sm font-medium">
                                  {item.label}
                                </div>
                                <div className="text-[#F7B538]/50 text-xs capitalize">
                                  {item.type}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-3 text-sm text-[#F7B538]/70 text-center">
                          No matching results
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                    activeNav === item.id
                      ? "text-[#F7B538] shadow-md shadow-[#AD0E37]/20 p-[2px]"
                      : "text-[#F7B538] hover:text-[#F7B538] p-[2px]"
                  }`}
                  title={item.label}
                >
                  <div
                    className={`absolute inset-0 z-0 transition-opacity duration-300 animate-gradient-x ${activeNav === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, transparent, #AD0E37, transparent)",
                    }}
                  />
                  <div
                    className={`absolute inset-[2px] bg-[#014421] rounded-full z-0 transition-opacity duration-300 ${activeNav === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  ></div>

                  <div
                    className={`relative z-10 flex items-center gap-2 ${activeNav === item.id ? "px-3 py-1.5" : "px-3 py-1.5 group-hover:px-3 group-hover:py-1.5"}`}
                  >
                    {item.icon}
                    {activeNav === item.id && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        className="text-sm font-bold whitespace-nowrap overflow-hidden origin-left"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </div>
                </button>
              ))}

              <div className="w-px h-6 bg-[#F7B538]/30 mx-2"></div>

              <div className="relative group/theme flex items-center">
                <button
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  onMouseEnter={() => {
                    setActiveNav("theme");
                    setIsThemeMenuOpen(true);
                  }}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                    activeNav === "theme"
                      ? "text-[#F7B538] shadow-md shadow-[#AD0E37]/20 p-[2px]"
                      : "text-[#F7B538] hover:text-[#F7B538] p-[2px]"
                  }`}
                  title="Change Theme"
                >
                  <div
                    className={`absolute inset-0 z-0 transition-opacity duration-300 animate-gradient-x ${activeNav === "theme" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, transparent, #AD0E37, transparent)",
                    }}
                  />
                  <div
                    className={`absolute inset-[2px] bg-[#014421] rounded-full z-0 transition-opacity duration-300 ${activeNav === "theme" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  ></div>

                  <div
                    className={`relative z-10 flex items-center gap-2 ${activeNav === "theme" ? "px-3 py-1.5" : "px-3 py-1.5 group-hover:px-3 group-hover:py-1.5"}`}
                  >
                    <Palette size={20} />
                    {activeNav === "theme" && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        className="text-sm font-bold whitespace-nowrap overflow-hidden origin-left capitalize"
                      >
                        {theme}
                      </motion.span>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isThemeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseLeave={() => {
                        setIsThemeMenuOpen(false);
                        setActiveNav(null);
                      }}
                      className="absolute top-12 left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#014421] border border-[#F7B538]/30 rounded-xl shadow-2xl overflow-hidden py-3 z-50 px-3 grid grid-cols-3 gap-2"
                    >
                      <div className="col-span-3 pb-2 mb-2 border-b border-[#F7B538]/20 flex justify-between items-center px-1">
                        <span className="text-white text-xs font-bold tracking-wider">
                          SELECT THEME
                        </span>
                        <Palette size={14} className="text-[#F7B538]" />
                      </div>
                      {themes.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setTheme(t);
                            setIsThemeMenuOpen(false);
                            setActiveNav(null);
                          }}
                          className={`flex items-center justify-center py-2 transition-all duration-200 hover:-translate-y-0.5 ${
                            theme === t
                              ? "text-[#F7B538] font-black scale-110"
                              : "text-white/70 hover:text-white font-medium"
                          }`}
                        >
                          <span className="text-xs uppercase tracking-wider">
                            {t}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => {
                  setActiveNav("refresh");
                  window.location.reload();
                }}
                className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 overflow-hidden ${
                  activeNav === "refresh"
                    ? "text-[#F7B538] shadow-md shadow-[#AD0E37]/20 p-[2px]"
                    : "text-[#F7B538] hover:text-[#F7B538] p-[2px]"
                }`}
                title="Refresh Page"
              >
                <div
                  className={`absolute inset-0 z-0 transition-opacity duration-300 animate-gradient-x ${activeNav === "refresh" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent, #AD0E37, transparent)",
                  }}
                />
                <div
                  className={`absolute inset-[2px] bg-[#014421] rounded-full z-0 transition-opacity duration-300 ${activeNav === "refresh" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                ></div>

                <div
                  className={`relative z-10 flex items-center gap-2 ${activeNav === "refresh" ? "px-3 py-1.5" : "px-3 py-1.5 group-hover:px-3 group-hover:py-1.5"}`}
                >
                  <RefreshCw size={20} />
                  {activeNav === "refresh" && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      className="text-sm font-bold whitespace-nowrap overflow-hidden origin-left"
                    >
                      Refresh
                    </motion.span>
                  )}
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={cycleTheme}
                className="text-[#F7B538] hover:text-white"
                title="Change Theme"
              >
                <Palette size={20} />
              </button>
              <button
                onClick={() => window.location.reload()}
                className="text-[#F7B538] hover:text-white"
                title="Refresh Page"
              >
                <RefreshCw size={20} />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#F7B538] hover:text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden border-b border-[#F7B538]/20"
            style={{ backgroundColor: "#014421" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="px-3 py-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-[#F7B538]/70" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search app..."
                    className="w-full bg-white/10 border border-[#F7B538]/30 text-[#F7B538] placeholder-[#F7B538]/50 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#F7B538]/50 transition-all"
                  />
                </div>
              </div>

              {!searchQuery ? (
                <>
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#F7B538] hover:text-white hover:bg-white/10 flex items-center gap-3"
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  {filteredSearchItems.length > 0 ? (
                    filteredSearchItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          item.action();
                          setSearchQuery("");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 text-left transition-colors"
                      >
                        <span className="text-[#F7B538]">{item.icon}</span>
                        <div>
                          <div className="text-white text-sm font-medium">
                            {item.label}
                          </div>
                          <div className="text-[#F7B538]/50 text-xs capitalize">
                            {item.type}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-[#F7B538]/70 text-center">
                      No matching results
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" className="relative bg-white overflow-hidden">
          {/* Beautiful Everest/Nepal Background Image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.25]"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000")',
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-24 relative z-10 w-full flex flex-col md:flex-row md:justify-between">
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 flex flex-col gap-3 sm:gap-4 items-end">
              <SmartInfoWidget />
            </div>
            <div className="max-w-3xl sm:mt-0 md:mt-0 sm:pl-0 pl-2 mt-20 sm:mt-24 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#006989] mb-4"
                >
                  BiNAY <br />
                  <span className="text-blue-600">PARAJULI</span>
                </motion.h1>
                <h2 className="text-2xl md:text-3xl font-medium text-emerald-500 mb-6">
                  Software Developer
                </h2>

                {/* Social Interaction Bar */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-10 bg-white/40 backdrop-blur-md p-2.5 sm:p-3.5 rounded-[1.25rem] border-2 border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-fit transition-all duration-300 hover:bg-white/50 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] group">
                  {/* Follow */}
                  <button
                    onClick={() => {
                      if (isFollowing) {
                        setIsFollowing(false);
                        setFollowersCount((prev) => prev - 1);
                      } else {
                        setIsFollowing(true);
                        setFollowersCount((prev) => prev + 1);
                      }
                    }}
                    className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform active:scale-95 shadow-sm ${isFollowing ? "bg-emerald-100 text-emerald-800 shadow-emerald-200 border border-emerald-200" : "bg-gradient-to-r from-[#006989] to-[#004e66] text-white hover:shadow-md hover:-translate-y-0.5"}`}
                  >
                    {isFollowing ? (
                      <UserCheck className="w-4 h-4" />
                    ) : (
                      <UserPlus className="w-4 h-4" />
                    )}
                    <span>{isFollowing ? "Following" : "Follow"}</span>
                  </button>
                  <div className="flex flex-col text-[#006989] pr-2 items-center min-w-[3rem]">
                    <span className="font-extrabold text-base leading-none tracking-tight">
                      {followersCount.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-60 mt-0.5">
                      Followers
                    </span>
                  </div>

                  <div className="hidden sm:block w-px h-10 bg-slate-400/30 mx-1"></div>

                  <div className="hidden sm:flex flex-col text-[#006989] px-2 items-center min-w-[3rem]">
                    <span className="font-extrabold text-base leading-none tracking-tight">
                      235
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-60 mt-0.5">
                      Following
                    </span>
                  </div>

                  <div className="hidden sm:block w-px h-10 bg-slate-400/30 mx-1"></div>

                  {/* Subscribe */}
                  <button
                    onClick={() => setIsJoinedSub(!isJoinedSub)}
                    className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 transform active:scale-95 shadow-sm ${isJoinedSub ? "bg-red-50 text-red-600 border border-red-200 shadow-red-100" : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-md hover:-translate-y-0.5"}`}
                  >
                    {isJoinedSub ? (
                      <BellRing className="w-4 h-4 animate-wiggle" />
                    ) : (
                      <Bell className="w-4 h-4" />
                    )}
                    <span>{isJoinedSub ? "Subscribed" : "Subscribe"}</span>
                  </button>

                  <div className="w-px h-10 bg-slate-400/30 mx-1"></div>

                  {/* Likes and Comments */}
                  <div className="flex items-center gap-4 text-[#006989] pl-2 pr-1">
                    <button
                      onClick={() => {
                        if (isLiked) {
                          setIsLiked(false);
                          setLikesCount((prev) => prev - 1);
                        } else {
                          setIsLiked(true);
                          setLikesCount((prev) => prev + 1);
                        }
                      }}
                      className={`group/like flex items-center gap-1.5 font-bold transition-all duration-300 transform active:scale-90 ${isLiked ? "text-rose-500" : "hover:text-rose-500"}`}
                    >
                      <Heart
                        className={`w-5 h-5 transition-transform duration-300 ${isLiked ? "fill-current scale-110" : "group-hover/like:scale-110"}`}
                      />
                      <span className="text-base">
                        {likesCount.toLocaleString()}
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        alert("Comments section is not available yet.")
                      }
                      className="group/comment flex items-center gap-1.5 font-bold hover:text-blue-600 transition-all duration-300 transform active:scale-90"
                    >
                      <MessageSquare className="w-5 h-5 transition-transform duration-300 group-hover/comment:scale-110" />
                      <span className="text-base">142</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="max-w-lg rounded-xl p-[2px] bg-gradient-to-r from-blue-600 via-emerald-500 to-yellow-500 animate-gradient-x">
                    <div className="bg-white px-5 py-3 rounded-[10px] h-full w-full flex items-center min-h-[44px]">
                      <TypewriterText
                        text='"First solve the problem, then write the code."'
                        className="text-sm text-[#006989] italic font-medium uppercase"
                        delay={500}
                        speed={50}
                      />
                    </div>
                  </div>
                  <div className="hidden sm:block rounded-full p-[3px] bg-gradient-to-r from-blue-600 via-emerald-500 to-yellow-500 shrink-0 animate-gradient-x">
                    <img
                      src="https://www.shutterstock.com/image-vector/nepal-flag-raised-on-mountain-260nw-2542763927.jpg"
                      alt="Nepal Flag on Mountain"
                      width="80"
                      height="80"
                      loading="lazy"
                      decoding="async"
                      className="h-20 w-20 object-cover rounded-full border-2 border-white shadow-md will-change-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <motion.button
                    layout
                    onClick={() => setIsChatbotOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-10 sm:h-12 px-4 sm:px-6 bg-[length:200%_auto] bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 text-white font-medium rounded-full hover:bg-right transition-all duration-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] flex items-center justify-center gap-2 border border-emerald-300/30 shrink-0"
                    title="BiN AI Chat"
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    <span className="whitespace-nowrap text-sm sm:text-base font-bold">
                      BiN AI Chat
                    </span>
                  </motion.button>

                  <motion.button
                    layout
                    onClick={() => setIsImageGeneratorOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-10 sm:h-12 px-4 sm:px-6 bg-[length:200%_auto] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500 text-white font-medium rounded-full hover:bg-right transition-all duration-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] flex items-center justify-center gap-2 border border-purple-400/30 shrink-0"
                    title="AI Image Gen"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    <span className="whitespace-nowrap text-sm sm:text-base font-bold">
                      AI Image Gen
                    </span>
                  </motion.button>

                  <motion.button
                    layout
                    onClick={() => setIsPdfConverterOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-10 sm:h-12 px-4 sm:px-6 bg-[length:200%_auto] bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white font-medium rounded-full hover:bg-right transition-all duration-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] hover:shadow-[0_0_25px_rgba(244,63,94,0.7)] flex items-center justify-center gap-2 border border-rose-400/30 shrink-0"
                    title="JPG/PNG to PDF Converter"
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    <span className="whitespace-nowrap text-sm sm:text-base font-bold">
                      BiN PDF
                    </span>
                  </motion.button>

                  <motion.button
                    layout
                    onClick={() => setIsTranslatorOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-10 sm:h-12 px-4 sm:px-6 bg-[length:200%_auto] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white font-medium rounded-full hover:bg-right transition-all duration-500 shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.7)] flex items-center justify-center gap-2 border border-amber-400/30 shrink-0"
                    title="BPTranslator"
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    <span className="whitespace-nowrap text-sm sm:text-base font-bold">
                      BPTranslator
                    </span>
                  </motion.button>

                  <motion.button
                    layout
                    onClick={() => setIsInvoiceGeneratorOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-10 sm:h-12 px-4 sm:px-6 bg-[length:200%_auto] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 text-white font-medium rounded-full hover:bg-right transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] flex items-center justify-center gap-2 border border-blue-400/30 shrink-0"
                    title="Invoice Generator"
                  >
                    <span className="whitespace-nowrap text-sm sm:text-base font-bold">
                      Invoice MNG
                    </span>
                  </motion.button>

                  <motion.button
                    layout
                    onClick={() => setIsPlacardGeneratorOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-10 sm:h-12 px-4 sm:px-6 bg-[length:200%_auto] bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-500 text-white font-medium rounded-full hover:bg-right transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] flex items-center justify-center gap-2 border border-cyan-400/30 shrink-0"
                    title="Placard Generator"
                  >
                    <LayoutTemplate className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap text-sm sm:text-base font-bold">
                      Card Design
                    </span>
                  </motion.button>

                  <motion.button
                    layout
                    onClick={() => setIsMarketplaceOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-10 sm:h-12 px-4 sm:px-6 bg-[length:200%_auto] bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white font-medium rounded-full hover:bg-right transition-all duration-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] flex items-center justify-center gap-2 border border-emerald-400/30 shrink-0"
                    title="BiN_Store"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap text-sm sm:text-base font-bold">
                      BiN_Store
                    </span>
                  </motion.button>

                  <motion.button
                    layout
                    onClick={() => setIsQuotesModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-10 sm:h-12 px-4 sm:px-6 bg-[length:200%_auto] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-medium rounded-full hover:bg-right transition-all duration-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] flex items-center justify-center gap-2 border border-purple-400/30 shrink-0"
                    title="150+ Nepali English Quotes"
                  >
                    <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="whitespace-nowrap text-sm sm:text-base font-bold">
                      Quotes
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16 md:py-20 bg-[#EAEBED]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h3 className="text-sm font-bold tracking-widest text-yellow-500 uppercase mb-3">
                About Me
              </h3>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                Passionate about creating elegant solutions to complex problems.
              </h2>
              <div className="prose prose-lg text-[#006989]">
                <TypewriterText
                  text="I am a dedicated Software Developer with a strong foundation in Information Technology, holding a BSc IT degree. My journey in tech has been driven by an insatiable curiosity and a desire to build applications that make a difference."
                  speed={20}
                />
                <TypewriterText
                  text="With experience spanning from web and app development to computer training, I bring a well-rounded perspective to every project. I thrive in environments that challenge me to learn new technologies and apply them to real-world scenarios. My career aspiration is to continue growing as a full-stack developer, creating scalable and user-centric software solutions."
                  className="mt-4"
                  delay={4600}
                  speed={20}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-bold tracking-widest text-yellow-500 uppercase mb-3 text-center">
              Expertise
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-[#006989] mb-12 text-center">
              Technical Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Software Development",
                  icon: <Code size={24} />,
                  level: 90,
                  color: "blue",
                },
                {
                  name: "Web Design",
                  icon: <Monitor size={24} />,
                  level: 85,
                  color: "emerald",
                },
                {
                  name: "iOS/Android Tools",
                  icon: <Smartphone size={24} />,
                  level: 80,
                  color: "yellow",
                },
                {
                  name: "A. Intelligence",
                  icon: <Cpu size={24} />,
                  level: 75,
                  color: "blue",
                },
                {
                  name: "Security Systems",
                  icon: <Shield size={24} />,
                  level: 70,
                  color: "emerald",
                },
                {
                  name: "Graphics Design",
                  icon: <Palette size={24} />,
                  level: 65,
                  color: "yellow",
                },
                {
                  name: "System Tools & Admin",
                  icon: <Settings size={24} />,
                  level: 80,
                  color: "blue",
                },
                {
                  name: "HTML5 Canvas & WebGL",
                  icon: <PenTool size={24} />,
                  level: 75,
                  color: "emerald",
                },
                {
                  name: "Terminal & CLI Tools",
                  icon: <Terminal size={24} />,
                  level: 85,
                  color: "yellow",
                },
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-[#EAEBED] p-6 rounded-2xl border border-slate-100"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-lg ${
                        skill.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : skill.color === "emerald"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {skill.icon}
                    </div>
                    <h4 className="font-semibold text-[#006989]">
                      {skill.name}
                    </h4>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        skill.color === "blue"
                          ? "bg-blue-600"
                          : skill.color === "emerald"
                            ? "bg-emerald-500"
                            : "bg-yellow-500"
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section
          id="experience"
          className="relative py-12 sm:py-16 md:py-20 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://foolproof.co.uk/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fcvoflf8wnkzm%2FWSpvpKL8KT1ZBqQEy0Vlm%2F2d5bfb63d4fed1e4cedd9c2e4ed06619%2FExperience_design__a_definition_-_Hero_image&w=1200&q=75')`,
          }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[#EAEBED]/85 md:backdrop-blur-sm"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Experience */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Briefcase className="text-emerald-500" size={28} />
                  <h2 className="text-3xl font-bold text-[#006989]">
                    Experience
                  </h2>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Briefcase size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-[#006989]">
                          Web/Apps Developer
                        </h4>
                      </div>
                      <div className="text-sm text-blue-600 font-medium mb-2">
                        IMS Group
                      </div>
                      <div className="text-sm text-slate-500">2022 - 2024</div>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Briefcase size={16} />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-[#006989]">
                          Computer Trainer
                        </h4>
                      </div>
                      <div className="text-sm text-blue-600 font-medium mb-2">
                        Harati IT Solution
                      </div>
                      <div className="text-sm text-slate-500">2021 - 2022</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education & Languages */}
              <div id="education">
                <div className="flex items-center gap-3 mb-8">
                  <GraduationCap className="text-emerald-500" size={28} />
                  <h2 className="text-3xl font-bold text-[#006989]">
                    Education
                  </h2>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-12">
                  <h4 className="font-bold text-xl text-[#006989] mb-1">
                    BSc IT
                  </h4>
                  <div className="text-blue-600 font-medium mb-3">
                    Softwarica IT College
                  </div>
                  <div className="flex items-center text-slate-500 text-sm gap-2 mb-4">
                    <MapPin size={14} />
                    <a
                      href="https://www.realtynepal.com/property/land-for-sale-in-dillibazar-kalikasthan-13220/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-600 transition-colors flex items-center gap-1"
                      title="View Property in DilliBazar"
                    >
                      DilliBazer - KTM Nepal
                      <ExternalLink size={12} className="opacity-70" />
                    </a>
                  </div>
                  <div className="inline-block px-3 py-1 bg-slate-100 text-[#006989] text-sm font-medium rounded-full">
                    2074 - 2078
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-8">
                  <Languages className="text-emerald-500" size={28} />
                  <h2 className="text-3xl font-bold text-[#006989]">
                    Languages
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Nepali",
                      level: "Native",
                      desc: "Mother tongue, full professional proficiency in reading, writing, and speaking.",
                    },
                    {
                      name: "English",
                      level: "Fluent",
                      desc: "Professional working proficiency. Excellent in technical documentation and communication.",
                    },
                    {
                      name: "Japanese",
                      level: "Intermediate",
                      desc: "Conversational ability. Good understanding of daily interactions and basic reading.",
                    },
                    {
                      name: "Hindi",
                      level: "Fluent",
                      desc: "Full professional proficiency in speaking and listening.",
                    },
                  ].map((lang) => (
                    <div
                      key={lang.name}
                      className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-start text-left hover:shadow-md transition-shadow group"
                    >
                      <div className="flex justify-between items-center w-full mb-2">
                        <span className="font-bold text-[#006989] text-lg group-hover:text-blue-600 transition-colors">
                          {lang.name}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                          {lang.level}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {lang.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects / Portfolio Section */}
        <section id="projects" className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-bold tracking-widest text-yellow-500 uppercase mb-3 text-center">
              Portfolio
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-[#006989] mb-12 text-center">
              Featured IT Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 1,
                  title: "E-Commerce Platform",
                  desc: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment gateway integration, and an admin dashboard.",
                  image:
                    "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
                  tech: ["React", "Node.js", "MongoDB"],
                },
                {
                  id: 2,
                  title: "Smart Security Dashboard",
                  desc: "An IoT-based security monitoring system. Provides real-time alerts, camera feed integration, and automated threat detection using basic AI models.",
                  image:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
                  tech: ["Python", "Vue.js", "IoT"],
                },
                {
                  id: 3,
                  title: "Mobile Task Manager",
                  desc: "A cross-platform mobile application for task management and team collaboration. Built using React Native with offline support and cloud sync.",
                  image:
                    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
                  tech: ["React Native", "Firebase"],
                },
              ].map((project) => (
                <div
                  key={project.id}
                  className="group rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="font-bold text-xl text-[#006989] mb-2">
                      {project.title}
                    </h4>
                    <p className="text-[#006989] text-sm mb-4 flex-grow">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-slate-100 text-[#006989] text-xs font-medium rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 mt-auto"
                    >
                      View Project <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EMI Calculator Section */}
        <section
          id="emi"
          className="bg-[#f8fafc] border-t border-slate-100 overflow-hidden relative"
        >
          <EmiCalculator />
        </section>

        {/* Space Section */}
        <SolarSystemSection />

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-12 sm:py-16 md:py-20 bg-[#EAEBED]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-bold tracking-widest text-yellow-500 uppercase mb-3 text-center">
              Testimonials
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-[#006989] mb-12 text-center">
              What People Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Project Manager at IMS Group",
                  text: "Bhuwan is an exceptional developer. His ability to quickly grasp complex problems and deliver clean, efficient code is impressive. He was a valuable asset to our team.",
                  image: "https://picsum.photos/seed/sarah/100/100",
                },
                {
                  name: "Rajesh Shrestha",
                  role: "Director at Harati IT Solution",
                  text: "As a computer trainer, Bhuwan showed great patience and deep technical knowledge. His students always provided excellent feedback on his teaching methods.",
                  image: "https://picsum.photos/seed/rajesh/100/100",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative"
                >
                  <div className="text-emerald-500 mb-6">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M14.017 21L16.439 14.382H10.281V3H21.719V14.382L19.297 21H14.017ZM3.736 21L6.158 14.382H0V3H11.439V14.382L9.017 21H3.736Z" />
                    </svg>
                  </div>
                  <p className="text-[#006989] italic mb-6 text-lg">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                      className="w-12 h-12 rounded-full object-cover will-change-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-[#006989]">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative py-12 sm:py-16 md:py-20 text-[#006989] min-h-[400px] flex items-center overflow-hidden"
        >
          {/* Smart Building Background Image */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.3]"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000")',
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#EAEBED] via-[#EAEBED]/90 to-[#EAEBED]/95"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            {!isContactOpen ? (
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  CONTACT INFO
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsContactOpen(true)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all flex items-center gap-3 shadow-lg shadow-blue-500/30"
                >
                  <Mail size={24} />
                  <span>Get In Touch</span>
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative"
              >
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="absolute -top-10 right-0 text-[#006989]/60 hover:text-[#006989] flex items-center gap-2 transition-colors"
                >
                  <X size={20} /> Close
                </button>
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3">
                    Get In Touch
                  </h3>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Let's work together.
                  </h2>
                  <p className="text-[#006989]/80 mb-8 max-w-md">
                    I'm currently available for freelance work and open to new
                    opportunities. If you have a project that you want to get
                    started, think you need my help with something or just fancy
                    saying hey, then get in touch.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-600/10 text-blue-600 rounded-lg shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm text-[#006989]/60 mb-1">
                          Phone
                        </h4>
                        <p className="font-medium text-lg">9863791005</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-600/10 text-blue-600 rounded-lg shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm text-[#006989]/60 mb-1">
                          Email
                        </h4>
                        <p className="font-medium text-lg">
                          parajulibhuwan59@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-600/10 text-blue-600 rounded-lg shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm text-[#006989]/60 mb-1">
                          Address
                        </h4>
                        <p className="font-medium text-lg">
                          Manahara-9 Suncity
                          <br />
                          Kathmandu-Nepal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-lg shadow-blue-900/5">
                  <form
                    className="space-y-6"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#006989] mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full bg-[#EAEBED] border border-blue-200 rounded-lg px-4 py-3 text-[#006989] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-[#006989]/40"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#006989] mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-[#EAEBED] border border-blue-200 rounded-lg px-4 py-3 text-[#006989] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-[#006989]/40"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[#006989] mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full bg-[#EAEBED] border border-blue-200 rounded-lg px-4 py-3 text-[#006989] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none placeholder:text-[#006989]/40"
                        placeholder="How can I help you?"
                      ></textarea>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="flex-1 bg-blue-600 text-white font-medium rounded-lg px-4 py-3 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
                      >
                        <Send
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                        Send Message
                      </motion.button>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://wa.me/9863791005"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 text-white font-medium rounded-lg px-4 py-3 hover:bg-green-600 transition-colors flex items-center justify-center gap-2 group"
                      >
                        <MessageCircle
                          size={16}
                          className="group-hover:rotate-12 transition-transform"
                        />
                        WhatsApp Chat
                      </motion.a>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} BiNAY PARAJULI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Widgets */}
      <Suspense fallback={null}>
        <AdminLoginModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          onSuccess={() => {
            setIsAdminLoggedIn(true);
            alert("Successfully logged in as Admin!");
          }}
        />

        <ImageGeneratorModal
          isOpen={isImageGeneratorOpen}
          onClose={() => setIsImageGeneratorOpen(false)}
        />

        <PhotoEnhancerModal
          isOpen={isPhotoEnhancerOpen}
          onClose={() => setIsPhotoEnhancerOpen(false)}
        />

        <ImageToPdfModal
          isOpen={isPdfConverterOpen}
          onClose={() => setIsPdfConverterOpen(false)}
        />

        <MarketplaceModal
          isOpen={isMarketplaceOpen}
          onClose={() => setIsMarketplaceOpen(false)}
        />

        <ITCoursesModal
          isOpen={isITCoursesOpen}
          onClose={() => setIsITCoursesOpen(false)}
        />

        <TranslatorModal
          isOpen={isTranslatorOpen}
          onClose={() => setIsTranslatorOpen(false)}
        />

        <Chatbot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
        />

        <InvoiceGeneratorModal
          isOpen={isInvoiceGeneratorOpen}
          onClose={() => setIsInvoiceGeneratorOpen(false)}
        />

        <PlacardGeneratorModal
          isOpen={isPlacardGeneratorOpen}
          onClose={() => setIsPlacardGeneratorOpen(false)}
        />

        <QuotesModal
          isOpen={isQuotesModalOpen}
          onClose={() => setIsQuotesModalOpen(false)}
        />

        <AiTechStackModal
          isOpen={isAiTechStackOpen}
          onClose={() => setIsAiTechStackOpen(false)}
        />

        <MediaManagerModal
          isOpen={isMediaManagerOpen}
          onClose={() => setIsMediaManagerOpen(false)}
        />

        <NepalTravelModal
          isOpen={isNepalTravelOpen}
          onClose={() => setIsNepalTravelOpen(false)}
        />

        <WeatherTimeWidget
          isOpen={activeWidget === "weather"}
          onClose={() => setActiveWidget(null)}
        />
        <ScientificCalculatorWidget
          isOpen={activeWidget === "calc"}
          onClose={() => setActiveWidget(null)}
        />
        <CurrencyConverterWidget
          isOpen={activeWidget === "currency"}
          onClose={() => setActiveWidget(null)}
        />
        <NepalInfoWidget
          isOpen={activeWidget === "nepal"}
          onClose={() => setActiveWidget(null)}
        />
        <NepalMarketRatesWidget
          isOpen={activeWidget === "market"}
          onClose={() => setActiveWidget(null)}
        />
      </Suspense>

      {/* Floating Speed Dial / Toolbox */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {isToolboxOpen && (
          <div className="flex flex-col gap-3 items-end mb-2 pointer-events-auto">
            <motion.button
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.9,
                borderColor: "transparent",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                borderColor: ["#014421", "#0a5c36", "#014421"],
                boxShadow: [
                  "0 0 0px rgba(1,68,33,0)",
                  "0 0 8px rgba(1,68,33,0.6)",
                  "0 0 0px rgba(1,68,33,0)",
                ],
              }}
              transition={{
                delay: 0.15,
                borderColor: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
              onClick={() => toggleWidget("weather")}
              className={`flex items-center gap-2 pr-1 pl-3 py-1 rounded-full border-2 md:backdrop-blur-md ${activeWidget === "weather" ? "bg-[#FFD700]/100" : "bg-[#FFD700]/90 hover:bg-[#FFD700]"}`}
            >
              <span
                className={`text-xs font-bold ${activeWidget === "weather" ? "text-[#014421]" : "text-[#014421]/80"}`}
              >
                Weather & Time
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${activeWidget === "weather" ? "bg-[#014421] text-[#FFD700] shadow-lg shadow-[#014421]/30" : "bg-[#014421]/90 text-[#FFD700]"}`}
              >
                <Cloud size={14} />
              </div>
            </motion.button>

            <motion.button
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.9,
                borderColor: "transparent",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                borderColor: ["#014421", "#0a5c36", "#014421"],
                boxShadow: [
                  "0 0 0px rgba(1,68,33,0)",
                  "0 0 8px rgba(1,68,33,0.6)",
                  "0 0 0px rgba(1,68,33,0)",
                ],
              }}
              transition={{
                delay: 0.1,
                borderColor: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.5,
                },
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
              onClick={() => toggleWidget("calc")}
              className={`flex items-center gap-2 pr-1 pl-3 py-1 rounded-full border-2 md:backdrop-blur-md ${activeWidget === "calc" ? "bg-[#FFD700]/100" : "bg-[#FFD700]/90 hover:bg-[#FFD700]"}`}
            >
              <span
                className={`text-xs font-bold ${activeWidget === "calc" ? "text-[#014421]" : "text-[#014421]/80"}`}
              >
                Calculator
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${activeWidget === "calc" ? "bg-[#014421] text-[#FFD700] shadow-lg shadow-[#014421]/30" : "bg-[#014421]/90 text-[#FFD700]"}`}
              >
                <Calculator size={14} />
              </div>
            </motion.button>

            <motion.button
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.9,
                borderColor: "transparent",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                borderColor: ["#014421", "#0a5c36", "#014421"],
                boxShadow: [
                  "0 0 0px rgba(1,68,33,0)",
                  "0 0 8px rgba(1,68,33,0.6)",
                  "0 0 0px rgba(1,68,33,0)",
                ],
              }}
              transition={{
                delay: 0.05,
                borderColor: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1.0,
                },
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1.0,
                },
              }}
              onClick={() => toggleWidget("currency")}
              className={`flex items-center gap-2 pr-1 pl-3 py-1 rounded-full border-2 md:backdrop-blur-md ${activeWidget === "currency" ? "bg-[#FFD700]/100" : "bg-[#FFD700]/90 hover:bg-[#FFD700]"}`}
            >
              <span
                className={`text-xs font-bold ${activeWidget === "currency" ? "text-[#014421]" : "text-[#014421]/80"}`}
              >
                Currency
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${activeWidget === "currency" ? "bg-[#014421] text-[#FFD700] shadow-lg shadow-[#014421]/30" : "bg-[#014421]/90 text-[#FFD700]"}`}
              >
                <Coins size={14} />
              </div>
            </motion.button>

            <motion.button
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.9,
                borderColor: "transparent",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                borderColor: ["#014421", "#0a5c36", "#014421"],
                boxShadow: [
                  "0 0 0px rgba(1,68,33,0)",
                  "0 0 8px rgba(1,68,33,0.6)",
                  "0 0 0px rgba(1,68,33,0)",
                ],
              }}
              transition={{
                delay: 0,
                borderColor: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1.5,
                },
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1.5,
                },
              }}
              onClick={() => toggleWidget("nepal")}
              className={`flex items-center gap-2 pr-1 pl-3 py-1 rounded-full border-2 md:backdrop-blur-md ${activeWidget === "nepal" ? "bg-[#FFD700]/100" : "bg-[#FFD700]/90 hover:bg-[#FFD700]"}`}
            >
              <span
                className={`text-xs font-bold ${activeWidget === "nepal" ? "text-[#014421]" : "text-[#014421]/80"}`}
              >
                Nepal Info
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${activeWidget === "nepal" ? "bg-[#014421] text-[#FFD700] shadow-lg shadow-[#014421]/30" : "bg-[#014421]/90 text-[#FFD700]"}`}
              >
                <Map size={14} />
              </div>
            </motion.button>

            <motion.button
              initial={{
                opacity: 0,
                y: 10,
                scale: 0.9,
                borderColor: "transparent",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                borderColor: ["#014421", "#0a5c36", "#014421"],
                boxShadow: [
                  "0 0 0px rgba(1,68,33,0)",
                  "0 0 8px rgba(1,68,33,0.6)",
                  "0 0 0px rgba(1,68,33,0)",
                ],
              }}
              transition={{
                delay: 0,
                borderColor: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1.8,
                },
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1.8,
                },
              }}
              onClick={() => toggleWidget("market")}
              className={`flex items-center gap-2 pr-1 pl-3 py-1 rounded-full border-2 md:backdrop-blur-md ${activeWidget === "market" ? "bg-[#FFD700]/100" : "bg-[#FFD700]/90 hover:bg-[#FFD700]"}`}
            >
              <span
                className={`text-xs font-bold ${activeWidget === "market" ? "text-[#014421]" : "text-[#014421]/80"}`}
              >
                बजार दरहरू (Rates)
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${activeWidget === "market" ? "bg-[#014421] text-[#FFD700] shadow-lg shadow-[#014421]/30" : "bg-[#014421]/90 text-[#FFD700]"}`}
              >
                <TrendingUp size={14} />
              </div>
            </motion.button>
          </div>
        )}

        <button
          onClick={() => setIsToolboxOpen(!isToolboxOpen)}
          className="pointer-events-auto w-14 h-14 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 rounded-full text-white shadow-xl flex items-center justify-center hover:scale-110 transition-all z-50 ring-4 ring-white/20"
        >
          <LayoutGrid
            size={24}
            className={`transition-transform duration-300 ${isToolboxOpen ? "rotate-45" : "rotate-0"}`}
          />
        </button>
      </div>
    </div>
  );
}
