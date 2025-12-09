import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Coffee, Gauge, Zap } from "lucide-react";
import TiltCard from "./TiltCard";
import ShinyButton from "./reactbits/ShinyButton";
import GradientText from "./reactbits/GradientText";
import ClickSpark from "./reactbits/ClickSpark";

const equipmentTypes = [
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "Espresso Machines",
    desc: "From lever to super-automatic, the heart of café culture."
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "Pour Over & Drippers",
    desc: "Precision brewing for single-origin clarity."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Grinders & Tools",
    desc: "Essential equipment for consistent extraction."
  }
];

export default function MachinesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="machines" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Soft Glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary/60 text-xs md:text-sm tracking-[0.2em] uppercase mb-4 block">
                Tools of the Trade
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6 md:mb-10 leading-tight">
                Coffee <br />
                <GradientText text="Equipment" className="text-4xl md:text-5xl lg:text-6xl font-serif italic" />
              </h2>

              <p className="text-foreground/60 text-base md:text-lg mb-8 md:mb-10 max-w-lg">
                Understanding the machines and tools that shape how we brew. 
                From traditional methods to modern innovations.
              </p>
  
              <div className="space-y-6 md:space-y-8">
                {equipmentTypes.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="flex gap-4 md:gap-6 group"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-serif text-white mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground font-light text-sm md:text-base">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
  
              <Link href="/machines">
                <ClickSpark sparkColor="#D4A574">
                  <ShinyButton className="mt-10 md:mt-14">
                    Explore Equipment
                    <ArrowRight className="w-5 h-5" />
                  </ShinyButton>
                </ClickSpark>
              </Link>
            </motion.div>
          </div>

          {/* Image Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: 2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2"
          >
            <TiltCard>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1585515320310-259814833e62?w=1200&q=80"
                  alt="Espresso Machine" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </TiltCard>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 w-36 h-36 md:w-48 md:h-48 bg-card border border-white/5 shadow-xl rounded-full flex flex-col items-center justify-center z-10 p-4 md:p-6 text-center"
            >
              <span className="text-3xl md:text-4xl font-serif text-primary mb-1">9</span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">Bar Pressure</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
