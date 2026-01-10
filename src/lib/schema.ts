import { z } from "zod";

export const profileData = {
  id: 1,
  name: "Ryzeks",
  subtext: "Discord Profile • Digital Identity",
  about: "Opa, Me chamo Ryzeks, também conhecido como Umbreon. Sou um Programador 3D & Artista, com 3 anos de experiência, Estou sempre buscando evoluir tanto minhas abilidades técnicas quanto as criativas. Prezo muito por ser leal, honesto e confiável em tudo que faço.",
  discordName: "™‧₊☽ʀʏᴢᴇᴋs☾₊‧™",
  discordAbout: "Experienced 3D Programmer & Artist (3 Years)\n\nLoyal, honest and trustworthy \n\nCall Me Umbreon\n•—19/1/21—•",
  discordId: "ryzekss",
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

export type Profile = typeof profileData;
export type Game = (typeof gamesData)[0];
