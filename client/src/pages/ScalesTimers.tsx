import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Scale, Timer, Zap, Target, TrendingUp, Award } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import GradientText from "@/components/reactbits/GradientText";
import SplitText from "@/components/reactbits/SplitText";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import FloatingParticles from "@/components/reactbits/FloatingParticles";

export default function ScalesTimers() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const scaleTypes = [
    {
      name: "Digital Precision Scales",
      description: "High-accuracy scales with 0.1g precision, essential for consistent brewing ratios and recipe development.",
      features: ["0.1g accuracy", "Built-in timer", "Auto-tare function", "Water-resistant"],
      idealFor: "Pour over, espresso dosing, recipe testing"
    },
    {
      name: "Espresso Scales",
      description: "Compact scales designed to fit under espresso portafilters, with fast response time for real-time extraction monitoring.",
      features: ["0.1g precision", "Fast refresh rate", "Heat-resistant pad", "Shot timer"],
      idealFor: "Espresso extraction, dose measurement"
    },
    {
      name: "Bluetooth Smart Scales",
      description: "Connected scales that sync with brewing apps, automatically logging your recipes and extraction data.",
      features: ["App connectivity", "Recipe storage", "Guided brewing", "Cloud sync"],
      idealFor: "Data tracking, recipe refinement, consistency"
    }
  ];

  const timerFeatures = [
    {
      icon: <Timer className="w-6 h-6" />,
      title: "Integrated Timers",
      description: "Built-in timers start automatically when weight changes, eliminating the need for separate timing devices."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Flow Rate Tracking",
      description: "Advanced scales display real-time flow rate in g/s, helping you maintain consistent pour speed."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Extraction Graphs",
      description: "Visual graphs show your extraction curve, making it easy to identify channeling or uneven flow."
    }
  ];

  const whyItMatters = [
    {
      stat: "±0.5g",
      label: "Accuracy Impact",
      description: "Even 0.5g variance in coffee dose can significantly alter extraction and flavor balance."
    },
    {
      stat: "1:16",
      label: "Golden Ratio",
      description: "Precise measurement enables consistent brew ratios, the foundation of repeatable results."
    },
    {
      stat: "30sec",
      label: "Timing Precision",
      description: "Accurate timing ensures optimal extraction, preventing under or over-extraction."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LiquidBackground />
      <FloatingParticles count={6} />
      
      {/* Custom Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-4 bg-background/80 backdrop-blur-md border-b border-white/5" : "py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/machines">
            <Magnetic>
              <motion.div 
                className="flex items-center gap-2 md:gap-3 text-foreground/70 hover:text-primary transition-colors cursor-pointer group"
                whileHover={{ x: -5 }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                  <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span className="text-sm md:text-base font-medium tracking-wide hidden sm:block">Back to Equipment</span>
              </motion.div>
            </Magnetic>
          </Link>
          
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
            src="https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=1920&q=80"
            alt="Coffee Scale and Timer" 
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
                <Scale className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                  Precision Tools
                </span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-6 md:mb-8 leading-[0.95]">
                <SplitText text="Scales &" className="text-foreground" delay={0.4} />
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <GradientText text="Timers" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif" />
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-foreground/60 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl"
              >
                The foundation of consistency. Precision measurement transforms coffee brewing from guesswork into science.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Precision Matters */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
                Why <GradientText text="Precision" /> Matters
              </h2>
              <p className="text-foreground/60 text-lg md:text-xl max-w-3xl mx-auto">
                Coffee brewing is chemistry. Small variations in dose, ratio, and timing create dramatically different results.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {whyItMatters.map((item, i) => (
              <ScrollReveal key={item.label} direction="up" delay={i * 0.15} scale>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-serif text-primary mb-4">
                    {item.stat}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3">
                    {item.label}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Scales */}
      <section className="py-20 md:py-32 relative z-10 bg-card/20">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="mb-12 md:mb-16">
              <span className="text-primary/60 text-xs md:text-sm tracking-[0.2em] uppercase mb-3 block">
                Equipment Types
              </span>
              <h2 className="text-4xl md:text-5xl font-serif">
                Types of <GradientText text="Coffee Scales" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8 md:space-y-12">
            {scaleTypes.map((scale, i) => (
              <ScrollReveal key={scale.name} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                <div className="bg-card/50 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 hover:border-primary/30 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                        {scale.name}
                      </h3>
                      <p className="text-foreground/60 text-base md:text-lg leading-relaxed mb-6">
                        {scale.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
                        <Award className="w-4 h-4" />
                        <span>Ideal for: {scale.idealFor}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-foreground/40 text-xs uppercase tracking-wider mb-4 block">
                        Key Features
                      </span>
                      <ul className="space-y-3">
                        {scale.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-foreground/70">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timer Features */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Advanced <GradientText text="Timer Features" />
              </h2>
              <p className="text-foreground/50 text-base md:text-lg max-w-2xl mx-auto">
                Modern scales go beyond simple timing, offering sophisticated features for precision brewing.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {timerFeatures.map((feature, i) => (
              <ScrollReveal key={feature.title} direction="up" delay={i * 0.15} scale>
                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-card/50 hover:border-primary/30 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-black transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" scale>
              <Zap className="w-12 h-12 md:w-14 md:h-14 text-primary mx-auto mb-8" />
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-8 leading-tight">
                "You can't improve what you don't measure. 
                <span className="text-primary"> Precision is the path to perfection.</span>"
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-foreground/50 text-base md:text-lg">
                — Coffee Science Institute
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20 md:py-32 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Best <GradientText text="Practices" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Calibrate Regularly", desc: "Check accuracy monthly using calibration weights to ensure consistent measurements." },
                { title: "Tare Between Steps", desc: "Reset to zero before each measurement phase for accurate cumulative readings." },
                { title: "Stable Surface", desc: "Place scales on a level, vibration-free surface away from heat sources." },
                { title: "Clean After Use", desc: "Wipe down after each session to prevent coffee oils from affecting sensors." },
                { title: "Track Your Recipes", desc: "Log dose, yield, and time for each brew to build a reference library." },
                { title: "Mind the Environment", desc: "Temperature and humidity can affect readings—allow scales to acclimate." }
              ].map((practice, i) => (
                <ScrollReveal key={practice.title} direction="up" delay={i * 0.1}>
                  <div className="bg-card/30 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all">
                    <h3 className="text-lg md:text-xl font-serif text-foreground mb-2">
                      {practice.title}
                    </h3>
                    <p className="text-foreground/60 text-sm md:text-base">
                      {practice.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
