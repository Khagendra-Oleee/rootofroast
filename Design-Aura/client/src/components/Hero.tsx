import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import heroBg from "@assets/stock_images/cinematic_espresso_b_57820c7f.jpg";
import Magnetic from "./Magnetic";
import BlurText from "./BlurText";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1.1, 1]);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-background z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center px-4 max-w-7xl mx-auto flex flex-col items-center"
      >
        <div className="mb-4">
           <BlurText 
             text="Portfolio 2024"
             className="text-primary font-sans text-sm md:text-base tracking-[0.4em] uppercase font-medium"
             delay={0.2}
           />
        </div>
        
        <div className="overflow-hidden py-2 -my-2">
           <BlurText 
             text="The Art"
             className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-white leading-[0.9] tracking-tighter"
             delay={0.4}
             animateBy="letters"
           />
        </div>
        
        <div className="overflow-hidden py-2 -my-2 mb-8">
           <BlurText 
             text="of Coffee"
             className="font-serif text-6xl md:text-8xl lg:text-[10rem] text-white/90 italic leading-[0.9] tracking-tighter"
             delay={0.6}
             animateBy="letters"
           />
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="max-w-xl mx-auto text-white/70 text-lg md:text-xl font-light mb-12 leading-relaxed mix-blend-plus-lighter"
        >
          A visual exploration of origin, craft, and culture. Curated stories from the world's finest roasters.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex gap-6"
        >
          <Magnetic>
            <button 
              onClick={() => scrollToSection("#collection")}
              className="group relative px-8 py-4 bg-white text-black font-sans font-medium rounded-full overflow-hidden transition-all hover:scale-105 cursor-pointer"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </Magnetic>
          
          <Magnetic>
             <button 
               onClick={() => scrollToSection("#story")}
               className="px-8 py-4 text-white font-sans font-medium rounded-full border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer"
             >
              Read Philosophy
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Scroll to Explore</span>
        <div className="w-[1px] h-16 bg-white/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scroll-down" />
        </div>
      </motion.div>
    </div>
  );
}
