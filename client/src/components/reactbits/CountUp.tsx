import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  className = "",
  suffix = "",
  prefix = ""
}: CountUpProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(from, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000
  });

  const display = useTransform(spring, (value) => Math.round(value));

  useEffect(() => {
    if (isInView) {
      spring.set(to);
    }
  }, [isInView, spring, to]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}
