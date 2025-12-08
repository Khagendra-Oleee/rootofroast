import { motion } from "framer-motion";

export default function BlurText({
  text = "",
  delay = 0,
  className = "",
  animateBy = "words", // 'words' or 'letters'
  direction = "top", // 'top' or 'bottom'
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "easeOut",
  onAnimationComplete,
}: {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: any;
  animationTo?: any;
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | "anticipate";
  onAnimationComplete?: () => void;
}) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");

  const defaultFrom =
    direction === "top"
      ? { filter: "blur(10px)", opacity: 0, transform: "translate3d(0,-50px,0)" }
      : { filter: "blur(10px)", opacity: 0, transform: "translate3d(0,50px,0)" };

  const defaultTo = [
    {
      filter: "blur(5px)",
      opacity: 0.5,
      transform: direction === "top" ? "translate3d(0,5px,0)" : "translate3d(0,-5px,0)",
    },
    { filter: "blur(0px)", opacity: 1, transform: "translate3d(0,0,0)" },
  ];

  return (
    <p className={className}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={animationFrom || defaultFrom}
          whileInView={animationTo || defaultTo}
          viewport={{ once: true, amount: threshold, margin: rootMargin }}
          transition={{
            duration: 0.8,
            ease: easing,
            delay: delay + index * 0.1,
          }}
          className="inline-block"
          style={{ whiteSpace: "pre-wrap" }} // Preserve spaces
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
        >
          {element === " " ? "\u00A0" : element}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </p>
  );
}
