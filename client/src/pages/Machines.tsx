import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Coffee, Gauge, Zap, Droplets, Thermometer, Clock, Scale, Wind } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import GradientText from "@/components/reactbits/GradientText";
import SplitText from "@/components/reactbits/SplitText";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import ClickSpark from "@/components/reactbits/ClickSpark";

// Import local machine images
import espressoImg from "@assets/stock_images/machines/esspressomachine.webp";
import pourOverImg from "@assets/stock_images/machines/pour_over.jpg";
import immersionImg from "@assets/stock_images/machines/Immersion_Brewers.jpg";
import grinderImg from "@assets/stock_images/machines/grinder.jpg";
import coldBrewImg from "@assets/stock_images/machines/cold_brew_system.jpg";
import stovetopImg from "@assets/stock_images/machines/stovetop.jpg";

// Steam Particle Component
function SteamParticles({ isActive }: { isActive: boolean }) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    x: Math.random() * 60 - 30,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-32 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {isActive && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full bg-white/20"
            initial={{ opacity: 0, y: 0, x: p.x, scale: 0.5 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              y: -120,
              x: p.x + Math.sin(p.id) * 20,
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{ 
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Micro-Interaction Icon Component
function MicroIcon({ icon: Icon, label, value, isHovered }: { icon: any; label: string; value: string; isHovered: boolean }) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10"
      whileHover={{ scale: 1.05, borderColor: "rgba(212, 165, 116, 0.3)" }}
      animate={{ 
        y: isHovered ? -5 : 0,
        boxShadow: isHovered ? "0 20px 40px rgba(212, 165, 116, 0.15)" : "0 0 0 rgba(0,0,0,0)"
      }}
    >
      <motion.div
        animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
      >
        <Icon className="w-6 h-6" />
      </motion.div>
      <motion.span 
        className="text-xl font-serif text-primary"
        animate={{ scale: isHovered ? 1.1 : 1 }}
      >
        {value}
      </motion.span>
      <span className="text-xs text-foreground/40 uppercase tracking-wider">{label}</span>
    </motion.div>
  );
}


// Morphing Card Component
function MorphingCard({ children, isActive, className = "" }: { children: React.ReactNode; isActive: boolean; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      layout
      layoutId="morphing-card"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      animate={{
        borderRadius: isActive ? 32 : 24,
        scale: isActive ? 1.02 : 1,
      }}
    >
      {children}
    </motion.div>
  );
}

// Aroma Wave Component
function AromaWaves() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
          initial={{ width: 100, height: 100, opacity: 0 }}
          animate={{
            width: [100, 400, 600],
            height: [100, 400, 600],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 1.3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

const machineCategories = [
  {
    id: "espresso-machines",
    title: "Espresso Machines",
    subtitle: "The Heart of Coffee Culture",
    description: "Espresso machines use pressure to force hot water through finely-ground coffee, creating a concentrated shot with rich crema. From pump-driven to lever-operated, these machines range from compact home units to multi-group commercial workhorses.",
    longDescription: "The espresso machine revolutionized coffee culture in the early 20th century. Modern machines maintain precise temperature stability through PID controllers, while pressure profiling allows baristas to manipulate extraction in real-time.",
    image: espressoImg,
    machines: ["Pump-Driven", "Lever Machines", "Semi-Automatic", "Super-Automatic"],
    specs: { pressure: "9", temp: "94", time: "28" },
    specLabels: { pressure: "Bar", temp: "°C", time: "Sec" },
    features: ["PID Temperature Control", "Pressure Profiling", "Pre-infusion", "Steam Wand"],
    color: "#D4A574"
  },
  {
    id: "pour-over",
    title: "Pour Over",
    subtitle: "Precision in Simplicity",
    description: "Pour over brewing offers complete control over every variable—water temperature, pour rate, and bloom time. This method highlights the delicate flavors and origin characteristics of single-origin beans.",
    longDescription: "The pour over method dates back to 1908 when Melitta Bentz invented the paper filter. Today, devices like the V60 and Chemex have elevated this simple technique into an art form prized by specialty coffee enthusiasts.",
    image: pourOverImg,
    machines: ["V60 Dripper", "Chemex", "Kalita Wave", "Origami Dripper"],
    specs: { ratio: "1:16", temp: "96", time: "3:30" },
    specLabels: { ratio: "Ratio", temp: "°C", time: "Min" },
    features: ["Paper Filtration", "Bloom Phase", "Spiral Pour", "Clean Cup Profile"],
    color: "#C67B48"
  },
  {
    id: "immersion",
    title: "Immersion Brewers",
    subtitle: "Full-Bodied Richness",
    description: "Immersion brewing steeps coffee grounds directly in water, extracting bold flavors and natural oils. The French Press remains iconic, while the AeroPress offers versatility and portability.",
    longDescription: "Immersion brewing is one of the oldest coffee preparation methods. The full contact between water and grounds produces a rich, full-bodied cup with more oils and sediment than filtered methods.",
    image: immersionImg,
    machines: ["French Press", "AeroPress", "Clever Dripper", "Siphon Brewer"],
    specs: { ratio: "1:14", temp: "93", time: "4:00" },
    specLabels: { ratio: "Ratio", temp: "°C", time: "Min" },
    features: ["Metal Mesh Filter", "Full Immersion", "Oil Retention", "Bold Flavor"],
    color: "#8B5A2B"
  },
  {
    id: "grinders",
    title: "Coffee Grinders",
    subtitle: "Where Quality Begins",
    description: "The grinder is arguably more important than the brewing device itself. Burr grinders provide consistent particle size essential for even extraction.",
    longDescription: "Grind consistency directly impacts extraction uniformity. Flat burrs excel at producing uniform particles for espresso, while conical burrs are prized for their bimodal distribution that adds complexity to filter coffee.",
    image: grinderImg,
    machines: ["Flat Burr", "Conical Burr", "Hand Grinders", "Commercial Mills"],
    specs: { steps: "40", rpm: "1400", retention: "<1" },
    specLabels: { steps: "Steps", rpm: "RPM", retention: "g Ret." },
    features: ["Stepless Adjustment", "Low Retention", "Cool Grinding", "Uniform Particles"],
    color: "#6B4423"
  },
  {
    id: "cold-brew",
    title: "Cold Brew Systems",
    subtitle: "Patience Rewarded",
    description: "Cold brew extracts coffee slowly using cold or room temperature water over 12-24 hours. The result is a smooth, naturally sweet concentrate with lower acidity.",
    longDescription: "Cold brewing produces coffee with up to 67% less acidity than hot brewing methods. The slow extraction process creates a concentrate that can be diluted and stored for up to two weeks.",
    image: coldBrewImg,
    machines: ["Toddy System", "Kyoto Drip Tower", "Filtron", "Immersion Pitchers"],
    specs: { ratio: "1:8", temp: "20", time: "18" },
    specLabels: { ratio: "Ratio", temp: "°C", time: "Hours" },
    features: ["Low Acidity", "Concentrate Form", "Long Shelf Life", "Smooth Profile"],
    color: "#4A6741"
  },
  {
    id: "stovetop",
    title: "Stovetop Brewers",
    subtitle: "Traditional Craftsmanship",
    description: "The Moka pot has been an Italian kitchen staple since 1933, producing strong, espresso-style coffee on any stovetop using steam pressure.",
    longDescription: "Alfonso Bialetti's iconic octagonal design has remained virtually unchanged for 90 years. The Moka pot uses steam pressure of about 1.5 bar—far less than espresso machines but enough to produce a strong, concentrated brew.",
    image: stovetopImg,
    machines: ["Moka Pot", "Percolator", "Turkish Ibrik", "Vietnamese Phin"],
    specs: { pressure: "1.5", temp: "100", time: "5" },
    specLabels: { pressure: "Bar", temp: "°C", time: "Min" },
    features: ["Steam Pressure", "No Electricity", "Classic Design", "Strong Brew"],
    color: "#A0522D"
  }
];


const brewingVariables = [
  { icon: Gauge, title: "Grind Size", value: "Fine to Coarse", desc: "Particle size controls extraction rate and flavor intensity. Finer grinds for espresso, coarser for French press." },
  { icon: Thermometer, title: "Temperature", value: "90-96°C", desc: "Water temperature affects extraction speed and which compounds dissolve. Too hot burns, too cold under-extracts." },
  { icon: Scale, title: "Brew Ratio", value: "1:2 to 1:17", desc: "Coffee-to-water ratio determines strength. Espresso uses 1:2, pour over typically 1:15-17." },
  { icon: Clock, title: "Contact Time", value: "25s - 24hrs", desc: "How long water contacts coffee. 25 seconds for espresso, 4 minutes for French press, 18+ hours for cold brew." },
  { icon: Droplets, title: "Water Quality", value: "150 TDS", desc: "Mineral content affects extraction. Ideal range is 75-250 ppm with balanced calcium and magnesium." },
  { icon: Wind, title: "Agitation", value: "Gentle Stir", desc: "Movement increases extraction. Pour over uses spiral pours, immersion uses gentle stirring." },
];

const equipmentHighlights = [
  { title: "Precision Scales", description: "0.1g accuracy for repeatable brewing. Timer integration for pour-over technique.", image: "https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=800&q=80" },
  { title: "Gooseneck Kettles", description: "Temperature-controlled with precision spout for controlled pour rate and bloom.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" },
  { title: "Tamping Tools", description: "Calibrated tampers and distribution tools for even espresso extraction.", image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&q=80" },
];

export default function Machines() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const categoryRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: categoryProgress } = useScroll({ target: categoryRef, offset: ["start end", "end start"] });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  const smoothProgress = useSpring(categoryProgress, { stiffness: 100, damping: 30 });

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

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LiquidBackground />
      
      {/* Floating Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3 bg-background/90 backdrop-blur-xl border-b border-white/5" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/#machines">
            <Magnetic>
              <motion.div 
                className="flex items-center gap-3 text-foreground/70 hover:text-primary transition-all cursor-pointer group"
                whileHover={{ x: -8 }}
              >
                <motion.div 
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all"
                  whileHover={{ rotate: -180 }}
                  transition={{ duration: 0.4 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-medium hidden sm:block">Back to Home</span>
              </motion.div>
            </Magnetic>
          </Link>
          
          <Link href="/">
            <motion.div 
              className="text-xl md:text-2xl font-serif font-bold tracking-tight cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-foreground">Roots of Roast</span>
              <motion.span 
                className="text-primary"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >.</motion.span>
            </motion.div>
          </Link>
        </div>
      </motion.nav>


      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen min-h-[800px] overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img src={espressoImg} alt="Espresso Machine" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </motion.div>

        <AromaWaves />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 h-full flex items-center pt-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl">
              <ScrollReveal direction="up" delay={0.2}>
                <motion.div
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
                  whileHover={{ scale: 1.05, borderColor: "rgba(212, 165, 116, 0.5)" }}
                >
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    <Coffee className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="text-primary text-sm tracking-[0.25em] uppercase font-medium">Equipment Mastery</span>
                </motion.div>
              </ScrollReveal>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-serif mb-8 leading-[0.9]">
                <SplitText text="The Art of" className="text-foreground/80" delay={0.3} />
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1 }}
                >
                  <GradientText text="Coffee Craft" className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-serif" />
                </motion.span>
              </h1>
              
              <ScrollReveal direction="up" delay={0.8}>
                <p className="text-foreground/60 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mb-10">
                  Explore the machines, tools, and techniques that transform humble beans into extraordinary experiences.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={1}>
                <div className="flex flex-wrap gap-4">
                  {["6 Methods", "40+ Tools", "100+ Years"].map((stat, i) => (
                    <motion.div
                      key={stat}
                      className="px-5 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
                      whileHover={{ scale: 1.05, borderColor: "rgba(212, 165, 116, 0.3)" }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      <span className="text-sm text-foreground/70">{stat}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
        >
          <motion.span 
            className="text-foreground/30 text-xs tracking-[0.3em] uppercase"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to Explore
          </motion.span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent"
          />
        </motion.div>
      </section>


      {/* Interactive Category Showcase */}
      <section ref={categoryRef} className="py-24 md:py-40 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-primary/60 text-sm tracking-[0.3em] uppercase mb-4 block">Brewing Arsenal</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
                Equipment <GradientText text="Categories" />
              </h2>
              <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
                Each brewing method requires specific tools designed to extract the perfect cup.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-start">
            {/* Image & Steam Effects */}
            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative sticky top-32">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory.id}
                    initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <MorphingCard isActive={true} className="overflow-hidden rounded-3xl shadow-2xl">
                      <div className="aspect-[4/3] relative">
                        <img src={activeCategory.image} alt={activeCategory.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Steam Effect for Espresso */}
                        {activeCategory.id === "espresso-machines" && <SteamParticles isActive={true} />}
                        
                        {/* Category Badge */}
                        <motion.div 
                          className="absolute top-6 left-6 px-4 py-2 rounded-full backdrop-blur-md border"
                          style={{ backgroundColor: `${activeCategory.color}20`, borderColor: `${activeCategory.color}40` }}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <span className="text-sm font-medium" style={{ color: activeCategory.color }}>
                            {String(activeIndex + 1).padStart(2, '0')} / {String(machineCategories.length).padStart(2, '0')}
                          </span>
                        </motion.div>
                      </div>
                    </MorphingCard>

                    {/* Floating Specs with Micro-Interactions */}
                    <motion.div 
                      className="mt-6 grid grid-cols-3 gap-4"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {Object.entries(activeCategory.specs).map(([key, value], i) => (
                        <MicroIcon
                          key={key}
                          icon={key === "pressure" ? Gauge : key === "temp" || key === "temperature" ? Thermometer : Clock}
                          label={activeCategory.specLabels[key as keyof typeof activeCategory.specLabels] || key}
                          value={value}
                          isHovered={hoveredSpec === key}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </ScrollReveal>

            {/* Content Side with Morphing Layout */}
            <div className="space-y-8">
              <ScrollReveal direction="right" delay={0.2}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory.id + "-content"}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.h3 
                      className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4"
                      layoutId="category-title"
                    >
                      {activeCategory.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-xl md:text-2xl mb-6 font-medium"
                      style={{ color: activeCategory.color }}
                    >
                      {activeCategory.subtitle}
                    </motion.p>
                    
                    <p className="text-foreground/60 text-lg leading-relaxed mb-6">
                      {activeCategory.description}
                    </p>
                    
                    <p className="text-foreground/40 text-base leading-relaxed mb-8">
                      {activeCategory.longDescription}
                    </p>

                    {/* Features Grid */}
                    <div className="mb-8">
                      <span className="text-foreground/40 text-xs uppercase tracking-wider mb-4 block">Key Features</span>
                      <div className="grid grid-cols-2 gap-3">
                        {activeCategory.features.map((feature, i) => (
                          <motion.div
                            key={feature}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            whileHover={{ scale: 1.02, borderColor: `${activeCategory.color}40` }}
                          >
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeCategory.color }} />
                            <span className="text-sm text-foreground/70">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Equipment Types */}
                    <div className="mb-10">
                      <span className="text-foreground/40 text-xs uppercase tracking-wider mb-4 block">Equipment Types</span>
                      <div className="flex flex-wrap gap-2">
                        {activeCategory.machines.map((machine, i) => (
                          <motion.span
                            key={machine}
                            className="px-4 py-2 rounded-full text-sm border transition-all cursor-default"
                            style={{ 
                              borderColor: `${activeCategory.color}30`,
                              backgroundColor: `${activeCategory.color}10`
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.05 }}
                            whileHover={{ 
                              scale: 1.05, 
                              backgroundColor: `${activeCategory.color}20`,
                              borderColor: activeCategory.color
                            }}
                          >
                            {machine}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </ScrollReveal>

              {/* Navigation */}
              <ScrollReveal direction="up" delay={0.4}>
                <div className="flex items-center justify-between pt-8 border-t border-white/10">
                  <div className="flex gap-3">
                    {machineCategories.map((_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-2 rounded-full transition-all ${i === activeIndex ? "w-10" : "w-2"}`}
                        style={{ backgroundColor: i === activeIndex ? activeCategory.color : "rgba(255,255,255,0.2)" }}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <ClickSpark sparkColor={activeCategory.color}>
                      <motion.button
                        onClick={prevCategory}
                        className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:border-primary transition-all"
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </motion.button>
                    </ClickSpark>
                    <ClickSpark sparkColor={activeCategory.color}>
                      <motion.button
                        onClick={nextCategory}
                        className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
                        style={{ backgroundColor: activeCategory.color }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight className="w-5 h-5 text-black" />
                      </motion.button>
                    </ClickSpark>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>


      {/* Brewing Variables Section */}
      <section className="py-24 md:py-32 relative z-10 bg-gradient-to-b from-transparent via-card/30 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up" className="text-center mb-16">
            <span className="text-primary/60 text-sm tracking-[0.3em] uppercase mb-4 block">The Science</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Brewing <GradientText text="Variables" />
            </h2>
            <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
              Master these six fundamental variables to unlock the full potential of any brewing method.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brewingVariables.map((variable, i) => (
              <ScrollReveal key={variable.title} direction="up" delay={i * 0.1} scale>
                <motion.div
                  className="group relative p-6 rounded-2xl bg-card/50 border border-white/10 backdrop-blur-sm h-full"
                  whileHover={{ y: -8, borderColor: "rgba(212, 165, 116, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-black transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  >
                    <variable.icon className="w-7 h-7" />
                  </motion.div>
                  
                  <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                    {variable.title}
                  </h3>
                  
                  <motion.p 
                    className="text-2xl font-serif text-primary mb-3"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1, scale: 1.02 }}
                  >
                    {variable.value}
                  </motion.p>
                  
                  <p className="text-foreground/50 text-sm leading-relaxed">
                    {variable.desc}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: "inset 0 0 40px rgba(212, 165, 116, 0.1)" }}
                  />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section with Parallax */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y: useTransform(smoothProgress, [0, 1], ["-20%", "20%"]) }}
        >
          <img 
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1920&q=80"
            alt="Coffee brewing"
            className="w-full h-[140%] object-cover opacity-15"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        
        <AromaWaves />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal direction="up" scale className="max-w-5xl mx-auto text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Coffee className="w-16 h-16 text-primary mx-auto mb-10" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-10 leading-tight">
              "The difference between good coffee and great coffee lies not in the beans alone, but in 
              <motion.span 
                className="text-primary"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              > understanding your equipment.</motion.span>"
            </h2>
            
            <p className="text-foreground/40 text-lg">— The Philosophy of Brewing</p>
          </ScrollReveal>
        </div>
      </section>


      {/* Essential Accessories */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up" className="mb-16">
            <span className="text-primary/60 text-sm tracking-[0.3em] uppercase mb-4 block">Complete Your Setup</span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Essential <GradientText text="Accessories" />
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipmentHighlights.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 0.15} scale>
                <motion.div 
                  className="group relative overflow-hidden rounded-3xl h-full"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="aspect-[3/4] relative">
                    <motion.img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    {/* Hover Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors"
                      initial={{ y: 0 }}
                      whileHover={{ y: -5 }}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-foreground/60 text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary rounded-tr-xl" />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up" scale>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-card to-primary/20" />
              <div className="absolute inset-0 backdrop-blur-sm" />
              
              <div className="relative p-12 md:p-20 text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Coffee className="w-12 h-12 text-primary mx-auto mb-8" />
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
                  Ready to Explore More?
                </h2>
                
                <p className="text-foreground/60 text-lg max-w-2xl mx-auto mb-10">
                  Discover the complete journey from bean to cup, including sourcing, roasting, and brewing techniques.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/process">
                    <ClickSpark sparkColor="#D4A574">
                      <motion.button
                        className="px-8 py-4 rounded-full bg-primary text-black font-medium flex items-center gap-3"
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 165, 116, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Explore the Process
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </ClickSpark>
                  </Link>
                  
                  <Link href="/">
                    <motion.button
                      className="px-8 py-4 rounded-full border border-white/20 font-medium flex items-center gap-3 hover:border-primary/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to Home
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
}