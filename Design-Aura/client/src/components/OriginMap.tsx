import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import plantationImg from "@assets/stock_images/coffee_plantation_la_b75a7fa9.jpg";

export default function OriginMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <section id="origins" ref={containerRef} className="relative h-[90vh] flex items-center overflow-hidden my-24">
      {/* Background Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply" />
        <img 
          src={plantationImg} 
          alt="Coffee Plantation" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-black/20 backdrop-blur-xl p-12 rounded-lg border border-white/10"
          >
            <span className="text-primary text-sm uppercase tracking-widest mb-4 block">Our Source</span>
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-none">
              Global <br />
              <span className="italic text-white/50">Origins</span>
            </h2>
            <p className="text-white/90 text-xl font-light leading-relaxed mb-10">
              We travel to the remote mountains of Ethiopia, the volcanic soils of Guatemala, and the high-altitude farms of Kenya to source beans that tell a story of their terrain.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Ethiopia", "Colombia", "Brazil", "Kenya", "Costa Rica"].map((country, i) => (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  key={country} 
                  className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-white text-sm hover:bg-primary hover:text-black hover:border-primary transition-all cursor-pointer"
                >
                  {country}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
