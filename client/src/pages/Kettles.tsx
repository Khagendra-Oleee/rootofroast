import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Flame, Thermometer, Droplets, Gauge, Zap, Award, ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import GradientText from "@/components/reactbits/GradientText";
import SplitText from "@/components/reactbits/SplitText";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import FloatingParticles from "@/components/reactbits/FloatingParticles";

export default function Kettles() {
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

  const kettleTypes = [
    {
      name: "Electric Gooseneck Kettles",
      description: "Variable temperature control with precision spout design. The gold standard for pour-over brewing, offering exact temperature settings and hold functions.",
      features: ["Variable temp (40-100°C)", "±1°C accuracy", "Hold function", "Fast heating"],
      capacity: "0.6-1.2L",
      idealFor: "Pour over, tea, precision brewing",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80"
    },
    {
      name: "Stovetop Gooseneck",
      description: "Classic design without electronics. Durable stainless steel construction that works on any heat source, favored by purists for its simplicity.",
      features: ["No power needed", "Durable build", "Universal compatibility", "Lightweight"],
      capacity: "0.7-1.5L",
      idealFor: "Traditional brewing, camping, minimalists",
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80"
    },
    {
      name: "Smart Connected Kettles",
      description: "App-controlled kettles with programmable presets and brewing guides. Schedule heating times and save custom temperature profiles.",
      features: ["App control", "Preset profiles", "Scheduling", "Brew guides"],
      capacity: "0.8-1.0L",
      idealFor: "Tech enthusiasts, recipe consistency",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
    }
  ];

  const temperatureGuide = [
    { coffee: "Light Roast", temp: "93-96°C", reason: "Higher temps extract delicate, complex flavors" },
    { coffee: "Medium Roast", temp: "90-93°C", reason: "Balanced extraction for sweetness and body" },
    { coffee: "Dark Roast", temp: "88-91°C", reason: "Lower temps prevent bitter over-extraction" },
    { coffee: "Cold Brew Concentrate", temp: "Room Temp", reason: "Time, not heat, drives extraction" }
  ];

  const gooseneckBenefits = [
    {
      icon: <Droplets className="w-6 h-6" />,
      title: "Precision Pour Control",
      description: "The narrow, curved spout allows exact control over water flow rate and placement, essential for even saturation."
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Consistent Flow Rate",
      description: "Maintain steady pour speed throughout the brew, preventing channeling and ensuring uniform extraction."
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: "Temperature Stability",
      description: "Quality kettles maintain set temperature within ±1°C, crucial for repeatable results."
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
                <span className="text-sm md:text-base font-medium tracking-wide">Back</span>
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
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80"
            alt="Gooseneck Kettle" 
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
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                  Temperature Control
                </span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-6 md:mb-8 leading-[0.95]">
                <SplitText text="Gooseneck" className="text-foreground" delay={0.4} />
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <GradientText text="Kettles" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif" />
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-foreground/60 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl"
              >
                The conductor's baton of coffee brewing. Precision temperature and pour control in one elegant tool.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Gooseneck Design */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
                Why <GradientText text="Gooseneck" /> Design?
              </h2>
              <p className="text-foreground/60 text-lg md:text-xl max-w-3xl mx-auto">
                The distinctive curved spout isn't just aesthetic—it's engineering for precision brewing.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {gooseneckBenefits.map((benefit, i) => (
              <ScrollReveal key={benefit.title} direction="up" delay={i * 0.15} scale>
                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-card/50 hover:border-primary/30 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-black transition-all">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Kettles */}
      <section className="py-20 md:py-32 relative z-10 bg-card/20">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="mb-12 md:mb-16">
              <span className="text-primary/60 text-xs md:text-sm tracking-[0.2em] uppercase mb-3 block">
                Equipment Types
              </span>
              <h2 className="text-4xl md:text-5xl font-serif">
                Types of <GradientText text="Kettles" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8 md:space-y-12">
            {kettleTypes.map((kettle, i) => (
              <ScrollReveal key={kettle.name} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                <div className="bg-card/50 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className={`aspect-[4/3] lg:aspect-auto ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <img 
                        src={kettle.image}
                        alt={kettle.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className={`p-6 md:p-10 flex flex-col justify-center ${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                      <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                        {kettle.name}
                      </h3>
                      <p className="text-foreground/60 text-base md:text-lg leading-relaxed mb-6">
                        {kettle.description}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
                          <Award className="w-4 h-4" />
                          <span>{kettle.idealFor}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-foreground/70 text-sm">
                          <Droplets className="w-4 h-4" />
                          <span>Capacity: {kettle.capacity}</span>
                        </div>
                      </div>
                      
                      <span className="text-foreground/40 text-xs uppercase tracking-wider mb-4 block">
                        Key Features
                      </span>
                      <ul className="space-y-3">
                        {kettle.features.map((feature, idx) => (
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

      {/* Temperature Guide */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Temperature <GradientText text="Guide" />
              </h2>
              <p className="text-foreground/50 text-base md:text-lg max-w-2xl mx-auto">
                Different roasts require different temperatures for optimal extraction.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-4">
            {temperatureGuide.map((guide, i) => (
              <ScrollReveal key={guide.coffee} direction="up" delay={i * 0.1}>
                <div className="bg-card/30 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-serif text-foreground mb-2">
                      {guide.coffee}
                    </h3>
                    <p className="text-foreground/60 text-sm md:text-base">
                      {guide.reason}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-lg md:text-xl whitespace-nowrap">
                    <Thermometer className="w-5 h-5" />
                    {guide.temp}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
            alt="Pour over coffee brewing"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" scale>
              <Zap className="w-12 h-12 md:w-14 md:h-14 text-primary mx-auto mb-8" />
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-8 leading-tight">
                "Temperature is the invisible ingredient. 
                <span className="text-primary"> Control it, and you control the cup.</span>"
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-foreground/50 text-base md:text-lg">
                — World Barista Championship
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Kettle Showcase */}
      <section className="py-20 md:py-32 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                The Art of <GradientText text="Pouring" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { 
                img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80", 
                title: "Pour Over Precision",
                desc: "Controlled flow rate for optimal extraction"
              },
              { 
                img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=1200&q=80", 
                title: "Temperature Control",
                desc: "Exact heat for perfect brewing"
              },
              { 
                img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80", 
                title: "Gooseneck Design",
                desc: "Ergonomic spout for steady pouring"
              },
              { 
                img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80", 
                title: "Modern Aesthetics",
                desc: "Form meets function in every detail"
              }
            ].map((item, i) => (
              <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.15}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl">
                  <img 
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-serif text-white mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pouring Techniques */}
      <section className="py-20 md:py-32 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Pouring <GradientText text="Techniques" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { num: "01", title: "The Bloom", desc: "Start with 2x coffee weight in water, pour gently in circular motion. Wait 30-45 seconds for CO2 release." },
                { num: "02", title: "Spiral Pour", desc: "Pour in concentric circles from center outward, maintaining consistent flow rate for even extraction." },
                { num: "03", title: "Pulse Pouring", desc: "Multiple small pours instead of continuous stream. Allows better control and prevents over-extraction." },
                { num: "04", title: "Center Pour", desc: "Keep water stream in the center for concentrated extraction. Used for specific flavor profiles." },
                { num: "05", title: "Agitation Control", desc: "Adjust pour height and speed to control turbulence. Higher = more agitation, lower = gentler." },
                { num: "06", title: "Final Drawdown", desc: "Let water fully drain before removing dripper. Aim for 3-4 minute total brew time." }
              ].map((technique, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                  <div className="group bg-card/30 border border-white/10 rounded-xl p-6 hover:bg-card/50 hover:border-primary/30 transition-all">
                    <div className="text-4xl font-serif text-primary/20 mb-3 group-hover:text-primary/40 transition-colors">
                      {technique.num}
                    </div>
                    <h3 className="text-lg md:text-xl font-serif text-foreground mb-2">
                      {technique.title}
                    </h3>
                    <p className="text-foreground/60 text-sm md:text-base">
                      {technique.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Buying Guide */}
      <section className="py-20 md:py-32 relative z-10 bg-card/20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Choosing Your <GradientText text="Kettle" />
              </h2>
              <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
                Find the perfect kettle for your brewing style and budget.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Entry Level",
                budget: "$40-80",
                features: ["Stovetop compatible", "Gooseneck spout", "Durable steel", "0.8-1.0L capacity"],
                recommendation: "Stovetop gooseneck for manual control",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
              },
              {
                title: "Enthusiast",
                budget: "$80-150",
                features: ["Variable temperature", "±1°C accuracy", "Hold function", "Fast heating"],
                recommendation: "Electric kettle with precise temp control",
                image: "https://images.unsplash.com/photo-1563822249366-6b5d2f6c83f6?w=600&q=80"
              },
              {
                title: "Professional",
                budget: "$150-250",
                features: ["App connectivity", "Custom profiles", "Premium build", "Advanced features"],
                recommendation: "Smart kettle with programmable settings",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"
              }
            ].map((guide, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.15} scale>
                <div className="group bg-card/50 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
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
                <Link href="/scales-timers">
                  <Magnetic>
                    <motion.div 
                      className="inline-flex items-center gap-3 text-2xl md:text-3xl font-serif text-foreground hover:text-primary transition-colors cursor-pointer group"
                      whileHover={{ x: 5 }}
                    >
                      <span>Scales & Timers</span>
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
