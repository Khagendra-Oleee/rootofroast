import { motion } from "framer-motion";

interface LightPillarsProps {
  count?: number;
  colors?: string[];
  className?: string;
}

export default function LightPillars({
  count = 5,
  colors = ["rgba(212, 165, 116, 0.08)", "rgba(198, 123, 72, 0.06)", "rgba(139, 90, 43, 0.05)"],
  className = ""
}: LightPillarsProps) {
  const pillars = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i + 1) * (100 / (count + 1))}%`,
    width: Math.random() * 80 + 40,
    delay: i * 0.5,
    duration: Math.random() * 4 + 6,
    color: colors[i % colors.length],
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {pillars.map((pillar) => (
        <motion.div
          key={pillar.id}
          className="absolute top-0 h-full"
          style={{
            left: pillar.left,
            width: `${pillar.width}px`,
            transform: "translateX(-50%)",
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scaleY: [0, 1, 1, 0],
          }}
          transition={{
            duration: pillar.duration,
            delay: pillar.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
        >
          {/* Main pillar glow */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, 
                transparent 0%, 
                ${pillar.color} 15%, 
                ${pillar.color} 50%, 
                ${pillar.color} 85%, 
                transparent 100%)`,
              filter: "blur(20px)",
            }}
          />
          
          {/* Core bright line */}
          <motion.div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{
              background: `linear-gradient(180deg, 
                transparent 0%, 
                ${pillar.color.replace(/[\d.]+\)$/, "0.3)")} 20%, 
                ${pillar.color.replace(/[\d.]+\)$/, "0.5)")} 50%, 
                ${pillar.color.replace(/[\d.]+\)$/, "0.3)")} 80%, 
                transparent 100%)`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute left-0 right-0 h-32"
            style={{
              background: `linear-gradient(180deg, 
                transparent 0%, 
                ${pillar.color.replace(/[\d.]+\)$/, "0.4)")} 50%, 
                transparent 100%)`,
              filter: "blur(10px)",
            }}
            animate={{
              top: ["-10%", "110%"],
            }}
            transition={{
              duration: pillar.duration * 0.8,
              delay: pillar.delay + 1,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      {/* Ambient glow at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${colors[0]}, transparent)`,
        }}
      />
    </div>
  );
}
