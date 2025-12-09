import { useMemo } from "react";

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
}

export default function FloatingParticles({
  count = 8,
  colors = ["#D4A574", "#C67B48", "#8B5A2B"],
  minSize = 4,
  maxSize = 10
}: FloatingParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: Math.min(count, 10) }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: 20 + Math.random() * 15,
      delay: i * 2
    }));
  }, [count, colors, minSize, maxSize]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            opacity: 0.15,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
