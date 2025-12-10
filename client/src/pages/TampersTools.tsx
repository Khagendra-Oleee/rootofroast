import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Wrench, Target, Layers, Zap, Award, CircleDot } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import GradientText from "@/components/reactbits/GradientText";
import SplitText from "@/components/reactbits/SplitText";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import FloatingParticles from "@/components/reactbits/FloatingParticles";

export default function TampersTools() {
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

  const tamperTypes = [
    {
      name: "Calibrated Tampers",
      description: "Spring-loaded tampers that click at a preset pressure (typically 30lbs/15kg). Ensures consistent tamping force across every shot, eliminating a major variable.",
      features: ["Preset pressure", "Audible click", "Consistent results", "Beginner-friendly"],
      weight: "15-30 lbs",
      idealFor: "Consistency, training, home baristas",
      image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&q=80"
    },
    {
      name: "Flat Base Tampers",
      description: "Traditional design with perfectly flat base. The standard for espresso preparation, requiring skill to apply even pressure across the entire puck.",
      features: ["Even distribution", "Professional standard", "Various materials", "Ergonomic handles"],
      weight: "User controlled",
      idealFor: "Experienced baristas, traditional workflow",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"
    },
    {
      name: "Convex/Ripple Tampers",
      description: "Slightly curved or rippled base creates micro-channels for water flow. Some baristas believe this reduces channeling and improves extraction uniformity.",
      features: ["Unique geometry", "Channel prevention", "Experimental design", "Specialty profiles"],
      weight: "User controlled",
      idealFor: "Experimentation, specific baskets",
      image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80"
    }
  ];

  const essentialTools = [
    {
      icon: <Layers className="w-6 h-6" />,
      name: "Distribution Tools",
      description: "Spinning tools that evenly distribute grounds before tamping. Eliminates clumps and creates a level bed for consistent extraction.",
      types: ["OCD distributors", "Levelers", "Spinning tools"]
    },
    {
      icon: <CircleDot className="w-6 h-6" />,
      name: "WDT Needles",
      description: "Weiss Distribution Technique tools with fine needles that break up clumps at the microscopic level. Essential for preventing channeling.",
      types: ["3D printed", "Acupuncture needles", "Commercial WDT tools"]
    },
    {
      icon: <Target className="w-6 h-6" />,
      name: "Puck Screens",
      description: "Precision mesh screens placed on top of the puck. Improves water distribution, reduces channeling, and keeps the group head cleaner.",
      types: ["Stainless steel mesh", "IMS screens", "Normcore screens"]
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      name: "Portafilter Funnels",
      description: "Dosing funnels that attach to portafilters, preventing grounds from spilling during dosing and WDT. Keeps workflow clean and efficient.",
      types: ["Magnetic", "Friction fit", "Universal adapters"]
    }
  ];

  const tampingTechnique = [
    { step: "1", title: "Level the Grounds", desc: "Use distribution tool or tap sides to create an even bed. No mounds or valleys." },
    { step: "2", title: "Position Tamper", desc: "Hold tamper level, perpendicular to basket. Wrist straight, elbow at 90°." },
    { step: "3", title: "Apply Pressure", desc: "Press straight down with 30lbs force. Feel for resistance, don't over-compress." },
    { step: "4", title: "Polish", desc: "Slight twist while maintaining pressure to smooth the surface and seal edges." },
    { step: "5", title: "Inspect", desc: "Check for level surface with no cracks. Wipe portafilter rim clean." }
  ];

  const commonMistakes = [
    {
      mistake: "Uneven Tamping",
      problem: "Creates channels where water flows faster, causing under-extraction in some areas and over-extraction in others.",
      solution: "Keep tamper level. Practice with a scale underneath to feel 30lbs pressure."
    },
    {
      mistake: "Too Much Pressure",
      problem: "Over-compressing the puck restricts flow too much, leading to slow extraction and bitter flavors.",
      solution: "Use calibrated tamper or practice with 30lbs as the target. More isn't better."
    },
    {
      mistake: "Skipping Distribution",
      problem: "Clumps in the puck create uneven density, causing channeling no matter how perfect your tamp.",
      solution: "Always use WDT or distribution tool before tamping. This step is non-negotiable."
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
            src="https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=1920&q=80"
            alt="Espresso Tamper and Tools" 
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
                <Wrench className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
                  Espresso Essentials
                </span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-6 md:mb-8 leading-[0.95]">
                <SplitText text="Tampers &" className="text-foreground" delay={0.4} />
                <br />
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <GradientText text="Tools" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif" />
                </motion.span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-foreground/60 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl"
              >
                The finishing touches that transform good espresso into exceptional shots. Precision tools for the final mile.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Why Tamping Matters */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
                Why <GradientText text="Tamping" /> Matters
              </h2>
              <p className="text-foreground/60 text-lg md:text-xl max-w-3xl mx-auto">
                Tamping creates a uniform puck density that forces water to flow evenly through all the coffee. Without proper tamping, water finds the path of least resistance, causing channeling and uneven extraction.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { stat: "30 lbs", label: "Ideal Pressure", desc: "The sweet spot for most baskets and grind sizes" },
              { stat: "±2°", label: "Level Tolerance", desc: "Maximum tilt before channeling becomes likely" },
              { stat: "9 bar", label: "Brew Pressure", desc: "Machine pressure that reveals any tamping flaws" }
            ].map((item, i) => (
              <ScrollReveal key={item.label} direction="up" delay={i * 0.15} scale>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-serif text-primary mb-4">
                    {item.stat}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3">
                    {item.label}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Tampers */}
      <section className="py-20 md:py-32 relative z-10 bg-card/20">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="mb-12 md:mb-16">
              <span className="text-primary/60 text-xs md:text-sm tracking-[0.2em] uppercase mb-3 block">
                Tamper Types
              </span>
              <h2 className="text-4xl md:text-5xl font-serif">
                Choosing Your <GradientText text="Tamper" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8 md:space-y-12">
            {tamperTypes.map((tamper, i) => (
              <ScrollReveal key={tamper.name} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                <div className="bg-card/50 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className={`aspect-[4/3] lg:aspect-auto ${i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <img 
                        src={tamper.image}
                        alt={tamper.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className={`p-6 md:p-10 flex flex-col justify-center ${i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                      <h3 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                        {tamper.name}
                      </h3>
                      <p className="text-foreground/60 text-base md:text-lg leading-relaxed mb-6">
                        {tamper.description}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
                          <Award className="w-4 h-4" />
                          <span>{tamper.idealFor}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-foreground/70 text-sm">
                          <Target className="w-4 h-4" />
                          <span>Pressure: {tamper.weight}</span>
                        </div>
                      </div>
                      
                      <span className="text-foreground/40 text-xs uppercase tracking-wider mb-4 block">
                        Key Features
                      </span>
                      <ul className="space-y-3">
                        {tamper.features.map((feature, idx) => (
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

      {/* Essential Tools */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Essential <GradientText text="Prep Tools" />
              </h2>
              <p className="text-foreground/50 text-base md:text-lg max-w-2xl mx-auto">
                Modern espresso preparation goes beyond tamping. These tools eliminate variables and improve consistency.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {essentialTools.map((tool, i) => (
              <ScrollReveal key={tool.name} direction="up" delay={i * 0.15} scale>
                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-card/50 hover:border-primary/30 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-black transition-all">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3">
                    {tool.name}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tool.types.map((type, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/60 text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tamping Technique */}
      <section className="py-20 md:py-32 relative z-10 bg-card/20">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Proper <GradientText text="Technique" />
              </h2>
              <p className="text-foreground/50 text-base md:text-lg max-w-2xl mx-auto">
                Follow these steps for consistent, level tamping every time.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-4">
            {tampingTechnique.map((step, i) => (
              <ScrollReveal key={step.step} direction="left" delay={i * 0.1}>
                <div className="bg-card/50 border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary font-serif text-xl">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-serif text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-foreground/60 text-sm md:text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Showcase */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Professional <GradientText text="Workflow" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                img: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&q=80", 
                title: "Tamping Station",
                desc: "Professional setup for consistent results"
              },
              { 
                img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80", 
                title: "Espresso Extraction",
                desc: "Perfect puck preparation in action"
              },
              { 
                img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80", 
                title: "Barista Tools",
                desc: "Essential equipment for every shot"
              },
              { 
                img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80", 
                title: "Distribution Technique",
                desc: "Even grounds for uniform extraction"
              },
              { 
                img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80", 
                title: "Precision Dosing",
                desc: "Accurate measurement every time"
              },
              { 
                img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", 
                title: "Final Preparation",
                desc: "Ready for the perfect extraction"
              }
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1} scale>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img 
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-serif text-white mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs md:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Common <GradientText text="Mistakes" />
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto space-y-6">
            {commonMistakes.map((item, i) => (
              <ScrollReveal key={item.mistake} direction="up" delay={i * 0.1}>
                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-foreground/40 mb-2 block">Mistake</span>
                      <h3 className="text-lg md:text-xl font-serif text-foreground">
                        {item.mistake}
                      </h3>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-foreground/40 mb-2 block">Problem</span>
                      <p className="text-foreground/60 text-sm md:text-base">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-primary/60 mb-2 block">Solution</span>
                      <p className="text-foreground/70 text-sm md:text-base">
                        {item.solution}
                      </p>
                    </div>
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
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&q=80"
            alt="Espresso preparation"
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
                "The puck is your canvas. 
                <span className="text-primary"> Every tool is a brushstroke toward perfection.</span>"
              </h2>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-foreground/50 text-base md:text-lg">
                — Espresso Mastery
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Buying Guide */}
      <section className="py-20 md:py-32 relative z-10 bg-card/20 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Building Your <GradientText text="Toolkit" />
              </h2>
              <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
                Essential tools for every level of espresso preparation.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Starter Kit",
                budget: "$50-100",
                features: ["Quality tamper", "Basic distribution tool", "Cleaning brush", "Portafilter funnel"],
                recommendation: "Flat base tamper + simple distributor",
                image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=600&q=80"
              },
              {
                title: "Intermediate",
                budget: "$100-200",
                features: ["Calibrated tamper", "WDT tool", "Puck screen", "Precision distributor"],
                recommendation: "Calibrated tamper + WDT needles",
                image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80"
              },
              {
                title: "Professional",
                budget: "$200-400",
                features: ["Premium tamper set", "Advanced WDT", "Multiple screens", "Complete toolkit"],
                recommendation: "Full professional prep station setup",
                image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80"
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
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
