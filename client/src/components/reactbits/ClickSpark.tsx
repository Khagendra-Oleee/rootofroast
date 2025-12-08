import { useEffect, useRef } from "react";

interface ClickSparkProps {
  children: React.ReactNode;
  sparkColor?: string;
  sparkCount?: number;
  sparkSize?: number;
}

export default function ClickSpark({
  children,
  sparkColor = "#D4A574",
  sparkCount = 8,
  sparkSize = 10
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement("div");
        spark.className = "spark-particle";
        spark.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          width: ${sparkSize}px;
          height: ${sparkSize}px;
          background: ${sparkColor};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
        `;

        container.appendChild(spark);

        const angle = (i / sparkCount) * 360;
        const velocity = 50 + Math.random() * 50;
        const targetX = Math.cos((angle * Math.PI) / 180) * velocity;
        const targetY = Math.sin((angle * Math.PI) / 180) * velocity;

        spark.animate(
          [
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            { transform: `translate(${targetX}px, ${targetY}px) scale(0)`, opacity: 0 }
          ],
          {
            duration: 600,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)"
          }
        ).onfinish = () => spark.remove();
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [sparkColor, sparkCount, sparkSize]);

  return (
    <div ref={containerRef} className="relative" style={{ position: "relative" }}>
      {children}
    </div>
  );
}
