import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Coffee, Gauge, Zap, Droplets } from "lucide-react";
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

const machineCategories = [
  {
    id: "espresso-machines",
    title: "Espresso Machines",
    subtitle: "The Heart of Coffee Culture",
    description: "Espresso machines use pressure to force hot water through finely-ground coffee, creating a concentrated shot with rich crema. From pump-driven to lever-operated, these machines range from compact home units to multi-group commercial workhorses that power busy cafes.",
    image: espressoImg,
    machines: ["Pump-Driven", "Lever Machines", "Semi-Automatic", "Super-Automatic"],
    specs: { pressure: "9 bar", temp: "90-96°C", extraction: "25-30 sec" }
  },
  {
    id: "pour-over",
    title: "Pour Over Equipment",
    subtitle: "Precision in Simplicity",
    description: "Pour over brewing offers complete control over every variable—water temperature, pour rate, and bloom time. This method highlights the delicate flavors and origin characteristics of single-origin beans, making it a favorite among specialty coffee enthusiasts.",
    image: pourOverImg,
    machines: ["V60 Dripper", "Chemex", "Kalita Wave", "Origami Dripper"],
    specs: { ratio: "1:15-17", time: "3-4 min", grind: "Medium-Fine" }
  },
  {
    id: "french-press",
    title: "Immersion Brewers",
    subtitle: "Full-Bodied Richness",
    description: "Immersion brewing steeps coffee grounds directly in water, extracting bold flavors and natural oils. The French Press remains iconic, while newer designs like the AeroPress offer versatility and portability without sacrificing depth of flavor.",
    image: immersionImg,
    machines: ["French Press", "AeroPress", "Clever Dripper", "Siphon Brewer"],
    specs: { ratio: "1:12-15", time: "4-5 min", grind: "Coarse" }
  },
  {
    id: "grinders",
    title: "Coffee Grinders",
    subtitle: "Where Quality Begins",
    description: "The grinder is arguably more important than the brewing device itself. Burr grinders provide consistent particle size essential for even extraction, while blade grinders offer affordability. From hand grinders to commercial flat burrs, the right grinder transforms your coffee.",
    image: grinderImg,
    machines: ["Flat Burr", "Conical Burr", "Hand Grinders", "Commercial Mills"],
    specs: { burrs: "Steel/Ceramic", settings: "40+ steps", retention: "< 1g" }
  },
  {
    id: "cold-brew",
    title: "Cold Brew Systems",
    subtitle: "Patience Rewarded",
    description: "Cold brew extracts coffee slowly using cold or room temperature water over 12-24 hours. The result is a smooth, naturally sweet concentrate with lower acidity. From simple mason jar setups to commercial towers, cold brew equipment suits every scale.",
    image: coldBrewImg,
    machines: ["Toddy System", "Kyoto Drip Tower", "Filtron", "Immersion Pitchers"],
    specs: { ratio: "1:8", time: "12-24 hrs", temp: "Cold/Room" }
  },
  {
    id: "moka-pot",
    title: "Stovetop Brewers",
    subtitle: "Traditional Craftsmanship",
    description: "The Moka pot has been an Italian kitchen staple since 1933, producing strong, espresso-style coffee on any stovetop. These aluminum or stainless steel brewers use steam pressure to push water through coffee, creating a rich and intense brew.",
    image: stovetopImg,
    machines: ["Moka Pot", "Percolator", "Turkish Ibrik", "Vietnamese Phin"],
    specs: { pressure: "1-2 bar", time: "5-7 min", heat: "Stovetop" }
  }
];

const equipmentHighlights = [
  {
    title: "Scales & Timers",
    description: "Precision measurement is the foundation of repeatable brewing. Digital scales with built-in timers help dial in the perfect ratio every time.",
    image: "https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=800&q=80"
  },
  {
    title: "Kettles",
    description: "Gooseneck kettles with temperature control provide the precision pour rate essential for pour-over methods and consistent extraction.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
  },
  {
    title: "Tampers & Tools",
    description: "Distribution tools, calibrated tampers, and WDT needles ensure even extraction and eliminate channeling in espresso preparation.",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&q=80"
  }
];

