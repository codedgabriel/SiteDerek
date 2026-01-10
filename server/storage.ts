import { db } from "./db";
import {
  profile,
  games,
  type Profile,
  type InsertProfile,
  type Game,
  type InsertGame
} from "@shared/schema";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  getGames(): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [result] = await db.select().from(profile);
    return result;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [result] = await db.insert(profile).values(insertProfile).returning();
    return result;
  }

  async getGames(): Promise<Game[]> {
    return await db.select().from(games);
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const [result] = await db.insert(games).values(insertGame).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
