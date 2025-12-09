import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Coffee, Gauge, Zap, Droplets } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import GradientText from "@/components/reactbits/GradientText";
import FloatingParticles from "@/components/reactbits/FloatingParticles";
import ClickSpark from "@/components/reactbits/ClickSpark";

const machineCategories = [
  {
    id: "espresso-machines",
    title: "Espresso Machines",
    subtitle: "The Heart of Coffee Culture",
    description: "Espresso machines use pressure to force hot water through finely-ground coffee, creating a concentrated shot with rich crema. From pump-driven to lever-operated, these machines range from compact home units to multi-group commercial workhorses that power busy cafes.",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=1200&q=80",
    machines: ["Pump-Driven", "Lever Machines", "Semi-Automatic", "Super-Automatic"],
    specs: { pressure: "9 bar", temp: "90-96°C", extraction: "25-30 sec" }
  },
  {
    id: "pour-over",
    title: "Pour Over Equipment",
    subtitle: "Precision in Simplicity",
    description: "Pour over brewing offers complete control over every variable—water temperature, pour rate, and bloom time. This method highlights the delicate flavors and origin characteristics of single-origin beans, making it a favorite among specialty coffee enthusiasts.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80",
    machines: ["V60 Dripper", "Chemex", "Kalita Wave", "Origami Dripper"],
    specs: { ratio: "1:15-17", time: "3-4 min", grind: "Medium-Fine" }
  },
  {
    id: "french-press",
    title: "Immersion Brewers",
    subtitle: "Full-Bodied Richness",
    description: "Immersion brewing steeps coffee grounds directly in water, extracting bold flavors and natural oils. The French Press remains iconic, while newer designs like the AeroPress offer versatility and portability without sacrificing depth of flavor.",
    image: "https://images.unsplash.com/photo-1572119865084-43c285814d63?w=1200&q=80",
    machines: ["French Press", "AeroPress", "Clever Dripper", "Siphon Brewer"],
    specs: { ratio: "1:12-15", time: "4-5 min", grind: "Coarse" }
  },
  {
    id: "grinders",
    title: "Coffee Grinders",
    subtitle: "Where Quality Begins",
    description: "The grinder is arguably more important than the brewing device itself. Burr grinders provide consistent particle size essential for even extraction, while blade grinders offer affordability. From hand grinders to commercial flat burrs, the right grinder transforms your coffee.",
    image: "https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?w=1200&q=80",
    machines: ["Flat Burr", "Conical Burr", "Hand Grinders", "Commercial Mills"],
    specs: { burrs: "Steel/Ceramic", settings: "40+ steps", retention: "< 1g" }
  },
  {
    id: "cold-brew",
    title: "Cold Brew Systems",
    subtitle: "Patience Rewarded",
    description: "Cold brew extracts coffee slowly using cold or room temperature water over 12-24 hours. The result is a smooth, naturally sweet concentrate with lower acidity. From simple mason jar setups to commercial towers, cold brew equipment suits every scale.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1200&q=80",
    machines: ["Toddy System", "Kyoto Drip Tower", "Filtron", "Immersion Pitchers"],
    specs: { ratio: "1:8", time: "12-24 hrs", temp: "Cold/Room" }
  },
  {
    id: "moka-pot",
    title: "Stovetop Brewers",
    subtitle: "Traditional Craftsmanship",
    description: "The Moka pot has been an Italian kitchen staple since 1933, producing strong, espresso-style coffee on any stovetop. These aluminum or stainless steel brewers use steam pressure to push water through coffee, creating a rich and intense brew.",
    image: "https://images.unsplash.com/photo-1621555470436-d36e9683bdb1?w=1200&q=80",
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
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <FloatingParticles count={12} colors={["#D4A574", "#C67B48", "#8B5A2B"]} />
      
      {/* Navigation */}
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

      {/* Hero - Full Screen Image with Text Overlay */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div 
          style={{ scale: heroScale }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
            alt="Espresso Machine Detail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex items-center"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-primary text-sm tracking-[0.3em] uppercase mb-6 block font-medium"
              >
                Tools of the Trade
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl md:text-8xl font-serif mb-8 leading-[0.9]"
              >
                Coffee<br />
                <GradientText text="Equipment" className="text-6xl md:text-8xl font-serif" />
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-foreground/60 text-lg md:text-xl leading-relaxed max-w-lg"
              >
                Understanding the different types of coffee machines and brewing equipment 
                that shape how we experience coffee around the world.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-16 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* Category Showcase - Horizontal Scroll Feel */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-primary/60 text-sm tracking-[0.2em] uppercase mb-4 block">
              Brewing Methods
            </span>
            <h2 className="text-4xl md:text-6xl font-serif">
              Types of <GradientText text="Equipment" />
            </h2>
          </motion.div>

          {/* Category Navigator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Side */}
            <motion.div 
              key={activeCategory.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src={activeCategory.image}
                  alt={activeCategory.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Specs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 md:right-8 bg-card/95 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex gap-6">
                  {Object.entries(activeCategory.specs).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <span className="text-primary text-lg font-serif block">{value}</span>
                      <span className="text-foreground/40 text-xs uppercase tracking-wider">{key}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <div className="lg:col-span-5">
              <motion.div
                key={activeCategory.id + "-content"}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-primary/60 text-sm tracking-wider uppercase mb-2 block">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(machineCategories.length).padStart(2, '0')}
                </span>
                
                <h3 className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                  {activeCategory.title}
                </h3>
                
                <p className="text-primary/80 text-lg mb-6 font-medium">
                  {activeCategory.subtitle}
                </p>
                
                <p className="text-foreground/60 leading-relaxed mb-8">
                  {activeCategory.description}
                </p>

                {/* Equipment Types */}
                <div className="mb-10">
                  <span className="text-foreground/40 text-xs uppercase tracking-wider mb-3 block">
                    Common Types
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeCategory.machines.map((machine) => (
                      <span 
                        key={machine}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-foreground/70 text-sm"
                      >
                        {machine}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-4">
                  <ClickSpark sparkColor="#D4A574">
                    <motion.button
                      onClick={prevCategory}
                      className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft className="w-5 h-5 text-foreground/70" />
                    </motion.button>
                  </ClickSpark>
                  <ClickSpark sparkColor="#D4A574">
                    <motion.button
                      onClick={nextCategory}
                      className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight className="w-5 h-5 text-foreground/70" />
                    </motion.button>
                  </ClickSpark>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Category Dots */}
          <div className="flex justify-center gap-3 mt-16">
            {machineCategories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === activeIndex 
                    ? "w-12 bg-primary" 
                    : "w-6 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section - Full Width Image */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1920&q=80"
            alt="Coffee brewing"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Coffee className="w-12 h-12 text-primary mx-auto mb-8" />
              
              <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
                "Great coffee is not about the most expensive equipment. 
                <span className="text-primary"> It's about understanding your tools.</span>"
              </h2>
              
              <p className="text-foreground/50 text-lg">
                — The Craft of Brewing
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipment Highlights - Asymmetric Grid */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-primary/60 text-sm tracking-[0.2em] uppercase mb-4 block">
              Beyond the Machine
            </span>
            <h2 className="text-4xl md:text-5xl font-serif">
              Essential <GradientText text="Equipment" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {equipmentHighlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 ? "md:row-span-2" : ""
                }`}
              >
                <div className={`${i === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-foreground/60 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Breakdown */}
      <section className="py-32 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Key <GradientText text="Variables" />
            </h2>
            <p className="text-foreground/50 max-w-2xl mx-auto">
              Understanding the fundamental variables that affect every brewing method.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Gauge className="w-8 h-8" />, title: "Grind Size", desc: "From fine espresso to coarse French press, grind size determines extraction rate and flavor profile." },
              { icon: <Zap className="w-8 h-8" />, title: "Water Temperature", desc: "Optimal brewing temperature ranges from 90-96°C. Too hot burns, too cold under-extracts." },
              { icon: <Droplets className="w-8 h-8" />, title: "Brew Ratio", desc: "The coffee-to-water ratio varies by method—1:2 for espresso, 1:15 for pour over, 1:8 for cold brew." },
              { icon: <Coffee className="w-8 h-8" />, title: "Extraction Time", desc: "Each method has its sweet spot—25 seconds for espresso, 4 minutes for French press." },
            ].map((spec, i) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {spec.icon}
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">{spec.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{spec.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-foreground/40 text-sm uppercase tracking-wider mb-4">
              Continue Exploring
            </p>
            <Link href="/process">
              <Magnetic>
                <motion.span 
                  className="text-3xl md:text-4xl font-serif text-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-4"
                  whileHover={{ x: 10 }}
                >
                  Discover the Process
                  <ArrowRight className="w-8 h-8" />
                </motion.span>
              </Magnetic>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
