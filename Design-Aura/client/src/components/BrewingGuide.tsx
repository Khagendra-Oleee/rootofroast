import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import brewImg from "@assets/stock_images/pour_over_coffee_bre_f56adaca.jpg";
import { Droplets, Clock, Thermometer, ArrowRight } from "lucide-react";
import TiltCard from "./TiltCard";
import ShinyButton from "./reactbits/ShinyButton";
import GradientText from "./reactbits/GradientText";
import ClickSpark from "./reactbits/ClickSpark";

const steps = [
  {
    icon: <Thermometer className="w-6 h-6" />,
    title: "Temperature",
    desc: "Water heated to exactly 94°C for optimal extraction."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Timing",
    desc: "A precise 3-minute bloom and pour cycle."
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: "Ratio",
    desc: "1:16 golden ratio of coffee to water."
  }
];

export default function BrewingGuide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="brew" className="py-32 bg-card relative overflow-hidden">
      {/* Soft Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: -2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <TiltCard>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={brewImg} 
                  alt="Pour Over Brewing" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </TiltCard>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -left-10 w-48 h-48 bg-background border border-white/5 shadow-xl rounded-full flex flex-col items-center justify-center z-10 p-6 text-center"
            >
              <span className="text-4xl font-serif text-primary mb-1">94°</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Optimal Temp</span>
            </motion.div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-serif text-foreground mb-10 leading-tight">
                Mastering the <br />
                <GradientText text="Perfect Pour" className="text-5xl md:text-6xl font-serif italic" />
              </h2>
  
              <div className="space-y-10">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="flex gap-8 group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-lg">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-muted-foreground font-light text-lg">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
  
              <Link href="/process">
                <ClickSpark sparkColor="#D4A574">
                  <ShinyButton className="mt-16">
                    Explore Process
                    <ArrowRight className="w-5 h-5" />
                  </ShinyButton>
                </ClickSpark>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
