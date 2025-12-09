import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";
import { Link, useLocation } from "wouter";
import { createPortal } from "react-dom";
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
    { name: "Machines", href: "#machines" },
    { name: "Philosophy", href: "#story" },
  ];

  // Mobile menu portal content
  const mobileMenuContent = isMobileMenuOpen ? createPortal(
    <div 
      id="mobile-menu-overlay"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1a1512',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleNavClick(link.href)}
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '28px',
              fontWeight: 500,
              color: '#e8dfd0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c9944a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#e8dfd0'}
          >
            {link.name}
          </button>
        ))}
      </nav>

      {/* CTA Button */}
      <button
        onClick={() => handleNavClick("#contact")}
        style={{
          marginTop: '40px',
          padding: '12px 32px',
          borderRadius: '9999px',
          border: '2px solid #c9944a',
          color: '#c9944a',
          backgroundColor: 'transparent',
          fontSize: '16px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#c9944a';
          e.currentTarget.style.color = '#1a1512';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#c9944a';
        }}
      >
        Let's Talk
      </button>

      {/* Footer */}
      <div 
        style={{ 
          position: 'absolute',
          bottom: '32px',
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#8a7a68',
        }}
      >
        <Coffee style={{ width: '16px', height: '16px' }} />
        <span style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Crafted with passion
        </span>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled 
            ? "py-3 md:py-4 bg-background/80 backdrop-blur-md border-b border-white/5" 
            : "py-4 md:py-8 bg-transparent"
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-serif font-bold tracking-tighter text-foreground cursor-pointer">
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
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: '#e8dfd0', position: 'relative', zIndex: 10000 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {mobileMenuContent}
    </>
  );
}
