import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, Coffee, Zap, Gauge, Droplets, ThermometerSun, Scale, ChevronDown, Filter, Star } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import SplitText from "@/components/reactbits/SplitText";
import GradientText from "@/components/reactbits/GradientText";
import FloatingParticles from "@/components/reactbits/FloatingParticles";
import ShinyButton from "@/components/reactbits/ShinyButton";
import StaggeredGrid from "@/components/reactbits/StaggeredGrid";
import CountUp from "@/components/reactbits/CountUp";
import ClickSpark from "@/components/reactbits/ClickSpark";

import espressoMachineImg from "@assets/stock_images/espresso_machine_por_6d4bd314.jpg";
import espressoImg from "@assets/stock_images/espresso_extraction__3527e77f.jpg";
import espressoImg2 from "@assets/stock_images/espresso_extraction__b0ed6eed.jpg";

type MachineCategory = "all" | "professional" | "semi-pro" | "home" | "portable" | "accessories";

interface Machine {
  id: string;
  name: string;
  category: MachineCategory;
  tagline: string;
  description: string;
  image: string;
  specs: {
    pressure: string;
    boiler: string;
    power: string;
    weight: string;
  };
  features: string[];
  rating: number;
  priceRange: string;
}

const machines: Machine[] = [
  {
    id: "la-marzocco-linea",
    name: "La Marzocco Linea Mini",
    category: "semi-pro",
    tagline: "Cafe Quality at Home",
    description: "The iconic dual boiler machine that brings professional-grade espresso to your kitchen counter.",
    image: espressoMachineImg,
    specs: { pressure: "9 bar", boiler: "Dual", power: "2200W", weight: "29 kg" },
    features: ["Dual Boiler System", "PID Temperature Control", "Pre-infusion", "Stainless Steel Body"],
    rating: 5,
    priceRange: "$$$$$"
  },
  {
    id: "rocket-appartamento",
    name: "Rocket Appartamento",
    category: "semi-pro",
    tagline: "Italian Craftsmanship",
    description: "Heat exchanger machine with stunning design and exceptional shot quality for the discerning home barista.",
    image: espressoImg,
    specs: { pressure: "9 bar", boiler: "HX", power: "1200W", weight: "20 kg" },
    features: ["Heat Exchanger", "E61 Group Head", "Copper Boiler", "Commercial Portafilter"],
    rating: 5,
    priceRange: "$$$$"
  },
  {
    id: "breville-barista-pro",
    name: "Breville Barista Pro",
    category: "home",
    tagline: "Smart Espresso",
    description: "Integrated grinder and intuitive controls make this the perfect entry into specialty espresso.",
    image: espressoImg2,
    specs: { pressure: "9 bar", boiler: "ThermoJet", power: "1680W", weight: "6.6 kg" },
    features: ["Built-in Grinder", "Digital Display", "Auto Milk Texturing", "Fast Heat-up"],
    rating: 4,
    priceRange: "$$$"
  },
  {
    id: "gaggia-classic-pro",
    name: "Gaggia Classic Pro",
    category: "home",
    tagline: "The Classic Choice",
    description: "A legendary machine that has introduced countless enthusiasts to the world of real espresso.",
    image: espressoMachineImg,
    specs: { pressure: "9 bar", boiler: "Single", power: "1425W", weight: "8 kg" },
    features: ["Commercial Portafilter", "3-Way Solenoid", "Steam Wand", "Simple Operation"],
    rating: 4,
    priceRange: "$$"
  },
  {
    id: "flair-58",
    name: "Flair 58",
    category: "portable",
    tagline: "Manual Precision",
    description: "Lever-operated manual espresso maker that puts complete control in your hands.",
    image: espressoImg,
    specs: { pressure: "6-9 bar", boiler: "None", power: "0W", weight: "4.5 kg" },
    features: ["Manual Lever", "Pressure Gauge", "Preheated Group", "No Electricity Needed"],
    rating: 5,
    priceRange: "$$$"
  },
  {
    id: "wacaco-picopresso",
    name: "Wacaco Picopresso",
    category: "portable",
    tagline: "Espresso Anywhere",
    description: "Ultra-portable hand-powered espresso maker for the traveling coffee enthusiast.",
    image: espressoImg2,
    specs: { pressure: "18 bar", boiler: "None", power: "0W", weight: "0.35 kg" },
    features: ["Hand Powered", "Naked Portafilter", "Travel Case", "Professional Results"],
    rating: 4,
    priceRange: "$$"
  },
  {
    id: "slayer-single",
    name: "Slayer Single Group",
    category: "professional",
    tagline: "The Ultimate Machine",
    description: "Pre-brew pressure profiling technology that revolutionized specialty coffee extraction.",
    image: espressoMachineImg,
    specs: { pressure: "Variable", boiler: "Multi", power: "2400W", weight: "45 kg" },
    features: ["Pressure Profiling", "Volumetric Dosing", "Custom Wood Panels", "NSF Certified"],
    rating: 5,
    priceRange: "$$$$$$"
  },
  {
    id: "decent-de1pro",
    name: "Decent DE1PRO",
    category: "professional",
    tagline: "Data-Driven Espresso",
    description: "The most technologically advanced espresso machine with real-time shot analysis.",
    image: espressoImg,
    specs: { pressure: "0-12 bar", boiler: "Instant", power: "1500W", weight: "9 kg" },
    features: ["Bluetooth App", "Flow Profiling", "Real-time Graphs", "Recipe Sharing"],
    rating: 5,
    priceRange: "$$$$$"
  }
];

