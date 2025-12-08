import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ShinyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ShinyButton({
  children,
  onClick,
  className = ""
}: ShinyButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden px-8 py-4 rounded-full font-medium bg-gradient-to-r from-[#D4A574] to-[#C67B48] text-[#1a1410] group ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#C67B48] to-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
}
