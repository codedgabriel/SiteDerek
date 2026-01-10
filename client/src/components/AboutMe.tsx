import { motion } from "framer-motion";
import type { Profile } from "@shared/schema";

interface AboutMeProps {
  profile: Profile;
}

export function AboutMe({ profile }: AboutMeProps) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      className="relative group w-full"
    >
      {/* Decorative gradient background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-primary/10 to-primary/40 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
      
      <div className="relative bg-[#0a0a0a]/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden ring-1 ring-white/10">
        {/* Animated corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-primary/20 transition-colors duration-700"></div>
        
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/50"></div>
            <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase">About Me</span>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-primary/50 to-transparent"></div>
          </div>

          <div className="relative">
            {/* Elegant Quotation Marks */}
            <span className="absolute -top-6 -left-4 text-primary/20 text-7xl font-serif select-none">“</span>
            
            <p className="text-white/80 leading-relaxed font-light text-lg md:text-xl relative z-10 pl-4 border-l-2 border-primary/30 py-1">
              {profile.about}
            </p>
            
            <span className="absolute -bottom-10 -right-4 text-primary/20 text-7xl font-serif select-none rotate-180">“</span>
          </div>

          {/* Bottom stats/details placeholder if needed, or just a subtle divider */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-primary/20"></div>
              <div className="w-2 h-2 rounded-full bg-primary/10"></div>
            </div>
            <span className="text-[9px] text-white/30 tracking-widest uppercase font-medium">Digital Identity</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
