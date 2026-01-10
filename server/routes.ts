import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.profile.get.path, async (req, res) => {
    try {
      const profile = await storage.getProfile();
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: error.message || 'Error fetching profile' });
    }
  });

  app.get(api.games.list.path, async (req, res) => {
    try {
      const games = await storage.getGames();
      res.json(games);
    } catch (error: any) {
      console.error("Error fetching games:", error);
      res.status(500).json({ message: error.message || 'Error fetching games' });
    }
  });

  // Seed data if empty (disabled for static data)
  // await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.createProfile({
      name: "Ryzeks",
      subtext: "Discord Profile • Digital Identity",
      about: "Eu sou Ryzeks, também conhecido como Umbreon.\n\nSou um 3D Programmer & Artist, com cerca de 3 anos de experiência, sempre buscando evoluir tanto no lado técnico quanto criativo. Prezo muito por ser leal, honesto e confiável em tudo o que faço.",
      discordName: "Ryzeks",
      discordAbout: "Experienced 3D Programmer & Artist (3 Years)\nLoyal, honest and trustworthy\nCall Me Umbreon\n•—19/1/21—•",
      discordId: "Ryzeks",
      // Using placeholders since actual images weren't provided in the file list
      avatarUrl: "/images/avatar.png",
      backgroundUrl: "https://placehold.co/1920x1080/1a0505/8B0000" 
    });
  }

  const existingGames = await storage.getGames();
  if (existingGames.length <= 3) {
    // Clear and re-seed with full list
    // Note: in a real app we'd handle this more gracefully, but for this task we want to ensure the list is updated
    const newGames = [
      { title: "Lethal Company", path: "/images/games/lethal-company.jpg" },
      { title: "Roblox", path: "/images/games/roblox.jpg" },
      { title: "Dark Souls", path: "/images/games/dark-souls.png" },
      { title: "The Forest", path: "/images/games/the-forest.jpg" },
      { title: "Poppy Playtime", path: "/images/games/poppy-playtime.jpeg" },
      { title: "Dead by Daylight", path: "/images/games/dead-by-daylight.png" },
      { title: "Elden Ring", path: "/images/games/elder-ring.jpg" },
      { title: "Sons of the Forest", path: "/images/games/sons-of-the-forest.jpeg" },
      { title: "Minecraft", path: "/images/games/minecraft.png" }
    ];

    for (const game of newGames) {
      const exists = existingGames.find(g => g.title === game.title);
      if (!exists) {
        await storage.createGame({
          title: game.title,
          imageUrl: `https://placehold.co/300x450/1a0505/8B0000?text=${encodeURIComponent(game.title)}`,
          imagePath: game.path
        });
      }
    }
  }
}
