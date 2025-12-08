import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Contact() {
  return (
    <section className="py-24 bg-card border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="bg-primary/5 rounded-3xl p-12 md:p-24 relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
              Join the Club
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Subscribe to receive weekly brewing tips, exclusive micro-lot releases, and stories from our origin trips.
            </p>
            
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-6 py-4 rounded-full bg-background border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors"
              />
              <Magnetic>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-black font-medium rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors"
                >
                  Subscribe
                  <ArrowRight size={18} />
                </motion.button>
              </Magnetic>
            </form>
            
            <p className="mt-6 text-white/40 text-sm">
              We respect your privacy. No spam, just good coffee.
            </p>
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>© 2024 Roots of Roast. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
