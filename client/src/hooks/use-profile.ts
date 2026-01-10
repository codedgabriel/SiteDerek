import { useQuery } from "@tanstack/react-query";
import { profileData, gamesData } from "@shared/schema";
import type { Profile, Game } from "@shared/schema";

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
