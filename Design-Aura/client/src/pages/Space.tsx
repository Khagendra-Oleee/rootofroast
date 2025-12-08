import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Lamp, Users, Volume2, Leaf, Heart } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import SplitText from "@/components/reactbits/SplitText";
import GradientText from "@/components/reactbits/GradientText";
import FloatingParticles from "@/components/reactbits/FloatingParticles";
import ShinyButton from "@/components/reactbits/ShinyButton";
import TextReveal from "@/components/reactbits/TextReveal";
import StaggeredGrid from "@/components/reactbits/StaggeredGrid";
import CountUp from "@/components/reactbits/CountUp";
import ClickSpark from "@/components/reactbits/ClickSpark";

import cafeImg1 from "@assets/stock_images/modern_cozy_coffee_s_ca1898f8.jpg";
import cafeImg2 from "@assets/stock_images/modern_cozy_coffee_s_2fd3a8c2.jpg";
import cafeImg3 from "@assets/stock_images/coffee_shop_ambience_5f0ecb2c.jpg";

const features = [
  {
    icon: <Lamp className="w-6 h-6" />,
    title: "Warm Ambiance",
    description: "Soft, layered lighting creates an atmosphere of comfort and focus."
  },
  {
    icon: <Volume2 className="w-6 h-6" />,
    title: "Curated Sounds",
    description: "A carefully selected playlist that enhances concentration and calm."
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Natural Elements",
    description: "Living plants and natural materials bring the outdoors in."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Tables",
    description: "Spaces designed to encourage connection and conversation."
  }
];

const gallery = [
  { src: cafeImg1, title: "Morning Light", aspect: "aspect-[4/5]" },
  { src: cafeImg3, title: "The Craft", aspect: "aspect-[3/4]" },
  { src: cafeImg2, title: "Evening Warmth", aspect: "aspect-[4/5]" }
];

export default function Space() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      <LiquidBackground />
      <FloatingParticles count={20} colors={["#D4A574", "#C67B48", "#6C7A5B"]} />
      
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
            src={cafeImg1} 
            alt="Coffee shop interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-primary/80 text-sm tracking-[0.3em] uppercase mb-6 block font-medium"
          >
            Urban Sanctuaries
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif mb-6">
            <SplitText text="Space" className="text-foreground" delay={0.1} />
            {" & "}
            <GradientText text="Soul" className="text-6xl md:text-8xl lg:text-9xl font-serif" />
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-foreground/60 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Capturing the essence of modern cafe culture through design, light, and community.
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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-primary/70 text-sm tracking-[0.2em] uppercase font-medium">Design Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight text-foreground">
                The Third <GradientText text="Place" />
              </h2>
              <TextReveal 
                text="Between home and work lies a third space - a sanctuary where time slows, conversations flow, and the ritual of coffee becomes a moment of mindfulness. We design spaces that nurture the soul."
                className="text-foreground/60 text-lg leading-relaxed"
              />
              
              <div className="grid grid-cols-2 gap-6 pt-8">
                <motion.div 
                  className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  whileHover={{ y: -3 }}
                >
                  <span className="text-4xl font-serif text-primary block mb-2">
                    <CountUp to={847} />
                  </span>
                  <span className="text-foreground/40 text-sm uppercase tracking-wider">Sq Meters</span>
                </motion.div>
                <motion.div 
                  className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  whileHover={{ y: -3 }}
                >
                  <span className="text-4xl font-serif text-primary block mb-2">
                    <CountUp to={64} />
                  </span>
                  <span className="text-foreground/40 text-sm uppercase tracking-wider">Seats</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={cafeImg2} 
                  alt="Cafe interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -left-8 w-40 h-40 rounded-3xl bg-card border border-white/10 shadow-xl flex flex-col items-center justify-center p-4"
              >
                <Heart className="w-8 h-8 text-primary mb-2" />
                <span className="text-foreground text-sm font-medium text-center">Designed for Connection</span>
              </motion.div>
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
            className="text-center mb-16"
          >
            <span className="text-primary/70 text-sm tracking-[0.2em] uppercase mb-4 block font-medium">Elements of Design</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              Crafted <GradientText text="Atmosphere" />
            </h2>
          </motion.div>

          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </StaggeredGrid>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-primary/70 text-sm tracking-[0.2em] uppercase mb-4 block font-medium">Visual Journey</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              Moments in <GradientText text="Time" />
            </h2>
          </motion.div>

          <StaggeredGrid className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.15}>
            {gallery.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -10 }}
                className={`relative ${item.aspect} rounded-3xl overflow-hidden group cursor-pointer shadow-xl`}
              >
                <img 
                  src={item.src} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-foreground font-serif text-xl">{item.title}</span>
                </div>
              </motion.div>
            ))}
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
              Find Your <GradientText text="Space" />
            </h2>
            <p className="text-foreground/60 text-xl mb-12 leading-relaxed">
              Every corner tells a story, every seat holds possibility. 
              Come discover your place in our community.
            </p>
            <Link href="/">
              <ClickSpark sparkColor="#D4A574">
                <Magnetic>
                  <ShinyButton>
                    <Users className="w-5 h-5" />
                    Visit Us
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

function FeatureCard({ feature }: { feature: typeof features[0] }) {
  return (
    <motion.div
      className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group text-center"
      whileHover={{ y: -5 }}
    >
      <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        {feature.icon}
      </div>
      <h3 className="text-xl font-serif text-foreground mb-3 group-hover:text-primary transition-colors">
        {feature.title}
      </h3>
      <p className="text-foreground/50 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}
