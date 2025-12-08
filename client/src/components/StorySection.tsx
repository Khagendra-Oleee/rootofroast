import { motion } from "framer-motion";
import textureImg from "@assets/generated_images/roasted_coffee_beans_texture.png";

export default function StorySection() {
  return (
    <section id="story" className="py-32 relative overflow-hidden bg-background">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url(${textureImg})`, backgroundSize: '300px' }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-6 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
              "We believe coffee is more than a drink. It is a moment of <span className="text-primary italic">connection</span>."
            </h2>
            <div className="w-24 h-px bg-primary/50 mx-auto mb-8" />
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Founded in 2024, our mission has been simple: to bridge the gap between the farmer and the cup. We work directly with artisan growers, ensuring fair wages and sustainable practices, so you can taste the dedication in every sip.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
