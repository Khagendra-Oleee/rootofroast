import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import BlurText from "./BlurText";
import plantationImg from "@assets/stock_images/coffee_plantation_la_b75a7fa9.jpg";

export default function CoffeeCulture() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-card min-h-screen flex items-center">
       {/* Background Parallax */}
       <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-20"
      >
        <img 
          src={plantationImg} 
          alt="Coffee Texture" 
          className="w-full h-full object-cover grayscale mix-blend-overlay"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-primary text-sm tracking-widest uppercase mb-6 block">Our Philosophy</span>
            <BlurText 
              text="Coffee is Culture" 
              className="text-6xl md:text-8xl font-serif text-white mb-10 leading-[0.9]"
            />
            
            <div className="space-y-12">
              {[
                { 
                  quote: "Coffee is a language in itself.",
                  author: "Jackie Chan",
                  desc: "It transcends borders, speaking directly to the soul through aroma and warmth."
                },
                { 
                  quote: "I never laugh until I've had my coffee.",
                  author: "Clark Gable",
                  desc: "The ritual of preparation is as vital as the consumption itself—a moment of pause before the world begins."
                },
                { 
                  quote: "Even bad coffee is better than no coffee at all.",
                  author: "David Lynch",
                  desc: "But we believe life is too short for bad coffee. We strive for the sublime in every cup." 
                }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  key={i} 
                  className="flex gap-6 bg-black/40 p-6 rounded-xl backdrop-blur-sm border border-white/5 hover:border-primary/30 transition-colors"
                >
                  <div className="shrink-0 text-primary mt-1">
                    <Quote size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white mb-2 italic">"{item.quote}"</h3>
                    <p className="text-sm text-primary mb-3">— {item.author}</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
