import { motion } from "framer-motion";
import { User, MessageSquare } from "lucide-react";
import type { Profile } from "@shared/schema";

interface DiscordCardProps {
  profile: Profile;
}

export function DiscordCard({ profile }: DiscordCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full bg-[#111] rounded-xl overflow-hidden border border-[#222] shadow-2xl shadow-black/50 relative group"
    >
      {/* Banner */}
      <div className="h-24 bg-gradient-to-r from-[#8B0000] to-[#400000] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="px-5 pb-5 relative">
        {/* Avatar */}
        <div className="absolute -top-10 left-5">
          <div className="w-20 h-20 rounded-full border-[6px] border-[#111] bg-black overflow-hidden relative">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.discordName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#333] flex items-center justify-center">
                <User className="w-8 h-8 text-white/50" />
              </div>
            )}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-[#111]" />
          </div>
        </div>

        {/* Content */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white font-display">{profile.discordName}</h3>
              <p className="text-xs text-white/40 font-mono tracking-wide mt-0.5">{profile.discordId}</p>
            </div>
            
            <a 
              href={`https://discord.com/users/${profile.discordId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white p-2 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-4 border-t border-white/5 pt-4">
            <h4 className="text-[10px] uppercase font-bold text-white/30 mb-2 tracking-wider">About Me</h4>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              {profile.discordAbout}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
