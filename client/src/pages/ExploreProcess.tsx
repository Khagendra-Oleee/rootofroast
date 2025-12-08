import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Thermometer, Droplets, Coffee, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import SplitText from "@/components/reactbits/SplitText";
import GradientText from "@/components/reactbits/GradientText";
import FloatingParticles from "@/components/reactbits/FloatingParticles";
import ShinyButton from "@/components/reactbits/ShinyButton";
// ShinyButton still used in footer
import CountUp from "@/components/reactbits/CountUp";
import StaggeredGrid from "@/components/reactbits/StaggeredGrid";
import ClickSpark from "@/components/reactbits/ClickSpark";

import espressoImg from "@assets/stock_images/espresso_machine_por_6d4bd314.jpg";
import cappuccinoImg from "@assets/stock_images/cappuccino_foam_art__3d050b10.jpg";
import caffeLatteImg from "@assets/stock_images/caffe_latte_coffee_w_c6ee55c7.jpg";
import coldBrewImg from "@assets/stock_images/cold_brew_coffee_gla_6a71ee3b.jpg";
import doppioImg from "@assets/stock_images/doppio_double_espres_9edb1646.jpg";
import espressoVideo from "@assets/stock_images/esspresso.mp4";

const coffeeProcesses = [
  {
    id: "espresso",
    name: "Espresso",
    tagline: "The Foundation of Coffee Art",
    description: "A concentrated shot of pure coffee essence, extracted under precise pressure and temperature.",
    image: espressoImg,
    videoUrl: espressoVideo,
    isLocalVideo: true,
    duration: "25-30 sec",
    temperature: "92-96°C",
    waterRatio: "1:2",
    steps: [
      { step: 1, title: "Grind Fresh", description: "Grind 18-20g of freshly roasted beans to a fine, sand-like consistency", time: "15 sec" },
      { step: 2, title: "Distribute & Tamp", description: "Level the grounds evenly and apply 30lbs of pressure with a flat tamp", time: "10 sec" },
      { step: 3, title: "Pre-Infusion", description: "Low-pressure water saturates the puck, allowing CO2 to escape", time: "3-5 sec" },
      { step: 4, title: "Extraction", description: "9 bars of pressure force water through, extracting oils and flavors", time: "25-30 sec" },
      { step: 5, title: "The Pour", description: "Watch for honey-like flow with tiger striping, yielding 36-40g of liquid gold", time: "Complete" }
    ]
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    tagline: "Harmony of Espresso & Foam",
    description: "The perfect balance of bold espresso, steamed milk, and velvety microfoam.",
    image: cappuccinoImg,
    videoUrl: espressoVideo,
    isLocalVideo: true,
    duration: "2-3 min",
    temperature: "65-70°C",
    waterRatio: "1:1:1",
    steps: [
      { step: 1, title: "Pull the Shot", description: "Extract a double shot of espresso as the foundation", time: "30 sec" },
      { step: 2, title: "Steam the Milk", description: "Introduce air for 2-3 seconds, then submerge the wand to create microfoam", time: "30-45 sec" },
      { step: 3, title: "Rest & Swirl", description: "Let the milk rest for 10 seconds, then swirl to integrate foam and milk", time: "15 sec" },
      { step: 4, title: "The Pour", description: "Pour from height, then bring close to create latte art", time: "15-20 sec" },
      { step: 5, title: "Presentation", description: "Finish with a contrasting pattern - heart, rosetta, or tulip", time: "Complete" }
    ]
  },
  {
    id: "caffelatte",
    name: "Caffé Latte",
    tagline: "Smooth & Comforting",
    description: "A gentler espresso experience with more steamed milk and a thin layer of foam.",
    image: caffeLatteImg,
    videoUrl: espressoVideo,
    isLocalVideo: true,
    duration: "3-4 min",
    temperature: "60-65°C",
    waterRatio: "1:3",
    steps: [
      { step: 1, title: "Prepare Espresso", description: "Pull a single or double shot based on desired strength", time: "25-30 sec" },
      { step: 2, title: "Steam More Milk", description: "Steam 8-10oz of milk with less foam than cappuccino", time: "45-60 sec" },
      { step: 3, title: "Hold Back Foam", description: "Use spoon to hold foam while pouring steamed milk", time: "10 sec" },
      { step: 4, title: "Layer Gently", description: "Pour milk gently to create distinct layers", time: "15 sec" },
      { step: 5, title: "Top with Foam", description: "Add thin layer of microfoam and optional latte art", time: "Complete" }
    ]
  },
  {
    id: "coldbrew",
    name: "Cold Brew",
    tagline: "Patience Rewarded",
    description: "Slow-steeped for 12-24 hours, resulting in a smooth, naturally sweet concentrate.",
    image: coldBrewImg,
    videoUrl: espressoVideo,
    isLocalVideo: true,
    duration: "12-24 hours",
    temperature: "Room/Cold",
    waterRatio: "1:8",
    steps: [
      { step: 1, title: "Coarse Grind", description: "Grind beans very coarse, like sea salt or raw sugar", time: "30 sec" },
      { step: 2, title: "Combine with Water", description: "Mix 1 part coffee with 8 parts filtered cold water", time: "5 min" },
      { step: 3, title: "Steep Slowly", description: "Cover and refrigerate for 12-24 hours undisturbed", time: "12-24 hrs" },
      { step: 4, title: "Filter Twice", description: "Strain through cheesecloth, then paper filter for clarity", time: "15 min" },
      { step: 5, title: "Serve & Dilute", description: "Serve over ice, dilute concentrate 1:1 with water or milk", time: "Complete" }
    ]
  },
  {
    id: "doppio",
    name: "Doppio",
    tagline: "Double the Intensity",
    description: "Two shots of pure espresso power - for those who want the full experience.",
    image: doppioImg,
    videoUrl: espressoVideo,
    isLocalVideo: true,
    duration: "25-30 sec",
    temperature: "92-96°C",
    waterRatio: "1:2",
    steps: [
      { step: 1, title: "Double Dose", description: "Use 18-21g of finely ground coffee for the double basket", time: "15 sec" },
      { step: 2, title: "Perfect Distribution", description: "Ensure even distribution using WDT tool for consistency", time: "15 sec" },
      { step: 3, title: "Level Tamp", description: "Apply consistent 30lb pressure with perfectly level tamp", time: "5 sec" },
      { step: 4, title: "Pull the Double", description: "Extract 36-42g of espresso in 25-30 seconds", time: "25-30 sec" },
      { step: 5, title: "Observe the Crema", description: "Perfect crema should be golden-brown and 2-3mm thick", time: "Complete" }
    ]
  }
];

