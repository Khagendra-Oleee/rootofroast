import { motion } from "framer-motion";

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [-100, 100, -100],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px] mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -60, 0],
          x: [100, -100, 100],
          y: [50, -50, 50],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen"
      />
       <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-accent/30 rounded-full blur-[100px] mix-blend-screen"
      />
    </div>
  );
}
