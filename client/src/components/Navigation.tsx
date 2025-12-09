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
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 lg:hidden"
          style={{ 
            zIndex: 45,
            backgroundColor: 'hsl(20, 25%, 8%)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'fixed'
          }}
        >
          {/* Mobile Menu Content */}
          <div 
            className="flex flex-col items-center justify-center"
            style={{ 
              height: '100vh',
              width: '100%',
              paddingTop: '80px',
              paddingBottom: '40px'
            }}
          >
            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="font-serif font-medium hover:text-primary transition-colors"
                  style={{ 
                    fontSize: '28px',
                    color: 'hsl(38, 30%, 88%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 16px'
                  }}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="mt-10 px-8 py-3 rounded-full font-medium transition-all duration-300"
              style={{
                border: '2px solid hsl(30, 50%, 55%)',
                color: 'hsl(30, 50%, 55%)',
                backgroundColor: 'transparent',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Let's Talk
            </button>

            {/* Footer */}
            <div 
              className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2"
              style={{ color: 'hsl(38, 30%, 50%)' }}
            >
              <Coffee className="w-4 h-4" />
              <span className="text-xs tracking-wider uppercase">Crafted with passion</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
