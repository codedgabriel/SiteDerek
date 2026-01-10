import {
  type Profile,
  type InsertProfile,
  type Game,
  type InsertGame,
  profileData,
  gamesData
} from "@shared/schema";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  getGames(): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
}

export class MemStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    return profileData as Profile;
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    throw new Error("Method not implemented.");
  }

  async getGames(): Promise<Game[]> {
    return gamesData as Game[];
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    throw new Error("Method not implemented.");
  }
}

export const storage = new MemStorage();
