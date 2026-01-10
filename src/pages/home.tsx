import React, { useState, useRef } from "react";
import { profileData, gamesData } from "@/lib/schema";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SiDiscord } from "react-icons/si";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const BackgroundGlow = () => (
  <motion.div 
    animate={{ 
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.1, 1]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,_#450a0a_0%,_transparent_50%)] pointer-events-none" 
  />
);

const HeroSection = ({ profile }: { profile: typeof profileData }) => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "circOut" }}
    className="flex flex-col items-center text-center gap-4 relative z-10"
  >
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-4 bg-red-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
      <Avatar className="w-32 h-32 border-4 border-red-900/40 shadow-[0_0_50px_rgba(153,27,27,0.2)] transition-all duration-500 group-hover:border-red-600/60 group-hover:shadow-[0_0_70px_rgba(153,27,27,0.4)]">
        <AvatarImage src={profile.avatarUrl} className="object-cover" />
        <AvatarFallback className="bg-red-950 text-red-100 text-4xl font-black">R</AvatarFallback>
      </Avatar>
    </motion.div>
    <div className="space-y-1">
      <motion.h1 
        initial={{ letterSpacing: "0.1em", opacity: 0 }}
        animate={{ letterSpacing: "-0.05em", opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic drop-shadow-2xl"
      >
        {profile.name}
      </motion.h1>
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center justify-center gap-3"
      >
        <div className="h-[1px] w-24 bg-red-900/50"></div>
        <div className="h-[1px] w-24 bg-red-900/50"></div>
      </motion.div>
    </div>
  </motion.section>
);

const AboutSection = ({ about }: { about: string }) => (
  <motion.section 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="w-full relative z-10"
  >
    <div className="flex flex-col gap-4 group">
      <div className="flex items-center gap-3">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600/80 group-hover:text-red-500 transition-colors">Sobre mim</span>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "auto" }}
          className="h-[1px] flex-grow bg-gradient-to-r from-red-900/40 to-transparent"
        />
      </div>
      <p className="text-zinc-300 leading-relaxed text-base font-light italic pl-4 border-l border-red-800/50 transition-all duration-300">
        {about}
      </p>
    </div>
  </motion.section>
);

const GameCarousel = ({ games }: { games: typeof gamesData }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      dragFree: true,
      containScroll: false,
      align: "center"
    }, 
    [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col gap-6 z-10 my-8"
    >
      <div className="max-w-xl mx-auto w-full px-6 flex items-center gap-4 group">
        <h2 className="text-[9px] uppercase tracking-[0.4em] text-red-700 font-black whitespace-nowrap transition-colors group-hover:text-red-500">
          Jogos favoritos
        </h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          className="h-[1px] w-full bg-red-900/20 origin-left"
        />
      </div>
      
      <div className="relative w-full group overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[20%] bg-gradient-to-r from-[#0a0000] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[20%] bg-gradient-to-l from-[#0a0000] to-transparent z-10 pointer-events-none" />
        
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {games?.map((game, idx) => (
              <div 
                key={`${game.id}-${idx}`} 
                className="flex-[0_0_220px] min-w-0 px-3"
              >
                <div 
                  className="group/item relative aspect-[2/3] rounded-xl overflow-hidden border border-red-900/20 transition-all duration-500 hover:border-red-600/50 shadow-2xl"
                >
                  <img 
                    src={game.imagePath || game.imageUrl} 
                    alt={game.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover/item:opacity-40 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover/item:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-black text-sm uppercase tracking-tight line-clamp-2 drop-shadow-lg">
                      {game.title}
                    </h3>
                    <div className="w-6 h-0.5 bg-red-600 mt-1.5 rounded-full transform origin-left scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const DiscordCard = ({ profile }: { profile: typeof profileData }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full relative z-10"
      style={ { perspective: "1000px" } }
    >
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={ {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        } }
        className="h-full cursor-grab active:cursor-grabbing"
      >
        <Card className="bg-[#0f0f11] border-red-900/20 overflow-hidden relative group rounded-2xl shadow-2xl hover:border-red-600/30 transition-colors duration-500" style={ { transform: "translateZ(50px)" } }>
          <div className="h-24 bg-red-900/10 relative overflow-hidden" style={ { transform: "translateZ(25px)" } }>
             <motion.div 
               animate={{ opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(153,27,27,0.2),_transparent)]" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] to-transparent" />
          </div>
          <CardContent className="p-6 pt-0 relative" style={ { transform: "translateZ(75px)" } }>
            <div className="relative -top-12 flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <motion.div whileHover={{ rotate: 3 }} className="relative">
                  <Avatar className="w-24 h-24 border-[6px] border-[#0f0f11] rounded-full shadow-2xl">
                    <AvatarImage src={profile.avatarUrl} className="object-cover" />
                    <AvatarFallback className="bg-red-950 text-red-100 text-2xl font-black">R</AvatarFallback>
                  </Avatar>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-[4px] border-[#0f0f11] rounded-full shadow-xl" 
                  />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <SiDiscord className="w-8 h-8 text-red-600/20 group-hover:text-red-600/50 transition-colors mb-2" />
                </motion.div>
              </div>
              
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight italic group-hover:text-red-500 transition-colors">
                    {profile.discordName}
                  </h3>
                </div>
                <p className="text-[10px] text-red-600 font-mono tracking-widest uppercase font-bold opacity-60">
                  ID: {profile.discordId}
                </p>
              </div>

              <div className="h-[1px] bg-red-900/10" />

              <div className="space-y-3">
                <p className="text-zinc-400 font-sans leading-relaxed text-xs group-hover:text-zinc-300 transition-colors whitespace-pre-line">
                  {profile.discordAbout}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
};

const LoadingScreen = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="fixed inset-0 z-[100] bg-[#0a0000] flex flex-col items-center justify-center"
  >
    <div className="relative w-24 h-24">
      {/* Camada externa - Hexágono rotativo */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-[3px] border-red-900/30 rounded-[30%] shadow-[0_0_40px_rgba(153,27,27,0.1)]"
      />
      
      {/* Camada média - Quadrado pulsante */}
      <motion.div 
        animate={{ 
          rotate: [45, 225, 45],
          scale: [0.8, 1, 0.8],
          borderRadius: ["20%", "50%", "20%"]
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-2 border-2 border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
      />
      
      {/* Núcleo - Círculo de energia */}
      <motion.div 
        animate={{ 
          scale: [0.5, 0.8, 0.5],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-6 bg-red-600 rounded-full blur-[2px] shadow-[0_0_30px_#dc2626]"
      />

      {/* Brilho ambiental */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -inset-10 bg-red-600/10 blur-3xl rounded-full"
      />
    </div>
  </motion.div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const profile = profileData;
  const games = gamesData;

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0000] text-zinc-100 flex flex-col items-center selection:bg-red-500/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center"
          >
            <BackgroundGlow />
            <div className="max-w-xl w-full px-6 py-12 flex flex-col items-center gap-10 relative">
              <HeroSection profile={profile} />
              <AboutSection about={profile.about} />
            </div>

            <GameCarousel games={games} />

            <div className="max-w-xl w-full px-6 pb-12 flex flex-col items-center gap-10 relative">
              <DiscordCard profile={profile} />

              <footer className="flex flex-col items-center gap-3 py-6 opacity-30 group">
                <motion.div 
                  whileHover={{ width: 120 }}
                  className="h-[1px] w-16 bg-red-900/50 transition-all duration-700"
                ></motion.div>
                <p className="text-zinc-500 text-[8px] uppercase tracking-[0.6em] font-black italic">
                  Ryzeks // 2026
                </p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
