import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Users, Clock, Sparkles, Heart } from "lucide-react";
import { Link } from "wouter";
import LiquidBackground from "@/components/LiquidBackground";
import Magnetic from "@/components/Magnetic";
import BlurText from "@/components/BlurText";
import cafeImg1 from "@assets/stock_images/modern_cozy_coffee_s_ca1898f8.jpg";
import cafeImg2 from "@assets/stock_images/modern_cozy_coffee_s_2fd3a8c2.jpg";
import cafeImg3 from "@assets/stock_images/coffee_shop_ambience_5f0ecb2c.jpg";

const spaceFeatures = [
  {
    icon: Users,
    title: "Community First",
    description: "Designed for connection. Our spaces foster meaningful interactions between coffee lovers, creators, and dreamers."
  },
  {
    icon: Clock,
    title: "Timeless Design",
    description: "Blending vintage warmth with modern minimalism. Every detail is intentional, creating spaces that feel both familiar and fresh."
  },
  {
    icon: Sparkles,
    title: "Sensory Experience",
    description: "From ambient lighting to curated acoustics, we craft environments that engage all senses."
  },
  {
    icon: Heart,
    title: "Soul & Character",
    description: "Each cafe tells a story through local art, handcrafted furniture, and thoughtful spatial design."
  }
];

const galleryImages = [
  { src: cafeImg1, title: "Morning Light", aspect: "portrait" },
  { src: cafeImg2, title: "Corner Nook", aspect: "landscape" },
  { src: cafeImg3, title: "Community Table", aspect: "portrait" },
];

export default function Space() {
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
            src={cafeImg1} 
            alt="Modern cafe interior" 
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
            Urban Sanctuaries
          </motion.span>
          
          <BlurText 
            text="Space & Soul" 
            className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6"
            delay={0.1}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed"
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
            <span className="text-primary text-sm tracking-[0.2em] uppercase mb-4 block">The Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              More Than Just <span className="text-primary">Coffee Shops</span>
            </h2>
            <p className="text-white/70 text-xl leading-relaxed">
              We document and design spaces where time slows down, conversations deepen, 
              and the ritual of coffee becomes a moment of connection. Each cafe we capture 
              is a sanctuary from the noise of modern life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {spaceFeatures.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
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
            <span className="text-primary text-sm tracking-[0.2em] uppercase mb-4 block">Visual Stories</span>
            <h2 className="text-4xl md:text-6xl font-serif">
              Moments <span className="text-primary">Captured</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <GalleryCard key={image.title} image={image} index={index} />
            ))}
          </div>
        </div>
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
              <span className="text-primary text-sm tracking-[0.2em] uppercase">Design Principles</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                Creating <span className="text-primary">Third Spaces</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                The best cafes exist between home and work—a third space where identity 
                is fluid and connection is organic. We study how light, texture, and 
                spatial flow create environments that feel both intimate and open.
              </p>
              <ul className="space-y-4">
                {["Natural materials and warm textures", "Intentional lighting design", "Acoustic comfort for conversation", "Flexible seating arrangements"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <img 
                src={cafeImg2} 
                alt="Cafe interior detail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
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
              Let's Create <span className="text-primary">Together</span>
            </h2>
            <p className="text-white/70 text-xl mb-12 leading-relaxed">
              Whether you're designing a new cafe or reimagining an existing space, 
              we'd love to collaborate on your vision.
            </p>
            <Link href="/">
              <Magnetic>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-primary text-black font-medium rounded-full hover:bg-primary/90 transition-colors"
                >
                  Start a Conversation
                </motion.button>
              </Magnetic>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof spaceFeatures[0]; index: number }) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-primary transition-colors">
        {feature.title}
      </h3>
      <p className="text-white/60 leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

function GalleryCard({ image, index }: { image: typeof galleryImages[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
        index === 1 ? "md:row-span-2" : "aspect-square"
      }`}
    >
      <img 
        src={image.src} 
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-6 left-6 right-6"
      >
        <span className="text-white font-serif text-xl">{image.title}</span>
      </motion.div>
    </motion.div>
  );
}
