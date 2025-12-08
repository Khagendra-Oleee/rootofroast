import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GradientTextProps {
  text: string;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export default function GradientText({
  text,
  className = "",
  from = "from-[#D4A574]",
  via = "via-[#C67B48]",
  to = "to-[#8B5A2B]",
  animate = true
}: GradientTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent ${animate ? 'animate-gradient' : ''} ${className}`}
      style={{
        backgroundSize: animate ? "200% 200%" : "100% 100%"
      }}
    >
      {text}
    </motion.span>
  );
}