export default function ExploreProcess() {
  const [activeProcess, setActiveProcess] = useState(coffeeProcesses[0]);
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={activeProcess.image} 
            alt={activeProcess.name} 
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
            Mastering the Perfect Pour
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6">
            <SplitText text="Explore the" className="text-foreground" />
            <br />
            <GradientText text="Process" className="text-5xl md:text-7xl lg:text-8xl font-serif" />
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Every great cup tells a story of craft, patience, and precision. 
            Discover the art behind each of our signature beverages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {coffeeProcesses.map((process) => (
              <ClickSpark key={process.id} sparkColor="#D4A574">
                <motion.button
                  onClick={() => setActiveProcess(process)}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeProcess.id === process.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white/5 text-foreground/70 border-white/10 hover:bg-white/10 hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {process.name}
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

      <AnimatePresence mode="wait">
        <motion.section
          key={activeProcess.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="py-24 relative z-10"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <span className="text-primary/60 text-sm tracking-[0.2em] uppercase mb-3 block">
                    {activeProcess.tagline}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif mb-4">
                    <GradientText text={activeProcess.name} />
                  </h2>
                  <p className="text-foreground/60 text-lg leading-relaxed">
                    {activeProcess.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                    <Clock className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-foreground/40 text-xs uppercase tracking-wider block mb-1">Duration</span>
                    <span className="text-foreground font-medium">{activeProcess.duration}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                    <Thermometer className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-foreground/40 text-xs uppercase tracking-wider block mb-1">Temperature</span>
                    <span className="text-foreground font-medium">{activeProcess.temperature}</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300">
                    <Droplets className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-foreground/40 text-xs uppercase tracking-wider block mb-1">Ratio</span>
                    <span className="text-foreground font-medium">{activeProcess.waterRatio}</span>
                  </div>
                </div>

              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <video
                    ref={videoRef}
                    src={activeProcess.videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <span className="text-primary/60 text-sm tracking-[0.2em] uppercase mb-3 block">Step by Step</span>
                <h3 className="text-3xl md:text-4xl font-serif">
                  The <GradientText text="Journey" /> to Perfection
                </h3>
              </div>

              <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6" stagger={0.1}>
                {activeProcess.steps.map((step) => (
                  <ProcessStep key={step.step} step={step} />
                ))}
              </StaggeredGrid>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center pt-12 border-t border-white/10"
            >
              <h3 className="text-2xl md:text-3xl font-serif mb-6">
                Master All <CountUp to={5} className="text-primary" /> Techniques
              </h3>
              <p className="text-foreground/60 max-w-2xl mx-auto mb-8">
                From quick espresso shots to patience-testing cold brews, 
                each method offers a unique path to coffee excellence.
              </p>
              <Link href="/">
                <Magnetic>
                  <ShinyButton>
                    <Coffee className="w-5 h-5" />
                    Explore Our Menu
                  </ShinyButton>
                </Magnetic>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </AnimatePresence>

    </div>
  );
}

function ProcessStep({ step }: { step: { step: number; title: string; description: string; time: string } }) {
  return (
    <motion.div
      className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
      whileHover={{ y: -5 }}
    >
      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
        {step.step}
      </div>
      <div className="pt-2">
        <h4 className="text-lg font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
          {step.title}
        </h4>
        <p className="text-foreground/50 text-sm leading-relaxed mb-4">
          {step.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-primary/70">
          <Clock className="w-3 h-3" />
          <span>{step.time}</span>
        </div>
      </div>
    </motion.div>
  );
}
