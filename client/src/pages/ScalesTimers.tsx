import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Scale, Timer, Zap, Target, TrendingUp, Award, ArrowRight, Check } from "lucide-react";
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
      subtitle: "Laboratory-Grade Accuracy",
      description: "High-accuracy scales with 0.1g precision, essential for consistent brewing ratios and recipe development. These scales represent the intersection of scientific measurement and artisanal craft.",
      features: ["0.1g accuracy", "Built-in timer", "Auto-tare function", "Water-resistant", "Rechargeable battery"],
      specs: { accuracy: "±0.1g", capacity: "2000g", response: "< 0.5s" },
      idealFor: "Pour over, espresso dosing, recipe testing",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80"
    },
    {
      name: "Espresso Scales",
      subtitle: "Real-Time Extraction Monitoring",
      description: "Compact scales designed to fit under espresso portafilters, with fast response time for real-time extraction monitoring. Track every gram and second of your shot.",
      features: ["0.1g precision", "Fast refresh rate", "Heat-resistant pad", "Shot timer", "Flow rate display"],
      specs: { accuracy: "±0.1g", capacity: "3000g", response: "< 0.3s" },
      idealFor: "Espresso extraction, dose measurement",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&q=80"
    },
    {
      name: "Bluetooth Smart Scales",
      subtitle: "Connected Brewing Intelligence",
      description: "Connected scales that sync with brewing apps, automatically logging your recipes and extraction data. Build your personal coffee database with every brew.",
      features: ["App connectivity", "Recipe storage", "Guided brewing", "Cloud sync", "Multi-device pairing"],
      specs: { accuracy: "±0.1g", capacity: "2000g", battery: "30 days" },
      idealFor: "Data tracking, recipe refinement, consistency",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80"
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
          isScrolled ? "py-4 bg-background/95 backdrop-blur-xl border-b border-white/10" : "py-6"
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
                <span className="text-sm md:text-base font-medium tracking-wide hidden sm:block">Equipment</span>
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

      {/* Hero Section - Magazine Style */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=1920&q=80"
            alt="Coffee Scale and Timer" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary text-xs md:text-sm tracking-[0.3em] uppercase font-medium">
                  Precision Instruments
                </span>
              </motion.div>
              
              {/* Main Headline */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif mb-8 leading-[0.9] tracking-tight">
                <SplitText text="Scales" className="text-foreground" delay={0.3} />
                <br />
                <span className="text-foreground/30">&</span>
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <GradientText text="Timers" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic" />
                </motion.span>
              </h1>
              
              {/* Subheadline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="max-w-2xl"
              >
                <p className="text-foreground/70 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light mb-8">
                  Where precision meets passion. Transform brewing from guesswork into repeatable science.
                </p>
                
                {/* Stats Row */}
                <div className="flex flex-wrap gap-8 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-serif text-primary mb-1">±0.1g</div>
                    <div className="text-xs uppercase tracking-wider text-foreground/40">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-primary mb-1">&lt; 0.5s</div>
                    <div className="text-xs uppercase tracking-wider text-foreground/40">Response</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-primary mb-1">1:16</div>
                    <div className="text-xs uppercase tracking-wider text-foreground/40">Golden Ratio</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-foreground/30 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction Section - Editorial Style */}
      <section className="py-32 md:py-40 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column - Large Text */}
              <ScrollReveal direction="left" className="lg:col-span-5">
                <div className="sticky top-32">
                  <span className="text-primary/60 text-sm tracking-[0.2em] uppercase mb-6 block">
                    The Science
                  </span>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[0.95] mb-8">
                    Why Precision
                    <br />
                    <GradientText text="Matters" className="text-5xl md:text-6xl lg:text-7xl font-serif italic" />
                  </h2>
                  <div className="w-20 h-1 bg-primary/30" />
                </div>
              </ScrollReveal>

              {/* Right Column - Content */}
              <div className="lg:col-span-7 space-y-12">
                <ScrollReveal direction="right" delay={0.2}>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-foreground/70 text-lg md:text-xl leading-relaxed mb-6">
                      Coffee brewing is chemistry. Small variations in dose, ratio, and timing create dramatically different results. A difference of just 0.5g in your coffee dose can shift extraction by 2-3%, altering sweetness, acidity, and body.
                    </p>
                    <p className="text-foreground/60 text-base md:text-lg leading-relaxed">
                      Professional baristas know that consistency begins with measurement. Every world championship-winning recipe starts with precise numbers—not approximations, not eyeballing, but exact measurements repeated flawlessly.
                    </p>
                  </div>
                </ScrollReveal>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { stat: "±0.5g", label: "Accuracy Impact", desc: "Variance affects extraction" },
                    { stat: "1:16", label: "Golden Ratio", desc: "Foundation of consistency" },
                    { stat: "30sec", label: "Timing Precision", desc: "Optimal extraction window" }
                  ].map((item, i) => (
                    <ScrollReveal key={i} direction="up" delay={0.3 + i * 0.1}>
                      <div className="bg-card/40 border border-white/10 rounded-2xl p-6 hover:bg-card/60 hover:border-primary/30 transition-all duration-300">
                        <div className="text-4xl font-serif text-primary mb-2">{item.stat}</div>
                        <div className="text-sm font-medium text-foreground mb-1">{item.label}</div>
                        <div className="text-xs text-foreground/50">{item.desc}</div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Showcase - Premium Layout */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-20">
              <span className="text-primary/60 text-sm tracking-[0.2em] uppercase mb-4 block">
                Equipment Guide
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6">
                Professional
                <br />
                <GradientText text="Coffee Scales" className="text-5xl md:text-6xl lg:text-7xl font-serif" />
              </h2>
              <p className="text-foreground/60 text-lg md:text-xl">
                From entry-level precision to professional-grade instruments, find the scale that matches your brewing ambitions.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-24 md:space-y-32">
            {scaleTypes.map((scale, i) => (
              <ScrollReveal key={scale.name} direction="up" delay={i * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Image */}
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative group">
                      <div className="aspect-[16/10] rounded-3xl overflow-hidden">
                        <img 
                          src={scale.image}
                          alt={scale.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      {/* Floating Specs Card */}
                      <div className="absolute -bottom-6 -right-6 bg-background/95 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                        <div className="flex gap-6">
                          {Object.entries(scale.specs).map(([key, value]) => (
                            <div key={key}>
                              <div className="text-primary text-lg font-serif mb-1">{value}</div>
                              <div className="text-foreground/40 text-xs uppercase tracking-wider">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="space-y-6">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs uppercase tracking-wider mb-4">
                          {scale.subtitle}
                        </span>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4 leading-tight">
                          {scale.name}
                        </h3>
                        <p className="text-foreground/60 text-base md:text-lg leading-relaxed mb-6">
                          {scale.description}
                        </p>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3">
                        {scale.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-foreground/70">
                            <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-sm md:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Ideal For Badge */}
                      <div className="pt-6 border-t border-white/10">
                        <div className="text-xs uppercase tracking-wider text-foreground/40 mb-2">Ideal For</div>
                        <div className="text-foreground/80 text-sm">{scale.idealFor}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features - Grid Layout */}
      <section className="py-20 md:py-32 relative z-10 bg-gradient-to-b from-transparent via-card/20 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
                Advanced <GradientText text="Features" />
              </h2>
              <p className="text-foreground/60 text-lg">
                Modern scales go beyond simple timing, offering sophisticated features for precision brewing.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Timer className="w-7 h-7" />,
                title: "Integrated Timers",
                description: "Built-in timers start automatically when weight changes, eliminating the need for separate timing devices. Track bloom, pour phases, and total brew time seamlessly."
              },
              {
                icon: <Target className="w-7 h-7" />,
                title: "Flow Rate Tracking",
                description: "Advanced scales display real-time flow rate in g/s, helping you maintain consistent pour speed. Visualize your pour technique and identify inconsistencies instantly."
              },
              {
                icon: <TrendingUp className="w-7 h-7" />,
                title: "Extraction Graphs",
                description: "Visual graphs show your extraction curve, making it easy to identify channeling or uneven flow. Build a library of perfect extractions to reference and replicate."
              }
            ].map((feature, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.15} scale>
                <div className="group bg-card/40 border border-white/10 rounded-3xl p-8 hover:bg-card/60 hover:border-primary/30 transition-all duration-500 h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-4">
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

      {/* Visual Gallery - Masonry Style */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">
                Precision in <GradientText text="Practice" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", span: "md:col-span-2 md:row-span-2" },
              { img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80", span: "" },
              { img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80", span: "" },
              { img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", span: "" },
              { img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80", span: "" },
              { img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80", span: "md:col-span-2" }
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.05} scale className={item.span}>
                <div className="group relative aspect-square overflow-hidden rounded-2xl">
                  <img 
                    src={item.img}
                    alt={`Precision brewing ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section - Minimal */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal direction="up">
            <div className="max-w-5xl mx-auto text-center">
              <div className="w-16 h-1 bg-primary mx-auto mb-12" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-12 leading-tight">
                "You can't improve what you don't measure.
                <br />
                <span className="text-primary italic">Precision is the path to perfection.</span>"
              </h2>
              <p className="text-foreground/40 text-sm uppercase tracking-[0.3em]">
                Coffee Science Institute
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Best Practices - Modern Cards */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
                Best <GradientText text="Practices" />
              </h2>
              <p className="text-foreground/60 text-lg">
                Professional techniques for maintaining accuracy and extending the life of your equipment.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { num: "01", title: "Calibrate Regularly", desc: "Check accuracy monthly using calibration weights to ensure consistent measurements." },
              { num: "02", title: "Tare Between Steps", desc: "Reset to zero before each measurement phase for accurate cumulative readings." },
              { num: "03", title: "Stable Surface", desc: "Place scales on a level, vibration-free surface away from heat sources." },
              { num: "04", title: "Clean After Use", desc: "Wipe down after each session to prevent coffee oils from affecting sensors." },
              { num: "05", title: "Track Your Recipes", desc: "Log dose, yield, and time for each brew to build a reference library." },
              { num: "06", title: "Mind the Environment", desc: "Temperature and humidity can affect readings—allow scales to acclimate." }
            ].map((practice, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.08}>
                <div className="group bg-card/30 border border-white/10 rounded-2xl p-6 hover:bg-card/50 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="text-5xl font-serif text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">
                    {practice.num}
                  </div>
                  <h3 className="text-xl font-serif text-foreground mb-3">
                    {practice.title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {practice.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Guide */}
      <section className="py-20 md:py-32 relative z-10 bg-card/20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Choosing Your <GradientText text="Scale" />
              </h2>
              <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
                Consider these factors when selecting the right scale for your brewing needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Home Brewing",
                budget: "$30-80",
                features: ["0.1g accuracy", "Built-in timer", "Water-resistant", "Compact size"],
                recommendation: "Digital precision scale with timer function"
              },
              {
                title: "Espresso Focus",
                budget: "$80-150",
                features: ["Fast refresh rate", "Heat-resistant", "Compact footprint", "Shot timer"],
                recommendation: "Dedicated espresso scale with quick response"
              },
              {
                title: "Professional Use",
                budget: "$150-300",
                features: ["Bluetooth connectivity", "App integration", "Multiple profiles", "Commercial durability"],
                recommendation: "Smart scale with data tracking capabilities"
              }
            ].map((guide, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.15} scale>
                <div className="bg-card/50 border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all h-full flex flex-col">
                  <h3 className="text-2xl font-serif text-foreground mb-3">
                    {guide.title}
                  </h3>
                  <div className="text-primary text-3xl font-serif mb-6">
                    {guide.budget}
                  </div>
                  <ul className="space-y-3 mb-6 flex-grow">
                    {guide.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-foreground/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-foreground/40 text-xs uppercase tracking-wider mb-2">Recommended</p>
                    <p className="text-foreground text-sm">{guide.recommendation}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center">
              <p className="text-foreground/40 text-sm uppercase tracking-[0.3em] mb-6">
                Continue Exploring
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/kettles">
                  <Magnetic>
                    <motion.div 
                      className="inline-flex items-center gap-3 text-2xl md:text-3xl font-serif text-foreground hover:text-primary transition-colors cursor-pointer group"
                      whileHover={{ x: 5 }}
                    >
                      <span>Kettles</span>
                      <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
                    </motion.div>
                  </Magnetic>
                </Link>
                <span className="text-foreground/20 hidden sm:block">•</span>
                <Link href="/tampers-tools">
                  <Magnetic>
                    <motion.div 
                      className="inline-flex items-center gap-3 text-2xl md:text-3xl font-serif text-foreground hover:text-primary transition-colors cursor-pointer group"
                      whileHover={{ x: 5 }}
                    >
                      <span>Tampers & Tools</span>
                      <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
                    </motion.div>
                  </Magnetic>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
