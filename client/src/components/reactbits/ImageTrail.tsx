import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";

interface ImageTrailProps {
  images: string[];
  children: React.ReactNode;
  className?: string;
}

export default function ImageTrail({
  images,
  children,
  className = ""
}: ImageTrailProps) {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number; img: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const imageIndexRef = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distance = Math.sqrt(
      Math.pow(x - lastPositionRef.current.x, 2) +
      Math.pow(y - lastPositionRef.current.y, 2)
    );

    if (distance > 80) {
      lastPositionRef.current = { x, y };
      const newId = idRef.current++;
      const img = images[imageIndexRef.current % images.length];
      imageIndexRef.current++;

      setTrail((prev) => [...prev.slice(-5), { id: newId, x, y, img }]);

      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== newId));
      }, 1000);
    }
  }, [images]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            className="absolute pointer-events-none w-24 h-32 rounded-lg overflow-hidden shadow-2xl"
            style={{
              left: item.x - 48,
              top: item.y - 64,
              zIndex: 50
            }}
            initial={{ opacity: 0, scale: 0.5, rotate: Math.random() * 20 - 10 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.img}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
}
