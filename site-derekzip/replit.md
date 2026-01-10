# Layout-Inspirer

## Overview

A personal Discord-style profile page for "Ryzeks" (also known as Umbreon). This single-page web application displays a user profile with avatar, bio, Discord information, and a carousel showcase of games the user plays. The design features a dark red/black theme inspired by Discord's aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with custom dark red/black theme using CSS variables
- **UI Components**: shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth entry effects and transitions
- **Build Tool**: Vite with React plugin
- **Carousel**: Embla Carousel with autoplay for game showcase
- **Fonts**: Space Grotesk (display) and Outfit (body)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript using ESM modules
- **API Style**: Simple REST endpoints returning JSON
- **Server Entry**: `server/index.ts` handles HTTP server creation and middleware setup
- **Development**: Vite dev server with HMR for frontend, tsx for backend

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Schema Validation**: drizzle-zod for type-safe schema validation with Zod
- **Migrations**: Managed via `drizzle-kit push` command

### Database Schema
- **profile table**: Stores single user profile (id, name, subtext, about, discordName, discordAbout, discordId, avatarUrl, backgroundUrl)
- **games table**: Stores list of games (id, title, imageUrl, imagePath for local images)

### API Endpoints
- `GET /api/profile` - Returns the user profile
- `GET /api/games` - Returns list of games

### Project Structure
```
client/           # React frontend application
  src/
    components/   # UI components (shadcn + custom profile components)
    pages/        # Route pages (Home, NotFound)
    hooks/        # Custom React hooks (use-profile, use-toast, use-mobile)
    lib/          # Utilities (queryClient, utils)
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared code between frontend and backend
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod schemas
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database operations and schema management

### UI Libraries
- **Radix UI**: Headless UI primitives (dialog, tooltip, avatar, etc.)
- **shadcn/ui**: Pre-built component library built on Radix
- **Lucide React**: Icon library
- **react-icons**: Additional icons (Discord icon via `react-icons/si`)

### Animation & Carousel
- **Framer Motion**: Animation library for page transitions and effects
- **Embla Carousel**: Carousel/slider functionality with autoplay plugin

### Development Tools
- **Vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **drizzle-kit**: Database migration tool