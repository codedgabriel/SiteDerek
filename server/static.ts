import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");
  
  if (process.env.VERCEL) {
     // In Vercel, static files are handled by vercel.json rewrites
     // but we still need to serve images/assets if they are requested through the API path
     app.use(express.static(distPath));
     return;
  }

  if (!fs.existsSync(distPath)) {
    // Fallback for local dev if dist doesn't exist yet
    const clientPublicPath = path.resolve(__dirname, "..", "client", "public");
    if (fs.existsSync(clientPublicPath)) {
        app.use(express.static(clientPublicPath));
        return;
    }
    
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
