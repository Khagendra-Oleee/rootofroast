import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";
import { Link, useLocation } from "wouter";
import Magnetic from "./Magnetic";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    // If it's a hash link, smooth scroll
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setLocation(href);
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Projects", href: "#collection" },
    { name: "Origins", href: "#origins" },
    { name: "Process", href: "#brew" },
    { name: "Machines", href: "/machines" },
    { name: "Philosophy", href: "#story" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "py-3 md:py-4 bg-background/80 backdrop-blur-md border-b border-white/5" 
            : "py-4 md:py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-serif font-bold tracking-tighter text-foreground cursor-pointer z-50 relative">
            <span className="hidden sm:inline">Roots of Roast</span>
            <span className="sm:hidden">Roots</span>
            <span className="text-primary">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group block px-2 py-1 cursor-pointer"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              </Magnetic>
            ))}
            <Magnetic>
              <button 
                onClick={() => handleNavClick("#contact")} 
                className="px-5 xl:px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 text-sm font-medium cursor-pointer"
              >
                Let's Talk
              </button>
            </Magnetic>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            className="lg:hidden text-foreground z-50 relative p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            {/* Mobile Menu Content */}
            <div className="h-full w-full flex flex-col pt-20">
              {/* Navigation Links */}
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <nav className="flex flex-col items-center gap-5 sm:gap-6">
                  {navLinks.map((link, i) => (
                    <motion.button
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                      key={link.name}
                      onClick={() => handleNavClick(link.href)}
                      className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-foreground hover:text-primary transition-colors active:scale-95"
                    >
                      {link.name}
                    </motion.button>
                  ))}
                </nav>

                {/* CTA Button */}
                <motion.button
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + navLinks.length * 0.05, duration: 0.3 }}
                  onClick={() => handleNavClick("#contact")}
                  className="mt-8 sm:mt-10 px-8 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-base sm:text-lg font-medium active:scale-95"
                >
                  Let's Talk
                </motion.button>
              </div>

              {/* Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="pb-6 sm:pb-8 px-6"
              >
                <div className="flex items-center justify-center gap-2 text-foreground/40">
                  <Coffee className="w-4 h-4" />
                  <span className="text-xs tracking-wider uppercase">Crafted with passion</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
