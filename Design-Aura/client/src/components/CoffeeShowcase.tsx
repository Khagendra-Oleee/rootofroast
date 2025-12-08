import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import latteImg from "@assets/generated_images/latte_art_in_ceramic_cup.png";

const coffees = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    process: "Washed",
    notes: "Jasmine, Lemon, Bergamot",
    price: "$24.00",
    image: latteImg // Using placeholder for now, ideally specific images
  },
  {
    id: 2,
    name: "Colombia Huila",
    process: "Honey",
    notes: "Caramel, Red Apple, Citrus",
    price: "$22.00",
    image: latteImg
  },
  {
    id: 3,
    name: "Kenya AA",
    process: "Washed",
    notes: "Blackcurrant, Tomato, Grapefruit",
    price: "$26.00",
    image: latteImg
  }
];

export default function CoffeeShowcase() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="collection" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              Curated Selection
            </h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked from the finest micro-lots around the globe.
            </p>
          </div>
          <button className="hidden md:block text-primary hover:text-white transition-colors underline-offset-4 hover:underline mt-6 md:mt-0">
            View Full Catalog
          </button>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coffees.map((coffee, index) => (
            <motion.div
              key={coffee.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-6 bg-card">
                <img 
                  src={coffee.image} 
                  alt={coffee.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                
                {/* Floating details on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                  <button className="w-full py-3 bg-white text-black font-medium rounded-full hover:bg-primary hover:text-white transition-colors">
                    Add to Cart — {coffee.price}
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-primary text-xs uppercase tracking-wider font-medium">{coffee.process}</p>
                <h3 className="text-2xl font-serif text-white group-hover:text-primary transition-colors">{coffee.name}</h3>
                <p className="text-muted-foreground text-sm">{coffee.notes}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <button className="text-primary hover:text-white transition-colors underline-offset-4 hover:underline">
            View Full Catalog
          </button>
        </div>
      </div>
    </section>
  );
}
