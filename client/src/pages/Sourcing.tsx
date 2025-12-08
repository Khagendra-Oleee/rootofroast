import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowLeft, MapPin, Leaf, Mountain, Coffee, Sparkles } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import SplitText from "@/components/reactbits/SplitText";
import GradientText from "@/components/reactbits/GradientText";
import FloatingParticles from "@/components/reactbits/FloatingParticles";
import CountUp from "@/components/reactbits/CountUp";
import ShinyButton from "@/components/reactbits/ShinyButton";
import TextReveal from "@/components/reactbits/TextReveal";
import StaggeredGrid from "@/components/reactbits/StaggeredGrid";
import ClickSpark from "@/components/reactbits/ClickSpark";
import nepalImg1 from "@assets/stock_images/nepal_himalayan_coff_a7325576.jpg";
import nepalImg2 from "@assets/stock_images/nepal_himalayan_coff_f7ea407b.jpg";
import farmerImg1 from "@assets/stock_images/coffee_farmer_handpi_fcb39c89.jpg";
import farmerImg2 from "@assets/stock_images/coffee_farmer_handpi_96436173.jpg";
import ethiopianImg from "@assets/stock_images/ethiopian_coffee_cer_3d5eab9e.jpg";
import roastingImg from "@assets/stock_images/coffee_roasting_proc_0ed4137b.jpg";

const origins = [
  {
    country: "Ethiopia",
    region: "Yirgacheffe",
    altitude: "1,700 - 2,200m",
    variety: "Heirloom Arabica",
    notes: "Floral, citrus, bergamot",
    description: "The birthplace of coffee. Our Ethiopian beans are hand-picked from ancient heirloom varietals, processed using traditional washing methods.",
    color: "from-amber-600 to-orange-500"
  },
  {
    country: "Nepal",
    region: "Himalayan Highlands",
    altitude: "1,200 - 1,800m",
    variety: "Arabica & Robusta",
    notes: "Honey, chocolate, walnut",
    description: "Among the world's finest specialty coffees, Nepali beans thrive in the pristine Himalayan environment. Small-scale farmers cultivate premium Arabica and Robusta varietals at high altitudes.",
    color: "from-emerald-600 to-teal-500"
  },
  {
    country: "Colombia",
    region: "Huila",
    altitude: "1,500 - 2,000m",
    variety: "Castillo, Caturra",
    notes: "Caramel, red fruit, balanced",
    description: "From the lush mountains of Huila, these beans are grown by third-generation farmers using sustainable practices passed down through families.",
    color: "from-rose-600 to-red-500"
  }
];

