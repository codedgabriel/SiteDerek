import { useQuery } from "@tanstack/react-query";
import { profileData, gamesData } from "@/lib/schema";
import type { Profile, Game } from "@/lib/schema";

export function useProfile() {
  return useQuery({
    queryKey: ["/api/profile"],
    queryFn: async () => profileData as Profile,
  });
}

export function useGames() {
  return useQuery({
    queryKey: ["/api/games"],
    queryFn: async () => gamesData as Game[],
  });
}
