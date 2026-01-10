import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import type { Game } from "@/lib/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import { type CarouselApi } from "@/components/ui/carousel";

interface GameListProps {
  games: Game[];
}

export function GameList({ games }: GameListProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "center",
          loop: true,
          skipSnaps: false
        }}
      >
        <CarouselContent className="flex items-center h-[500px]">
          {games.map((game, index) => {
            const isSelected = current === index;
            return (
              <CarouselItem key={`${game.id}-${index}`} className="basis-[70%] sm:basis-1/3 transition-all duration-700 px-3">
                <motion.div
                  animate={{ 
                    scale: isSelected ? 1.5 : 0.7,
                    zIndex: isSelected ? 50 : 1,
                    filter: isSelected ? "brightness(1.2) contrast(1.1)" : "brightness(1) contrast(1)",
                  }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  className="relative group cursor-default"
                >
                  <div className={`aspect-[2/3] rounded-[2rem] overflow-hidden border-4 ${isSelected ? 'border-primary shadow-[0_0_80px_rgba(139,0,0,0.9)]' : 'border-white/5'} transition-all duration-700 relative`}>
                    {(game.imagePath || game.imageUrl) ? (
                      <img 
                        src={`${game.imagePath || game.imageUrl}?v=${Date.now()}`} 
                        alt={game.title} 
                        className="w-full h-full object-cover" 
                        loading="eager"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                        <Gamepad2 className="w-16 h-16 text-white/20" />
                      </div>
                    )}
                    
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent flex flex-col justify-end p-6 transition-opacity duration-700 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                      <h4 className="text-white font-black text-sm sm:text-base text-center uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {game.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
