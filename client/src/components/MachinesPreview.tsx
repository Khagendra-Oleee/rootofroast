import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Coffee, Droplets, Flame, Settings, Sparkles } from "lucide-react";
import SplitText from "./reactbits/SplitText";
import CountUp from "./reactbits/CountUp";
import GradientText from "./reactbits/GradientText";
import ShinyButton from "./reactbits/ShinyButton";
import ClickSpark from "./reactbits/ClickSpark";

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

  return (
    <section 
      id="machines" 
      ref={sectionRef}
      className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-b from-background via-card/30 to-background"
    >
      {/* Simple Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
              Tools of the Trade
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6">
            <SplitText text="Coffee" className="text-foreground" delay={0.1} />
            <br />
            <GradientText text="Equipment" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic" />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-foreground/50 text-base md:text-lg max-w-2xl mx-auto"
          >
            From precision espresso machines to artisanal hand grinders, 
            discover the tools that transform beans into extraordinary brews.
          </motion.p>
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {equipmentCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              <div className={`
                relative overflow-hidden rounded-2xl md:rounded-3xl 
                bg-card/80 border border-white/10
                transition-all duration-300
                ${hoveredCard === card.id ? 'border-primary/30 shadow-xl shadow-primary/10 scale-[1.02]' : ''}
                ${hoveredCard && hoveredCard !== card.id ? 'opacity-60' : ''}
              `}>
                {/* Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      hoveredCard === card.id ? 'scale-110' : 'scale-100'
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
                  {/* Top - Icon */}
                  <div className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl 
                    flex items-center justify-center transition-all duration-300
                    ${hoveredCard === card.id 
                      ? 'bg-primary text-black' 
                      : 'bg-white/10 text-primary border border-white/20'
                    }
                  `}>
                    {card.icon}
                  </div>

                  {/* Bottom - Info */}
                  <div>
                    {/* Stat Badge */}
                    <div className={`mb-3 transition-all duration-300 ${
                      hoveredCard === card.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                      <span className="inline-flex items-baseline gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                        <span className="text-lg md:text-xl font-serif text-primary">{card.stat}</span>
                        <span className="text-xs text-primary/70">{card.statLabel}</span>
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-serif text-white mb-1 group-hover:text-primary transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-foreground/50 text-xs md:text-sm">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-card/50 border border-white/10"
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
