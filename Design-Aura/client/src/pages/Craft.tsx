import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Droplet, Thermometer, Timer, Gauge } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import BlurText from "@/components/BlurText";
import espressoImg1 from "@assets/stock_images/espresso_extraction__3527e77f.jpg";
import espressoImg2 from "@assets/stock_images/espresso_extraction__b0ed6eed.jpg";
import espressoMachineImg from "@assets/stock_images/espresso_machine_por_6d4bd314.jpg";
import roastingImg from "@assets/stock_images/coffee_roasting_proc_0ed4137b.jpg";

const extractionPhases = [
  {
    phase: "Pre-infusion",
    time: "0-8 seconds",
    description: "Water gently saturates the coffee bed, allowing gases to escape and preparing for even extraction.",
    visual: "Slow, golden drops begin forming"
  },
  {
    phase: "Peak Extraction",
    time: "8-20 seconds",
    description: "The sweet spot. Oils, sugars, and aromatics flow in perfect harmony, creating the characteristic tiger stripes.",
    visual: "Rich, syrupy flow with crema development"
  },
  {
    phase: "Completion",
    time: "20-30 seconds",
    description: "The stream lightens as we approach the ideal volume. Timing is everything to avoid over-extraction.",
    visual: "Blonding begins, signaling completion"
  }
];

const craftMetrics = [
  { icon: Thermometer, label: "Temperature", value: "93°C", description: "Optimal extraction temperature" },
  { icon: Gauge, label: "Pressure", value: "9 bar", description: "Industry standard pressure" },
  { icon: Timer, label: "Time", value: "25-30s", description: "Perfect shot duration" },
  { icon: Droplet, label: "Yield", value: "36ml", description: "Double shot volume" }
];

export default function Craft() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white overflow-hidden">
      <LiquidBackground />
      
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
                className="flex items-center gap-3 text-white/80 hover:text-primary transition-colors cursor-pointer group"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium tracking-wide">Back to Home</span>
              </motion.div>
            </Magnetic>
          </Link>
          
          <span className="text-2xl font-serif font-bold tracking-tighter text-white">
            Roots<span className="text-primary">.</span>
          </span>
        </div>
      </motion.nav>

      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={espressoImg1} 
            alt="Espresso extraction" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </motion.div>

        <motion.div 
          style={{ y: textY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-primary text-sm tracking-[0.3em] uppercase mb-6 block"
          >
            The Science & Art
          </motion.span>
          
          <BlurText 
            text="The Extraction" 
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6"
            delay={0.1}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            A macro study of espresso mechanics, fluid dynamics, and the pursuit of the perfect shot.
          </motion.p>
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
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <span className="text-primary text-sm tracking-[0.2em] uppercase mb-4 block">The Variables</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Precision in Every <span className="text-primary">Parameter</span>
            </h2>
            <p className="text-white/70 text-xl leading-relaxed">
              Great espresso is a balance of science and intuition. Every variable—temperature, 
              pressure, grind size, time—must harmonize to create liquid gold.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {craftMetrics.map((metric, index) => (
              <MetricCard key={metric.label} metric={metric} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10 bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary text-sm tracking-[0.2em] uppercase mb-4 block">The Process</span>
            <h2 className="text-4xl md:text-6xl font-serif">
              Anatomy of <span className="text-primary">Extraction</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {extractionPhases.map((phase, index) => (
              <PhaseCard key={phase.phase} phase={phase} index={index} total={extractionPhases.length} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ParallaxGallery />
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-primary text-sm tracking-[0.2em] uppercase">The Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                Where Science <br />
                <span className="text-primary">Meets Art</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                The perfect espresso shot is fleeting—existing for mere seconds before the crema 
                begins to dissipate. We capture these moments through macro photography and 
                high-speed video, revealing the hidden beauty of fluid dynamics.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Each image tells a story of pressure, temperature, and timing. The tiger stripes 
                in the pour, the texture of the crema, the way light plays through the stream—
                these are the visual signatures of craft mastered.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-4xl font-serif text-primary block mb-2">1000+</span>
                  <span className="text-white/50 text-sm uppercase tracking-wider">Shots Documented</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="text-4xl font-serif text-primary block mb-2">4K</span>
                  <span className="text-white/50 text-sm uppercase tracking-wider">Macro Resolution</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Master Your <span className="text-primary">Craft</span>
            </h2>
            <p className="text-white/70 text-xl mb-12 leading-relaxed">
              Ready to elevate your espresso game? Explore our visual guides and 
              tutorials designed for both beginners and seasoned baristas.
            </p>
            <Link href="/">
              <Magnetic>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-primary text-black font-medium rounded-full hover:bg-primary/90 transition-colors"
                >
                  View More Projects
                </motion.button>
              </Magnetic>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function MetricCard({ metric, index }: { metric: typeof craftMetrics[0]; index: number }) {
  const Icon = metric.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center group cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <span className="text-3xl font-serif text-white block mb-1 group-hover:text-primary transition-colors">
        {metric.value}
      </span>
      <span className="text-primary text-sm uppercase tracking-wider block mb-2">
        {metric.label}
      </span>
      <p className="text-white/50 text-xs">
        {metric.description}
      </p>
    </motion.div>
  );
}

function PhaseCard({ phase, index, total }: { phase: typeof extractionPhases[0]; index: number; total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="flex items-start gap-8 py-12">
        <div className="hidden md:flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
          >
            <span className="text-primary font-serif text-xl">{index + 1}</span>
          </motion.div>
          {index < total - 1 && (
            <div className="w-0.5 h-32 bg-gradient-to-b from-primary/50 to-transparent mt-4" />
          )}
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <span className="md:hidden text-primary font-serif text-2xl">{index + 1}.</span>
            <h3 className="text-2xl md:text-3xl font-serif text-white">{phase.phase}</h3>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">{phase.time}</span>
          </div>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            {phase.description}
          </p>
          <p className="text-primary/80 italic text-sm">
            "{phase.visual}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ParallaxGallery() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative h-[600px]"
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-2/3 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
      >
        <img 
          src={espressoImg2} 
          alt="Espresso extraction detail"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 right-0 w-2/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
      >
        <img 
          src={espressoMachineImg} 
          alt="Espresso machine"
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
      />
    </motion.div>
  );
}
