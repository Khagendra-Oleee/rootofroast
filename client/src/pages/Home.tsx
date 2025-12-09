import { useEffect } from "react";
import Lenis from "lenis";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import CaseStudies from "../components/CaseStudies";
import OriginMap from "../components/OriginMap";
import BrewingGuide from "../components/BrewingGuide";
import MachinesPreview from "../components/MachinesPreview";
import CoffeeTypes from "../components/CoffeeTypes";
import CoffeeCulture from "../components/CoffeeCulture";
import Contact from "../components/Contact";
import LiquidBackground from "../components/LiquidBackground";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <LiquidBackground />
      <Navigation />
      <Hero />
      <CoffeeTypes />
      <CaseStudies />
      <OriginMap />
      <BrewingGuide />
      <MachinesPreview />
      <CoffeeCulture />
      <Contact />
    </div>
  );
}
