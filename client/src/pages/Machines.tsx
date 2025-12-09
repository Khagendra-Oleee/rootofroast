import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Coffee, Gauge, Zap, Droplets, Thermometer, Clock, Scale, Beaker, Wind, Flame, Settings, Award, Star, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import GradientText from "@/components/reactbits/GradientText";
import SplitText from "@/components/reactbits/SplitText";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import ClickSpark from "@/components/reactbits/ClickSpark";
import CountUp from "@/components/reactbits/CountUp";

// Import local machine images
import espressoImg from "@assets/stock_images/machines/esspressomachine.webp";
import pourOverImg from "@assets/stock_images/machines/pour_over.jpg";
import immersionImg from "@assets/stock_images/machines/Immersion_Brewers.jpg";
import grinderImg from "@assets/stock_images/machines/grinder.jpg";
import coldBrewImg from "@assets/stock_images/machines/cold_brew_system.jpg";
import stovetopImg from "@assets/stock_images/machines/stovetop.jpg";

// Micro-interaction Icon Component
function MicroIcon({ icon: Icon, label, value, color = "#D4A574" }: { icon: any; label: string; value: string; color?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <motion.div
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? [0, -5, 5, 0] : 0 
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: color }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isHovered ? 1.5 : 0, opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <Icon className="w-6 h-6 md:w-7 md:h-7 relative z-10" style={{ color }} />
      </motion.div>
      <motion.span 
        className="text-lg md:text-xl font-serif"
        style={{ color }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
      >
        {value}
      </motion.span>
      <span className="text-foreground/40 text-[10px] md:text-xs uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}


// Morphing Card Component
function MorphingCard({ children, isActive, onClick, className = "" }: { children: React.ReactNode; isActive: boolean; onClick: () => void; className?: string }) {
  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer ${className}`}
      layout
      layoutId="morphing-card"
      animate={{
        scale: isActive ? 1 : 0.95,
        opacity: isActive ? 1 : 0.6,
      }}
      whileHover={{ scale: isActive ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// Spatial Navigation Cursor
function SpatialCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 50 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed w-4 h-4 rounded-full bg-primary/30 pointer-events-none z-[100] mix-blend-difference hidden lg:block"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    />
  );
}

const machineCategories = [
  {
    id: "espresso-machines",
    title: "Espresso Machines",
    subtitle: "The Heart of Coffee Culture",
    description: "Espresso machines use pressure to force hot water through finely-ground coffee, creating a concentrated shot with rich crema. From pump-driven to lever-operated, these machines range from compact home units to multi-group commercial workhorses.",
    longDescription: "The espresso machine revolutionized coffee culture in the early 20th century. Modern machines maintain precise temperature stability through PID controllers, while pressure profiling allows baristas to manipulate extraction in real-time. Whether you choose a heat exchanger, dual boiler, or lever machine, understanding your equipment is key to pulling the perfect shot.",
    image: espressoImg,
    machines: ["Pump-Driven", "Lever Machines", "Semi-Automatic", "Super-Automatic"],
    specs: { pressure: "9", temp: "93", time: "28" },
    specLabels: { pressure: "Bar Pressure", temp: "°C Optimal", time: "Sec Extract" },
    features: ["PID Temperature Control", "Pressure Profiling", "Pre-infusion", "Steam Wand"],
    difficulty: 4,
    icon: Coffee
  },
  {
    id: "pour-over",
    title: "Pour Over",
    subtitle: "Precision in Simplicity",
    description: "Pour over brewing offers complete control over every variable—water temperature, pour rate, and bloom time. This method highlights the delicate flavors and origin characteristics of single-origin beans.",
    longDescription: "The pour over method dates back to 1908 when Melitta Bentz invented the paper filter. Today, devices like the V60, Chemex, and Kalita Wave each offer unique flow dynamics. The key is maintaining a consistent pour rate and water temperature while allowing proper bloom time for CO2 release.",
    image: pourOverImg,
    machines: ["V60 Dripper", "Chemex", "Kalita Wave", "Origami Dripper"],
    specs: { ratio: "16", temp: "96", time: "3.5" },
    specLabels: { ratio: ":1 Ratio", temp: "°C Water", time: "Min Brew" },
    features: ["Paper Filtration", "Bloom Phase", "Spiral Pour", "Clean Cup Profile"],
    difficulty: 3,
    icon: Droplets
  },
  {
    id: "immersion",
    title: "Immersion Brewers",
    subtitle: "Full-Bodied Richness",
    description: "Immersion brewing steeps coffee grounds directly in water, extracting bold flavors and natural oils. The French Press remains iconic, while the AeroPress offers versatility.",
    longDescription: "Immersion brewing is the oldest coffee preparation method, allowing full contact between water and grounds. The French Press, patented in 1929, produces a full-bodied cup with oils intact. The AeroPress, invented in 2005, combines immersion with pressure for a cleaner, more versatile brew.",
    image: immersionImg,
    machines: ["French Press", "AeroPress", "Clever Dripper", "Siphon Brewer"],
    specs: { ratio: "15", temp: "94", time: "4" },
    specLabels: { ratio: ":1 Ratio", temp: "°C Water", time: "Min Steep" },
    features: ["Full Immersion", "Metal/Cloth Filter", "Oil Retention", "Bold Flavor"],
    difficulty: 2,
    icon: Beaker
  },
  {
    id: "grinders",
    title: "Coffee Grinders",
    subtitle: "Where Quality Begins",
    description: "The grinder is arguably more important than the brewing device itself. Burr grinders provide consistent particle size essential for even extraction.",
    longDescription: "Grind consistency directly impacts extraction uniformity. Flat burrs produce a bimodal particle distribution ideal for espresso, while conical burrs create a unimodal distribution preferred for filter coffee. Hand grinders offer precision at lower cost, while commercial grinders prioritize speed and consistency.",
    image: grinderImg,
    machines: ["Flat Burr", "Conical Burr", "Hand Grinders", "Commercial Mills"],
    specs: { steps: "40", retention: "0.5", rpm: "1400" },
    specLabels: { steps: "+ Settings", retention: "g Retention", rpm: "RPM Speed" },
    features: ["Stepless Adjustment", "Low Retention", "Cool Grinding", "Uniform Particles"],
    difficulty: 2,
    icon: Settings
  },
  {
    id: "cold-brew",
    title: "Cold Brew Systems",
    subtitle: "Patience Rewarded",
    description: "Cold brew extracts coffee slowly using cold water over 12-24 hours. The result is a smooth, naturally sweet concentrate with lower acidity.",
    longDescription: "Cold brewing originated in Japan in the 1600s. The slow extraction process produces 67% less acid than hot brewing, resulting in a smoother, sweeter concentrate. Kyoto-style drip towers create a theatrical experience, while immersion methods offer simplicity and consistency.",
    image: coldBrewImg,
    machines: ["Toddy System", "Kyoto Drip Tower", "Filtron", "Immersion Pitchers"],
    specs: { ratio: "8", time: "18", temp: "4" },
    specLabels: { ratio: ":1 Ratio", time: "Hrs Brew", temp: "°C Cold" },
    features: ["Low Acidity", "Concentrate Base", "Long Shelf Life", "Smooth Profile"],
    difficulty: 1,
    icon: Wind
  },
  {
    id: "stovetop",
    title: "Stovetop Brewers",
    subtitle: "Traditional Craftsmanship",
    description: "The Moka pot has been an Italian kitchen staple since 1933, producing strong, espresso-style coffee on any stovetop.",
    longDescription: "Alfonso Bialetti's Moka pot democratized strong coffee for home brewing. Using steam pressure of 1-2 bar, it produces a concentrated brew distinct from true espresso. The Turkish ibrik creates an unfiltered, finely ground coffee with a rich history spanning centuries.",
    image: stovetopImg,
    machines: ["Moka Pot", "Percolator", "Turkish Ibrik", "Vietnamese Phin"],
    specs: { pressure: "1.5", time: "5", cups: "6" },
    specLabels: { pressure: "Bar Steam", time: "Min Brew", cups: "Cup Yield" },
    features: ["No Electricity", "Portable", "Traditional Method", "Strong Brew"],
    difficulty: 2,
    icon: Flame
  }
];


const brewingTips = [
  { icon: Thermometer, title: "Temperature", tip: "Water between 90-96°C extracts optimal flavors without burning." },
  { icon: Scale, title: "Precision", tip: "Use a scale for consistent ratios. Even 0.5g difference matters." },
  { icon: Clock, title: "Timing", tip: "Pre-infusion and bloom time release CO2 for even extraction." },
  { icon: Gauge, title: "Pressure", tip: "9 bar is standard for espresso, but profiling can enhance flavor." },
];

const equipmentHighlights = [
  { title: "Scales & Timers", description: "Precision measurement is the foundation of repeatable brewing.", image: "https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=800&q=80" },
  { title: "Gooseneck Kettles", description: "Temperature control and precision pour rate for pour-over perfection.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
  { title: "Tampers & Tools", description: "Distribution tools and calibrated tampers eliminate channeling.", image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&q=80" },
];

export default function Machines() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextCategory = () => setActiveIndex((prev) => (prev + 1) % machineCategories.length);
  const prevCategory = () => setActiveIndex((prev) => (prev - 1 + machineCategories.length) % machineCategories.length);

  const activeCategory = machineCategories[activeIndex];
  const ActiveIcon = activeCategory.icon;

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      <LiquidBackground />
      <SpatialCursor />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3 bg-background/90 backdrop-blur-xl border-b border-white/5" : "py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/#machines">
            <Magnetic>
              <motion.div className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-colors cursor-pointer group" whileHover={{ x: -5 }}>
                <motion.div 
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all"
                  whileHover={{ rotate: -180 }}
                  transition={{ duration: 0.4 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-medium hidden sm:block">Back</span>
              </motion.div>
            </Magnetic>
          </Link>
          
          <Link href="/">
            <motion.span className="text-xl md:text-2xl font-serif font-bold text-foreground hover:text-primary transition-colors" whileHover={{ scale: 1.02 }}>
              Roots of Roast<span className="text-primary">.</span>
            </motion.span>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen min-h-[750px] overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img src={espressoImg} alt="Espresso Machine" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex items-center pt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                  <Coffee className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="text-primary text-sm tracking-[0.2em] uppercase font-medium">Complete Equipment Guide</span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif mb-8 leading-[0.95]">
                <SplitText text="Master Your" className="text-foreground" delay={0.4} />
                <br />
                <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
                  <GradientText text="Equipment" className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif" />
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-foreground/60 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mb-10"
              >
                From precision espresso machines to artisanal hand grinders—your comprehensive guide to coffee equipment mastery.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex gap-8 md:gap-12"
              >
                {[
                  { value: 6, label: "Categories" },
                  { value: 24, label: "Equipment Types" },
                  { value: 100, label: "Years History", suffix: "+" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl md:text-4xl font-serif text-primary">
                      <CountUp to={stat.value} suffix={stat.suffix || ""} duration={2} />
                    </div>
                    <div className="text-xs text-foreground/40 uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-foreground/30 text-xs tracking-[0.3em] uppercase">Explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center">
            <ChevronDown className="w-5 h-5 text-primary" />
            <ChevronDown className="w-5 h-5 text-primary/50 -mt-3" />
          </motion.div>
        </motion.div>
      </section>


      {/* Category Showcase - Morphing Layout */}
      <section className="py-24 md:py-36 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
              <div>
                <span className="text-primary/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">Brewing Methods</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
                  Types of <GradientText text="Equipment" />
                </h2>
              </div>
              <p className="text-foreground/50 text-base md:text-lg max-w-md mt-4 md:mt-0">
                Select a category to explore detailed specifications and brewing techniques.
              </p>
            </div>
          </ScrollReveal>

          {/* Category Tabs - Fluid Navigation */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {machineCategories.map((cat, i) => {
                const CatIcon = cat.icon;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveIndex(i)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 ${
                      i === activeIndex 
                        ? "bg-primary text-black border-primary" 
                        : "bg-white/5 border-white/10 text-foreground/70 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    <CatIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{cat.title.split(" ")[0]}</span>
                  </motion.button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Main Content - Morphing Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
            >
              {/* Image Side */}
              <div className="relative">
                <motion.div 
                  className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                  layoutId={`image-${activeCategory.id}`}
                >
                  <motion.img 
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute -bottom-6 left-6 right-6 md:left-8 md:right-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <ActiveIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-foreground/40 text-xs uppercase tracking-wider">Difficulty</span>
                        <div className="flex gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <motion.div
                              key={level}
                              className={`w-2 h-2 rounded-full ${level <= activeCategory.difficulty ? "bg-primary" : "bg-white/20"}`}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.4 + level * 0.1 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Micro-interaction Specs */}
                    <div className="flex justify-between">
                      {Object.entries(activeCategory.specs).map(([key, value], idx) => (
                        <MicroIcon
                          key={key}
                          icon={idx === 0 ? Gauge : idx === 1 ? Thermometer : Clock}
                          label={activeCategory.specLabels[key as keyof typeof activeCategory.specLabels] || key}
                          value={value}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Content Side */}
              <div className="mt-16 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary font-mono text-sm">{String(activeIndex + 1).padStart(2, '0')}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-3">{activeCategory.title}</h3>
                  <p className="text-primary text-xl mb-6 font-medium">{activeCategory.subtitle}</p>
                  <p className="text-foreground/60 text-base md:text-lg leading-relaxed mb-6">{activeCategory.description}</p>
                  
                  {/* Expandable Long Description */}
                  <motion.div
                    className="overflow-hidden"
                    animate={{ height: expandedSection === activeCategory.id ? "auto" : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-foreground/50 text-sm md:text-base leading-relaxed mb-6 border-l-2 border-primary/30 pl-4">
                      {activeCategory.longDescription}
                    </p>
                  </motion.div>
                  
                  <button
                    onClick={() => setExpandedSection(expandedSection === activeCategory.id ? null : activeCategory.id)}
                    className="text-primary text-sm flex items-center gap-2 mb-8 hover:underline"
                  >
                    {expandedSection === activeCategory.id ? "Show less" : "Read more"}
                    <motion.div animate={{ rotate: expandedSection === activeCategory.id ? 180 : 0 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Features Grid */}
                  <div className="mb-8">
                    <span className="text-foreground/40 text-xs uppercase tracking-wider mb-4 block">Key Features</span>
                    <div className="grid grid-cols-2 gap-3">
                      {activeCategory.features.map((feature, idx) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex items-center gap-2 text-foreground/70 text-sm"
                        >
                          <Star className="w-3 h-3 text-primary" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Equipment Types */}
                  <div className="mb-10">
                    <span className="text-foreground/40 text-xs uppercase tracking-wider mb-4 block">Equipment Types</span>
                    <div className="flex flex-wrap gap-2">
                      {activeCategory.machines.map((machine, idx) => (
                        <motion.span
                          key={machine}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.08 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 165, 116, 0.1)" }}
                          className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-foreground/70 text-sm cursor-default"
                        >
                          {machine}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-4">
                    <ClickSpark sparkColor="#D4A574">
                      <motion.button
                        onClick={prevCategory}
                        className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-black transition-all"
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </motion.button>
                    </ClickSpark>
                    
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((activeIndex + 1) / machineCategories.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    
                    <ClickSpark sparkColor="#D4A574">
                      <motion.button
                        onClick={nextCategory}
                        className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-black transition-all"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </ClickSpark>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>


      {/* Brewing Tips Section */}
      <section className="py-20 md:py-32 relative z-10 bg-gradient-to-b from-transparent via-card/30 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up" className="text-center mb-16">
            <span className="text-primary/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">Pro Tips</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Brewing <GradientText text="Fundamentals" />
            </h2>
            <p className="text-foreground/50 max-w-2xl mx-auto">
              Master these core principles to elevate your coffee game regardless of equipment.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {brewingTips.map((tip, i) => (
              <ScrollReveal key={tip.title} direction="up" delay={i * 0.1}>
                <motion.div
                  className="group p-6 rounded-2xl bg-card/50 border border-white/5 hover:border-primary/20 transition-all h-full"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    <tip.icon className="w-7 h-7 text-primary group-hover:text-black transition-colors" />
                  </motion.div>
                  <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">{tip.title}</h3>
                  <p className="text-foreground/50 text-sm leading-relaxed">{tip.tip}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-28 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <motion.img 
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1920&q=80"
            alt="Coffee brewing"
            className="w-full h-full object-cover opacity-15"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" scale>
              <motion.div
                className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-10"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <Award className="w-10 h-10 text-primary" />
              </motion.div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-8 leading-tight">
                "The best coffee equipment is the one you 
                <span className="text-primary"> understand completely.</span>"
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-foreground/50 text-lg">— James Hoffmann, World Barista Champion</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Equipment Highlights */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <span className="text-primary/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 block">Essential Accessories</span>
                <h2 className="text-4xl md:text-5xl font-serif">
                  Beyond the <GradientText text="Machine" />
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {equipmentHighlights.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 0.15} scale>
                <motion.div 
                  className="group relative overflow-hidden rounded-3xl h-full cursor-pointer"
                  whileHover={{ y: -10 }}
                >
                  <div className="aspect-[4/5]">
                    <motion.img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "3rem" }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="h-0.5 bg-primary mb-4"
                    />
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key Variables */}
      <section className="py-20 md:py-32 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up" className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Key <GradientText text="Variables" />
            </h2>
            <p className="text-foreground/50 text-base md:text-lg max-w-2xl mx-auto">
              Understanding these fundamentals will transform your brewing across any method.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { icon: Gauge, title: "Grind Size", value: "Fine → Coarse", desc: "Determines extraction rate and flavor profile." },
              { icon: Thermometer, title: "Temperature", value: "90-96°C", desc: "Optimal range for balanced extraction." },
              { icon: Scale, title: "Brew Ratio", value: "1:15-17", desc: "Coffee to water ratio for filter methods." },
              { icon: Clock, title: "Contact Time", value: "2-4 min", desc: "Duration of water-coffee interaction." },
            ].map((spec, i) => (
              <ScrollReveal key={spec.title} direction="up" delay={i * 0.1} className="text-center group">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <spec.icon className="w-9 h-9" />
                </motion.div>
                <h3 className="text-xl font-serif text-foreground mb-2">{spec.title}</h3>
                <p className="text-primary text-lg font-medium mb-2">{spec.value}</p>
                <p className="text-foreground/50 text-sm">{spec.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollReveal direction="up" scale>
            <p className="text-foreground/40 text-sm uppercase tracking-[0.2em] mb-6">Continue Your Journey</p>
            <Link href="/process">
              <Magnetic>
                <motion.div 
                  className="inline-flex items-center gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-foreground hover:text-primary transition-colors cursor-pointer"
                  whileHover={{ x: 15 }}
                >
                  <span>Discover the Process</span>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
                  </motion.div>
                </motion.div>
              </Magnetic>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}