import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import TiltCard from "./TiltCard";
import doppioImg from "@assets/stock_images/doppio_double_espres_9edb1646.jpg";
import coldBrewImg from "@assets/stock_images/cold_brew_coffee_gla_6a71ee3b.jpg";
import caffeLatteImg from "@assets/stock_images/caffe_latte_coffee_w_c6ee55c7.jpg";
import espressoImg from "@assets/stock_images/espresso_machine_por_6d4bd314.jpg";
import cappuccinoImg from "@assets/stock_images/cappuccino_foam_art__3d050b10.jpg";
import BlurText from "./BlurText";

const coffees = [
  {
    id: "espresso",
    name: "Espresso",
    desc: "A concentrated form of coffee served in small, strong shots.",
    img: espressoImg,
    intensity: "High"
  },
  {
    id: "latte",
    name: "Cappuccino",
    desc: "Espresso based drink with steamed milk foam art.",
    img: cappuccinoImg,
    intensity: "Medium"
  },
  {
    id: "caffelatte",
    name: "Caffee Latte",
    desc: "Smooth espresso with steamed milk, perfect for any time of day.",
    img: caffeLatteImg,
    intensity: "Light"
  },
  {
    id: "coldbrew",
    name: "Cold Brew",
    desc: "Steeped for 12+ hours for a smooth, low-acid profile.",
    img: coldBrewImg,
    intensity: "Medium"
  },
  {
    id: "doppio",
    name: "Doppio",
    desc: "Double shot of espresso for an intense, bold coffee experience.",
    img: doppioImg,
    intensity: "High"
  }
];

export default function CoffeeTypes() {
  const [activeId, setActiveId] = useState(coffees[0].id);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.2 });

  const activeCoffee = coffees.find(c => c.id === activeId);

  return (
    <section className="py-32 bg-background relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="text-primary text-sm tracking-widest uppercase mb-4 block">The Menu</span>
          <BlurText 
             text="Signature Brews" 
             className="text-5xl md:text-7xl font-serif text-white"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* List Selection */}
          <div className="w-full lg:w-1/3 space-y-2">
            {coffees.map((coffee, i) => (
              <motion.div
                key={coffee.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveId(coffee.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border ${
                  activeId === coffee.id 
                    ? "bg-white/10 border-primary/50" 
                    : "bg-transparent border-transparent hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-2xl font-serif ${activeId === coffee.id ? "text-primary" : "text-white"}`}>
                    {coffee.name}
                  </h3>
                  {activeId === coffee.id && (
                    <motion.div layoutId="active-indicator">
                      <ChevronRight className="text-primary" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual Showcase */}
          <div className="w-full lg:w-2/3 h-[500px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <TiltCard className="w-full h-full">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <img 
                      src={activeCoffee?.img} 
                      alt={activeCoffee?.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-10 left-10 max-w-md">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="px-3 py-1 bg-primary text-black text-xs font-bold rounded-full uppercase tracking-wider mb-4 inline-block">
                          {activeCoffee?.intensity} Intensity
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">{activeCoffee?.name}</h2>
                        <p className="text-white/80 text-lg">{activeCoffee?.desc}</p>
                      </motion.div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
