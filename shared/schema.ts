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

export const insertProfileSchema = createInsertSchema(profile);
export const insertGameSchema = createInsertSchema(games);

export type Profile = typeof profile.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;