export default function Machines() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextCategory = () => {
    setActiveIndex((prev) => (prev + 1) % machineCategories.length);
  };

  const prevCategory = () => {
    setActiveIndex((prev) => (prev - 1 + machineCategories.length) % machineCategories.length);
  };

  const activeCategory = machineCategories[activeIndex];

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      <LiquidBackground />
      
      {/* Custom Navigation - Back & Brand */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-white/5" : "py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Back Navigation */}
          <Link href="/#machines">
            <Magnetic>
              <motion.div 
                className="flex items-center gap-2 md:gap-3 text-foreground/70 hover:text-primary transition-colors cursor-pointer group"
                whileHover={{ x: -5 }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span className="text-sm md:text-base font-medium tracking-wide hidden sm:block">Back</span>
              </motion.div>
            </Magnetic>
          </Link>
          
          {/* Brand Name */}
          <Link href="/">
            <motion.span 
              className="text-xl md:text-2xl font-serif font-bold tracking-tight text-foreground cursor-pointer hover:text-primary transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              Roots of Roast<span className="text-primary">.</span>
            </motion.span>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img 
            src={espressoImg}
            alt="Espresso Machine Detail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex items-center pt-20"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 md:mb-8"
              >
                <Coffee className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                  Equipment Guide
                </span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-6 md:mb-8 leading-[0.95]">
                <SplitText text="Coffee" className="text-foreground" delay={0.4} />
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <GradientText text="Equipment" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif" />
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-foreground/60 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl"
              >
                A comprehensive guide to the machines and tools that shape how we experience coffee.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        >
          <span className="text-foreground/40 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* Category Showcase */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <ScrollReveal direction="up" duration={0.8}>
            <div className="mb-12 md:mb-20">
              <span className="text-primary/60 text-xs md:text-sm tracking-[0.2em] uppercase mb-3 block">
                Brewing Methods
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
                Types of <GradientText text="Equipment" />
              </h2>
            </div>
          </ScrollReveal>

          {/* Category Navigator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Image Side */}
            <ScrollReveal direction="left" delay={0.1} className="lg:col-span-7 relative">
              <motion.div 
                key={activeCategory.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={activeCategory.image}
                    alt={activeCategory.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Specs Card */}
                <ScrollReveal direction="up" delay={0.3}>
                  <div className="relative md:absolute mt-4 md:mt-0 md:-bottom-8 md:right-6 lg:right-10 bg-card/95 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl">
                    <div className="flex justify-around md:justify-start gap-6 md:gap-8">
                      {Object.entries(activeCategory.specs).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <span className="text-primary text-lg md:text-xl font-serif block">{value}</span>
                          <span className="text-foreground/40 text-[10px] md:text-xs uppercase tracking-wider">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </motion.div>
            </ScrollReveal>

            {/* Content Side */}
            <div className="lg:col-span-5 mt-12 lg:mt-0">
              <ScrollReveal direction="right" delay={0.2}>
                <motion.div
                  key={activeCategory.id + "-content"}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-primary/60 text-sm tracking-wider uppercase mb-3 block font-mono">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(machineCategories.length).padStart(2, '0')}
                  </span>
                  
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-3">
                    {activeCategory.title}
                  </h3>
                  
                  <p className="text-primary text-lg md:text-xl mb-5 font-medium">
                    {activeCategory.subtitle}
                  </p>
                  
                  <p className="text-foreground/60 text-base md:text-lg leading-relaxed mb-8">
                    {activeCategory.description}
                  </p>

                  {/* Equipment Types */}
                  <div className="mb-10">
                    <span className="text-foreground/40 text-xs uppercase tracking-wider mb-3 block">
                      Common Types
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeCategory.machines.map((machine, idx) => (
                        <ScrollReveal key={machine} direction="up" delay={0.3 + idx * 0.05}>
                          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-foreground/70 text-sm hover:border-primary/30 hover:bg-primary/5 transition-colors">
                            {machine}
                          </span>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <ScrollReveal direction="up" delay={0.5}>
                    <div className="flex gap-4">
                      <ClickSpark sparkColor="#D4A574">
                        <motion.button
                          onClick={prevCategory}
                          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-black transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </motion.button>
                      </ClickSpark>
                      <ClickSpark sparkColor="#D4A574">
                        <motion.button
                          onClick={nextCategory}
                          className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-black transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </ClickSpark>
                    </div>
                  </ScrollReveal>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>

          {/* Category Dots */}
          <ScrollReveal direction="up" delay={0.6}>
            <div className="flex justify-center gap-3 mt-16 md:mt-20">
              {machineCategories.map((cat, i) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex 
                      ? "w-10 md:w-14 bg-primary" 
                      : "w-5 md:w-7 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1920&q=80"
            alt="Coffee brewing"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" scale>
              <Coffee className="w-12 h-12 md:w-14 md:h-14 text-primary mx-auto mb-8" />
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-8 leading-tight">
                "Great coffee is not about the most expensive equipment. 
                <span className="text-primary"> It's about understanding your tools.</span>"
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-foreground/50 text-base md:text-lg">
                — The Craft of Brewing
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Equipment Highlights */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="mb-12 md:mb-16">
              <span className="text-primary/60 text-xs md:text-sm tracking-[0.2em] uppercase mb-3 block">
                Beyond the Machine
              </span>
              <h2 className="text-4xl md:text-5xl font-serif">
                Essential <GradientText text="Accessories" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {equipmentHighlights.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delay={i * 0.15} scale>
                <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl h-full">
                  <div className="aspect-[4/5]">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key Variables */}
      <section className="py-20 md:py-32 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up" className="text-center mb-14 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Key <GradientText text="Variables" />
            </h2>
            <p className="text-foreground/50 text-base md:text-lg max-w-2xl mx-auto">
              Understanding the fundamental variables that affect every brewing method.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {[
              { icon: <Gauge className="w-7 h-7 md:w-8 md:h-8" />, title: "Grind Size", desc: "From fine espresso to coarse French press, grind size determines extraction rate and flavor profile." },
              { icon: <Zap className="w-7 h-7 md:w-8 md:h-8" />, title: "Water Temperature", desc: "Optimal brewing temperature ranges from 90-96°C. Too hot burns, too cold under-extracts." },
              { icon: <Droplets className="w-7 h-7 md:w-8 md:h-8" />, title: "Brew Ratio", desc: "The coffee-to-water ratio varies by method—1:2 for espresso, 1:15 for pour over, 1:8 for cold brew." },
              { icon: <Coffee className="w-7 h-7 md:w-8 md:h-8" />, title: "Extraction Time", desc: "Each method has its sweet spot—25 seconds for espresso, 4 minutes for French press." },
            ].map((spec, i) => (
              <ScrollReveal key={spec.title} direction="up" delay={i * 0.1} className="text-center group">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                  {spec.icon}
                </div>
                <h3 className="text-lg md:text-xl font-serif text-foreground mb-3">{spec.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed hidden sm:block">{spec.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <ScrollReveal direction="up" scale>
            <p className="text-foreground/40 text-sm uppercase tracking-wider mb-4">
              Continue Exploring
            </p>
            <Link href="/process">
              <Magnetic>
                <motion.span 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-4"
                  whileHover={{ x: 10 }}
                >
                  Discover the Process
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                </motion.span>
              </Magnetic>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
