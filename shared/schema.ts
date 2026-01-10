import { sql } from "drizzle-orm";
import { pgTable, text, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subtext: text("subtext").notNull(),
  about: text("about").notNull(),
  discordName: text("discord_name").notNull(),
  discordAbout: text("discord_about").notNull(),
  discordId: text("discord_id").notNull(),
  avatarUrl: text("avatar_url"),
  backgroundUrl: text("background_url"),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  imagePath: text("image_path"), // Para facilitar o uso de imagens locais
});

export const profileData = {
  id: 1,
  name: "Ryzeks",
  subtext: "Discord Profile • Digital Identity",
  about: "Eu sou Ryzeks, também conhecido como Umbreon.\n\nSou um 3D Programmer & Artist, com cerca de 3 anos de experiência, sempre buscando evoluir tanto no lado técnico quanto criativo. Prezo muito por ser leal, honesto e confiável em tudo o que faço.",
  discordName: "Ryzeks",
  discordAbout: "Experienced 3D Programmer & Artist (3 Years)\nLoyal, honest and trustworthy\nCall Me Umbreon\n•—19/1/21—•",
  discordId: "Ryzeks",
  avatarUrl: "/images/avatar.png",
  backgroundUrl: "https://placehold.co/1920x1080/1a0505/8B0000"
};

export const gamesData = [
  { id: 1, title: "Lethal Company", imageUrl: "https://placehold.co/300x450/1a0505/8B0000?text=Lethal%20Company", imagePath: "/images/games/lethal-company.jpg" },
  { id: 2, title: "Roblox", imageUrl: "https://placehold.co/300x450/1a0505/8B0000?text=Roblox", imagePath: "/images/games/roblox.jpg" },
  { id: 3, title: "Dark Souls", imageUrl: "https://placehold.co/300x450/1a0505/8B0000?text=Dark%20Souls", imagePath: "/images/games/dark-souls.png" },
  { id: 4, title: "The Forest", imageUrl: "https://placehold.co/300x450/1a0505/8B0000?text=The%20Forest", imagePath: "/images/games/the-forest.jpg" },
  { id: 5, title: "Poppy Playtime", imageUrl: "https://placehold.co/300x450/1a0505/8B0000?text=Poppy%20Playtime", imagePath: "/images/games/poppy-playtime.jpeg" },
  { id: 6, title: "Dead by Daylight", imageUrl: "https://placehold.co/300x450/1a0505/8B0000?text=Dead%20by%20Daylight", imagePath: "/images/games/dead-by-daylight.png" },
  { id: 7, title: "Elden Ring", imageUrl: "https://placehold.co/300x450/1a0505/8B0000?text=Elden%20Ring", imagePath: "/images/games/elder-ring.jpg" },
  { id: 8, title: "Sons of the Forest", imageUrl: "https://placehold.co/300x450/1a0505/8B0000?text=Sons%20of%20the%20Forest", imagePath: "/images/games/sons-of-the-forest.jpeg" },
  { id: 9, title: "Minecraft", imageUrl: "https://placehold.co/300x450/1a0505/8B0000?text=Minecraft", imagePath: "/images/games/minecraft.png" }
];

export const insertProfileSchema = createInsertSchema(profile);
export const insertGameSchema = createInsertSchema(games);

export type Profile = typeof profile.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;
