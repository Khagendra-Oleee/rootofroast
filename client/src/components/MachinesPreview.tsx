import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Coffee, Droplets, Flame, Settings } from "lucide-react";
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
    image: espressoImg,
    stat: "9",
    statLabel: "Bar",
  },
  {
    id: "pourover",
    icon: <Droplets className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Pour Over",
    subtitle: "Precision Drip",
    image: pourOverImg,
    stat: "96",
    statLabel: "°C",
  },
  {
    id: "grinders",
    icon: <Settings className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Grinders",
    subtitle: "Burr Technology",
    image: grinderImg,
    stat: "40",
    statLabel: "Steps",
  },
  {
    id: "stovetop",
    icon: <Flame className="w-5 h-5 md:w-6 md:h-6" />,
    title: "Stovetop",
    subtitle: "Traditional Craft",
    image: stovetopImg,
    stat: "2",
    statLabel: "Bar",
  },
];

export default function MachinesPreview() {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      id="machines" 
      ref={sectionRef}
      className="py-24 md:py-40 relative overflow-hidden"
    >
      {/* Light Pillar Background Effect */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <LightPillar
          topColor="#D4A574"
          bottomColor="#8B5A2B"
          intensity={0.8}
          rotationSpeed={0.2}
          glowAmount={0.004}
          pillarWidth={4.0}
          pillarHeight={0.3}
          noiseIntensity={0.4}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="screen"
        />
      </div>

      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,165,116,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-primary/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 md:mb-6"
          >
            Tools of the Trade
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 md:mb-8">
            <SplitText text="Coffee" className="text-foreground" delay={0.2} />
            <br />
            <GradientText text="Equipment" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic" />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-foreground/50 text-base md:text-lg lg:text-xl max-w-2xl mx-auto"
          >
            From precision espresso machines to artisanal hand grinders, 
            discover the tools that transform beans into extraordinary brews.
          </motion.p>
        </div>

        {/* Equipment Cards Grid */}
        <Spotlight className="rounded-3xl" spotlightSize={500}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {equipmentCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                <div className={`
                  relative overflow-hidden rounded-2xl md:rounded-3xl 
                  bg-card/80 backdrop-blur-sm border border-white/5
                  transition-all duration-500 ease-out
                  ${hoveredCard === card.id ? 'scale-[1.02] border-primary/30 shadow-2xl shadow-primary/10' : ''}
                  ${hoveredCard && hoveredCard !== card.id ? 'opacity-50 scale-[0.98]' : ''}
                `}>
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <motion.img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredCard === card.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                    {/* Top - Icon */}
                    <motion.div
                      className={`
                        w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl 
                        flex items-center justify-center
                        transition-all duration-300
                        ${hoveredCard === card.id 
                          ? 'bg-primary text-black' 
                          : 'bg-white/10 backdrop-blur-sm text-primary border border-white/10'
                        }
                      `}
                    >
                      {card.icon}
                    </motion.div>

                    {/* Bottom - Info */}
                    <div>
                      {/* Stat Badge */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: hoveredCard === card.id ? 1 : 0,
                          x: hoveredCard === card.id ? 0 : -20
                        }}
                        transition={{ duration: 0.3 }}
                        className="mb-3 md:mb-4"
                      >
                        <span className="inline-flex items-baseline gap-1 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                          <CountUp 
                            to={parseInt(card.stat)} 
                            className="text-lg md:text-xl font-serif text-primary" 
                            duration={1}
                          />
                          <span className="text-xs text-primary/70">{card.statLabel}</span>
                        </span>
                      </motion.div>

                      <h3 className="text-xl md:text-2xl font-serif text-white mb-1 group-hover:text-primary transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-foreground/50 text-xs md:text-sm">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Hover Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
                    animate={{
                      boxShadow: hoveredCard === card.id 
                        ? 'inset 0 0 30px rgba(212, 165, 116, 0.1)' 
                        : 'inset 0 0 0px rgba(212, 165, 116, 0)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Spotlight>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-card/50 backdrop-blur-sm border border-white/5"
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
            {[
              { value: 6, label: "Brewing Methods", suffix: "+" },
              { value: 15, label: "Equipment Types", suffix: "+" },
              { value: 100, label: "Years of Innovation", suffix: "+" },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-serif text-primary">
                  <CountUp to={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-xs md:text-sm text-foreground/40 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <Link href="/machines">
            <ClickSpark sparkColor="#D4A574">
              <ShinyButton className="whitespace-nowrap">
                Explore All Equipment
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </ShinyButton>
            </ClickSpark>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