const accessories = [
  { name: "Precision Tamper", icon: <Scale className="w-6 h-6" />, description: "Calibrated 30lb pressure" },
  { name: "Distribution Tool", icon: <Filter className="w-6 h-6" />, description: "Even coffee distribution" },
  { name: "Precision Scale", icon: <Gauge className="w-6 h-6" />, description: "0.1g accuracy timing" },
  { name: "Milk Pitcher", icon: <Droplets className="w-6 h-6" />, description: "Latte art perfection" },
];

const categories: { value: MachineCategory; label: string }[] = [
  { value: "all", label: "All Machines" },
  { value: "professional", label: "Professional" },
  { value: "semi-pro", label: "Semi-Professional" },
  { value: "home", label: "Home" },
  { value: "portable", label: "Portable" },
];

export default function Machines() {
  const [activeCategory, setActiveCategory] = useState<MachineCategory>("all");
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredMachines = activeCategory === "all" 
    ? machines 
    : machines.filter(m => m.category === activeCategory);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      <LiquidBackground />
      <FloatingParticles count={15} colors={["#D4A574", "#C67B48", "#8B5A2B"]} />
      
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 p-6"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <Magnetic>
              <motion.div 
                className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors cursor-pointer group"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium tracking-wide">Back to Home</span>
              </motion.div>
            </Magnetic>
          </Link>
          
          <span className="text-2xl font-serif font-semibold tracking-tight text-foreground">
            Roots<span className="text-primary">.</span>
          </span>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={espressoMachineImg} 
            alt="Espresso Machine" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-primary/80 text-sm tracking-[0.3em] uppercase mb-6 block font-medium"
          >
            The Tools of the Trade
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6">
            <SplitText text="Coffee" className="text-foreground" />
            <br />
            <GradientText text="Machines" className="text-5xl md:text-7xl lg:text-8xl font-serif" />
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            From professional-grade espresso machines to portable brewing companions, 
            discover the equipment that transforms beans into liquid art.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <ClickSpark key={cat.value} sparkColor="#D4A574">
                <motion.button
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white/5 text-foreground/70 border-white/10 hover:bg-white/10 hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat.label}
                </motion.button>
              </ClickSpark>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-foreground/40 text-xs uppercase tracking-wider">Scroll to Explore</span>
            <ChevronDown className="w-5 h-5 text-primary/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative z-10 border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 8, label: "Machines Featured", suffix: "+" },
              { value: 15, label: "Bar Pressure Max", suffix: "" },
              { value: 100, label: "Years Combined Heritage", suffix: "+" },
              { value: 5, label: "Categories", suffix: "" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <span className="text-4xl md:text-5xl font-serif text-primary block mb-2">
                  <CountUp to={stat.value} />{stat.suffix}
                </span>
                <span className="text-foreground/40 text-sm uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Machines Grid */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary/60 text-sm tracking-[0.2em] uppercase mb-3 block">Our Selection</span>
            <h2 className="text-3xl md:text-5xl font-serif">
              <GradientText text={activeCategory === "all" ? "All Machines" : categories.find(c => c.value === activeCategory)?.label || ""} />
            </h2>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" stagger={0.1}>
                {filteredMachines.map((machine) => (
                  <MachineCard 
                    key={machine.id} 
                    machine={machine} 
                    onClick={() => setSelectedMachine(machine)}
                  />
                ))}
              </StaggeredGrid>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Accessories Section */}
      <section className="py-24 relative z-10 bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary/60 text-sm tracking-[0.2em] uppercase mb-3 block">Essential Gear</span>
            <h2 className="text-3xl md:text-5xl font-serif">
              Barista <GradientText text="Accessories" />
            </h2>
          </motion.div>

          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {accessories.map((accessory) => (
              <motion.div
                key={accessory.name}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group text-center"
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {accessory.icon}
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors">
                  {accessory.name}
                </h3>
                <p className="text-foreground/50 text-sm leading-relaxed">
                  {accessory.description}
                </p>
              </motion.div>
            ))}
          </StaggeredGrid>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">
              Ready to <GradientText text="Upgrade" />?
            </h2>
            <p className="text-foreground/60 text-xl mb-12 leading-relaxed">
              Whether you're starting your espresso journey or upgrading your setup, 
              we're here to help you find the perfect machine.
            </p>
            <Link href="/">
              <ClickSpark sparkColor="#D4A574">
                <Magnetic>
                  <ShinyButton>
                    <Coffee className="w-5 h-5" />
                    Explore Our Coffee
                  </ShinyButton>
                </Magnetic>
              </ClickSpark>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Machine Detail Modal */}
      <AnimatePresence>
        {selectedMachine && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setSelectedMachine(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-card rounded-3xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square">
                  <img 
                    src={selectedMachine.image} 
                    alt={selectedMachine.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-primary/60 text-sm tracking-[0.2em] uppercase mb-2">
                    {selectedMachine.category.replace("-", " ")}
                  </span>
                  <h3 className="text-3xl font-serif text-foreground mb-2">{selectedMachine.name}</h3>
                  <p className="text-foreground/60 mb-6">{selectedMachine.description}</p>
                  
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < selectedMachine.rating ? "text-primary fill-primary" : "text-foreground/20"}`} 
                      />
                    ))}
                    <span className="text-foreground/40 text-sm ml-2">{selectedMachine.priceRange}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <Gauge className="w-4 h-4 text-primary mb-1" />
                      <span className="text-foreground/40 text-xs block">Pressure</span>
                      <span className="text-foreground text-sm font-medium">{selectedMachine.specs.pressure}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <ThermometerSun className="w-4 h-4 text-primary mb-1" />
                      <span className="text-foreground/40 text-xs block">Boiler</span>
                      <span className="text-foreground text-sm font-medium">{selectedMachine.specs.boiler}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <Zap className="w-4 h-4 text-primary mb-1" />
                      <span className="text-foreground/40 text-xs block">Power</span>
                      <span className="text-foreground text-sm font-medium">{selectedMachine.specs.power}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <Scale className="w-4 h-4 text-primary mb-1" />
                      <span className="text-foreground/40 text-xs block">Weight</span>
                      <span className="text-foreground text-sm font-medium">{selectedMachine.specs.weight}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedMachine.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <motion.button
                onClick={() => setSelectedMachine(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-white text-xl">&times;</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MachineCard({ machine, onClick }: { machine: Machine; onClick: () => void }) {
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -8 }}
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 bg-white/5 border border-white/10 group-hover:border-primary/30 transition-all duration-300">
        <img 
          src={machine.image} 
          alt={machine.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-foreground/80 text-xs border border-white/20">
            {machine.category.replace("-", " ")}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < machine.rating ? "text-primary fill-primary" : "text-foreground/20"}`} 
              />
            ))}
          </div>
          <h3 className="text-lg font-serif text-foreground group-hover:text-primary transition-colors">
            {machine.name}
          </h3>
          <p className="text-foreground/50 text-sm">{machine.tagline}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-2">
        <span className="text-foreground/40 text-sm">{machine.priceRange}</span>
        <span className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          View Details →
        </span>
      </div>
    </motion.div>
  );
}
