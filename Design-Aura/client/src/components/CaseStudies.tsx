import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TiltCard from "./TiltCard";
import farmerImg from "@assets/stock_images/coffee_farmer_handpi_a9511171.jpg";
import cafeImg from "@assets/stock_images/coffee_shop_ambience_5f0ecb2c.jpg";
import espressoImg from "@assets/stock_images/espresso_machine_por_6d4bd314.jpg";
import BlurText from "./BlurText";

const projects = [
  {
    id: 1,
    category: "Sourcing",
    title: "Ethiopian Harvest",
    description: "Documenting the meticulous hand-picking process in Yirgacheffe.",
    image: farmerImg,
    year: "2024"
  },
  {
    id: 2,
    category: "Space",
    title: "Urban Sanctuary",
    description: "Capturing the warm, community-focused ambience of modern cafes.",
    image: cafeImg,
    year: "2023"
  },
  {
    id: 3,
    category: "Craft",
    title: "The Extraction",
    description: "A macro study of espresso mechanics and fluid dynamics.",
    image: espressoImg,
    year: "2024"
  }
];

export default function CaseStudies() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="collection" className="py-32 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <span className="text-primary text-sm tracking-widest uppercase mb-4 block">Selected Works</span>
            <BlurText 
              text="Visual Narratives" 
              className="text-5xl md:text-7xl font-serif text-white mb-6"
              delay={0.2}
            />
          </div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             viewport={{ once: true }}
          >
             <p className="text-muted-foreground text-lg max-w-sm text-right md:text-left">
              A collection of visual stories and design projects centered around coffee culture.
            </p>
          </motion.div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="group cursor-pointer h-full">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-8 bg-card">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  
                  {/* Overlay Info */}
                  <div className="absolute top-6 right-6 px-4 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-xs font-medium text-white">{project.year}</span>
                  </div>
                </div>
                
                <div className="space-y-3 relative">
                  <div className="flex justify-between items-baseline">
                    <p className="text-primary text-xs uppercase tracking-wider font-medium">{project.category}</p>
                  </div>
                  <h3 className="text-3xl font-serif text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[90%]">{project.description}</p>
                  
                  <motion.div 
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
