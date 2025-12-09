import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Coffee, Droplets, Flame, Settings, Sparkles } from "lucide-react";
import Spotlight from "./reactbits/Spotlight";
import SplitText from "./reactbits/SplitText";
import CountUp from "./reactbits/CountUp";
import GradientText from "./reactbits/GradientText";
import ShinyButton from "./reactbits/ShinyButton";
import ClickSpark from "./reactbits/ClickSpark";
import LightPillar from "./reactbits/LightPillar";

// Import local machine images
import espressoImg from "@assets/stock_images/machines/esspressomachine.webp";
import pourOverImg from "@assets/stock_images/machines/pour_over.jpg";
import grinderImg from "@assets/stock_images/machines/grinder.jpg";
import stovetopImg from "@assets/stock_images/machines/stovetop.jpg";

const equipmentCards = [
  {
    id: "espresso",
    icon: <Coffee className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Espresso",
    subtitle: "Pressure Brewing",
    description: "9 bars of pressure for the perfect shot",
    image: espressoImg,
    stat: "9",
    statLabel: "Bar",
    color: "#D4A574",
  },
  {
    id: "pourover",
    icon: <Droplets className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Pour Over",
    subtitle: "Precision Drip",
    description: "Optimal temperature for extraction",
    image: pourOverImg,
    stat: "96",
    statLabel: "°C",
    color: "#C67B48",
  },
  {
    id: "grinders",
    icon: <Settings className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Grinders",
    subtitle: "Burr Technology",
    description: "Precise grind size adjustments",
    image: grinderImg,
    stat: "40",
    statLabel: "Steps",
    color: "#8B5A2B",
  },
  {
    id: "stovetop",
    icon: <Flame className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Stovetop",
    subtitle: "Traditional Craft",
    description: "Classic Italian brewing method",
    image: stovetopImg,
    stat: "2",
    statLabel: "Bar",
    color: "#A0522D",
  },
];

export default function MachinesPreview() {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<number>(0);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <section 
      id="machines" 
      ref={sectionRef}
      className="py-28 md:py-44 relative overflow-hidden"
    >
      {/* Light Pillar Background Effect */}
      <div className="absolute inset-0 z-0">
        <LightPillar
          topColor="#D4A574"
          bottomColor="#8B5A2B"
          intensity={0.6}
          rotationSpeed={0.15}
          glowAmount={0.003}
          pillarWidth={5.0}
          pillarHeight={0.25}
          noiseIntensity={0.3}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="screen"
        />
      </div>

      {/* Animated Background Layers */}
      <motion.div 
        className="absolute inset-0 z-[1]"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/8 blur-[120px] rounded-full"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-accent/8 blur-[100px] rounded-full"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 blur-[150px] rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.015]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(212,165,116,0.5) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 md:mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
              Tools of the Trade
            </span>
          </motion.div>
          
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 md:mb-8 leading-[1.1]">
            <SplitText text="Coffee" className="text-foreground" delay={0.2} />
            <br />
            <span className="relative inline-block mt-2">
              <GradientText text="Equipment" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic" />
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </span>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-foreground/60 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            From precision espresso machines to artisanal hand grinders, 
            discover the tools that transform beans into extraordinary brews.
          </motion.p>
        </div>

        {/* Equipment Cards Grid */}
        <Spotlight className="rounded-3xl p-1" spotlightSize={600} spotlightColor="rgba(212, 165, 116, 0.08)">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {equipmentCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 60, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1]
                }}
                onMouseEnter={() => {
                  setHoveredCard(card.id);
                  setActiveCard(index);
                }}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative perspective-1000"
              >
                <motion.div 
                  className={`
                    relative overflow-hidden rounded-2xl md:rounded-3xl 
                    bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-md
                    border transition-all duration-500 ease-out
                    ${hoveredCard === card.id 
                      ? 'border-primary/40 shadow-2xl shadow-primary/20' 
                      : 'border-white/10 shadow-xl shadow-black/20'
                    }
                    ${hoveredCard && hoveredCard !== card.id ? 'opacity-60 scale-[0.97]' : ''}
                  `}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Image Container */}
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <motion.img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredCard === card.id ? 1.12 : 1,
                        filter: hoveredCard === card.id ? 'brightness(1.1)' : 'brightness(1)',
                      }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ 
                        background: `radial-gradient(circle at 50% 100%, ${card.color}40, transparent 70%)` 
                      }}
                    />
                    
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%', opacity: 0 }}
                      whileHover={{ x: '100%', opacity: 0.3 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      }}
                    />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5 lg:p-6">
                    {/* Top Section - Icon & Number */}
                    <div className="flex items-start justify-between">
                      <motion.div
                        className={`
                          w-11 h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl 
                          flex items-center justify-center backdrop-blur-md
                          transition-all duration-400
                          ${hoveredCard === card.id 
                            ? 'bg-primary text-black shadow-lg shadow-primary/30' 
                            : 'bg-white/10 text-primary border border-white/20'
                          }
                        `}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {card.icon}
                      </motion.div>
                      
                      {/* Index Number */}
                      <span className="text-white/20 text-xs md:text-sm font-mono">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Bottom Section - Info */}
                    <div>
                      {/* Animated Stat Badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ 
                          opacity: hoveredCard === card.id ? 1 : 0,
                          y: hoveredCard === card.id ? 0 : 10,
                          scale: hoveredCard === card.id ? 1 : 0.9
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-3 md:mb-4"
                      >
                        <span 
                          className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border"
                          style={{ 
                            backgroundColor: `${card.color}20`,
                            borderColor: `${card.color}40`
                          }}
                        >
                          <CountUp 
                            to={parseInt(card.stat)} 
                            className="text-lg md:text-xl font-serif font-semibold" 
                            duration={0.8}
                          />
                          <span className="text-xs opacity-70">{card.statLabel}</span>
                        </span>
                      </motion.div>

                      {/* Title & Subtitle */}
                      <h3 className="text-xl md:text-2xl lg:text-[1.75rem] font-serif text-white mb-1 group-hover:text-primary transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-foreground/50 text-xs md:text-sm font-light">
                        {card.subtitle}
                      </p>
                      
                      {/* Description on hover */}
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: hoveredCard === card.id ? 1 : 0,
                          height: hoveredCard === card.id ? 'auto' : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-foreground/40 text-xs mt-2 overflow-hidden"
                      >
                        {card.description}
                      </motion.p>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div 
                    className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 100% 0%, ${card.color}30, transparent 70%)`
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Spotlight>

        {/* Bottom Stats & CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-14 md:mt-20"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-r from-card/60 via-card/40 to-card/60 backdrop-blur-md border border-white/10 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/20 blur-[80px] rounded-full" />
              <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-accent/20 blur-[100px] rounded-full" />
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-10 lg:gap-14 relative z-10">
              {[
                { value: 6, label: "Brewing Methods", suffix: "+" },
                { value: 15, label: "Equipment Types", suffix: "+" },
                { value: 100, label: "Years of Innovation", suffix: "+" },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-serif text-primary mb-1">
                    <CountUp to={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <div className="text-xs md:text-sm text-foreground/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="relative z-10">
              <Link href="/machines">
                <ClickSpark sparkColor="#D4A574" sparkCount={8}>
                  <ShinyButton className="whitespace-nowrap px-8 py-4">
                    <span className="mr-2">Explore All Equipment</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </ShinyButton>
                </ClickSpark>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="mt-16 md:mt-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>
    </section>
  );
}