export default function Sourcing() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      <LiquidBackground />
      <FloatingParticles count={25} colors={["#D4A574", "#C67B48", "#6C7A5B", "#8B5A2B"]} />
      
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

      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={nepalImg1} 
            alt="Coffee plantation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </motion.div>

        <motion.div 
          style={{ y: textY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-primary/80 text-sm tracking-[0.3em] uppercase mb-6 block font-medium"
          >
            The Journey Begins
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6">
            <SplitText text="Origin" className="text-foreground" delay={0.1} />
            {" "}
            <GradientText text="Stories" className="text-6xl md:text-8xl lg:text-9xl font-serif" />
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-foreground/60 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            From the misty highlands of Nepal to the ancient forests of Ethiopia, 
            we trace every bean to its source.
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
            className="w-6 h-10 rounded-full border-2 border-foreground/30 flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ParallaxImage src={farmerImg1} alt="Coffee farmer" delay={0} />
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <span className="text-primary/70 text-sm tracking-[0.2em] uppercase font-medium">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight text-foreground">
                Direct Trade, <br />
                <GradientText text="Direct Impact" />
              </h2>
              <TextReveal 
                text="We believe exceptional coffee starts with exceptional relationships. By working directly with farmers in Ethiopia, Nepal, Colombia, and beyond, we ensure fair compensation and sustainable practices while securing the finest beans."
                className="text-foreground/60 text-lg leading-relaxed"
              />
              <StaggeredGrid className="grid grid-cols-3 gap-6 pt-8 border-t border-foreground/10" stagger={0.15}>
                <StatCard number={47} label="Partner Farms" />
                <StatCard number={12} label="Countries" />
                <StatCard number={100} label="Traceable" suffix="%" />
              </StaggeredGrid>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10 bg-gradient-to-b from-transparent via-black/10 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary/70 text-sm tracking-[0.2em] uppercase mb-4 block font-medium">Featured Origins</span>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground">
              Where Excellence <GradientText text="Grows" />
            </h2>
          </motion.div>

          <div className="space-y-32">
            {origins.map((origin, index) => (
              <OriginCard key={origin.country} origin={origin} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
            <GalleryImage src={nepalImg2} title="Himalayan Sunrise" />
            <GalleryImage src={ethiopianImg} title="Ethiopian Ceremony" />
            <GalleryImage src={roastingImg} title="The Roasting Art" />
          </StaggeredGrid>
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
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">
              Every Cup Tells a <GradientText text="Story" />
            </h2>
            <p className="text-foreground/60 text-xl mb-12 leading-relaxed">
              From seed to cup, we honor the journey. Discover the hands that nurture, 
              the lands that give, and the traditions that endure.
            </p>
            <Link href="/">
              <ClickSpark sparkColor="#D4A574">
                <Magnetic>
                  <ShinyButton>
                    <Coffee className="w-5 h-5" />
                    Explore Our Collection
                  </ShinyButton>
                </Magnetic>
              </ClickSpark>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ParallaxImage({ src, alt, delay }: { src: string; alt: string; delay: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative aspect-[4/5] rounded-3xl overflow-hidden group shadow-2xl"
    >
      <motion.img 
        style={{ y }}
        src={src} 
        alt={alt} 
        className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

function StatCard({ number, label, suffix = "" }: { number: number; label: string; suffix?: string }) {
  return (
    <div className="text-center group">
      <span className="text-4xl font-serif text-primary block mb-2">
        <CountUp to={number} suffix={suffix} />
      </span>
      <span className="text-foreground/40 text-sm uppercase tracking-wider group-hover:text-foreground/60 transition-colors">{label}</span>
    </div>
  );
}

function OriginCard({ origin, index }: { origin: typeof origins[0]; index: number }) {
  const isEven = index % 2 === 0;
  const isNepal = origin.country === "Nepal";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? "" : "lg:direction-rtl"}`}
    >
      <div className={`space-y-6 ${!isEven ? "lg:order-2" : ""}`}>
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${origin.color}`} />
          <span className="text-foreground/40 text-sm uppercase tracking-wider">{origin.region}</span>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-serif text-foreground">
          {origin.country}
          {isNepal && (
            <motion.span 
              className="inline-flex ml-3"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.span>
          )}
        </h3>
        
        <p className="text-foreground/60 text-lg leading-relaxed">
          {origin.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <motion.div 
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
            whileHover={{ y: -3 }}
          >
            <Mountain className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-foreground/40 text-xs uppercase tracking-wider block mb-1">Altitude</span>
            <span className="text-foreground font-medium">{origin.altitude}</span>
          </motion.div>
          <motion.div 
            className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group"
            whileHover={{ y: -3 }}
          >
            <Leaf className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-foreground/40 text-xs uppercase tracking-wider block mb-1">Variety</span>
            <span className="text-foreground font-medium">{origin.variety}</span>
          </motion.div>
        </div>
        
        <div className="flex items-center gap-3 pt-4">
          <Coffee className="w-5 h-5 text-primary" />
          <span className="text-foreground/60">Tasting Notes: <span className="text-primary font-medium">{origin.notes}</span></span>
        </div>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        className={`relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ${!isEven ? "lg:order-1" : ""}`}
      >
        <img 
          src={isNepal ? nepalImg2 : (index === 0 ? ethiopianImg : farmerImg2)} 
          alt={origin.country}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {isNepal && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 left-6 right-6"
          >
            <span className="inline-flex items-center gap-2 text-xs text-primary uppercase tracking-wider bg-primary/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              Featured Origin
            </span>
            <p className="text-foreground/80 text-sm mt-3 leading-relaxed">
              Nepal's high-altitude coffee is rapidly gaining recognition among specialty roasters worldwide.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function GalleryImage({ src, title }: { src: string; title: string }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer shadow-xl"
    >
      <img 
        src={src} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6">
        <span className="text-foreground font-serif text-xl">{title}</span>
      </div>
    </motion.div>
  );
}
