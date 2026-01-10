# Layout-Inspirer

## Overview

A personal Discord-style profile page for "Ryzeks" (also known as Umbreon). This single-page web application displays a user profile with avatar, bio, Discord information, and a list of games the user plays. The design is inspired by krisendo.carrd.co with a dark red/black theme aesthetic.

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

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript using ESM modules
- **API Style**: Simple REST endpoints returning JSON
- **Server Entry**: `server/index.ts` handles HTTP server creation and middleware setup

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Schema Validation**: drizzle-zod for type-safe schema validation with Zod
- **Migrations**: Managed via `drizzle-kit push` command

### Database Schema
- **profile table**: Stores single user profile (name, subtext, about, Discord info, avatar/background URLs)
- **games table**: Stores list of games with title, imageUrl, and optional imagePath for local images

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
  storage.ts      # Database operations layer
  db.ts           # Database connection setup
  vite.ts         # Vite dev server integration
  static.ts       # Static file serving for production
shared/           # Shared code between client and server
  schema.ts       # Drizzle database schema
  routes.ts       # API route type definitions
```

### API Endpoints
- `GET /api/profile` - Returns the user profile data
- `GET /api/games` - Returns list of games

### Build System
- Development: `npm run dev` runs TSX with Vite middleware
- Production: `npm run build` uses esbuild for server and Vite for client
- Database: `npm run db:push` syncs schema to database

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI/Frontend Libraries
- **@radix-ui/***: Comprehensive set of accessible UI primitives (dialog, dropdown, tooltip, etc.)
- **embla-carousel-react**: Carousel component with autoplay plugin
- **framer-motion**: Animation library for React
- **lucide-react**: Icon library
- **react-icons**: Additional icon library (used for Discord icon)
- **cmdk**: Command menu component
- **vaul**: Drawer component
- **recharts**: Charting library (available but not currently used)

### Form & Validation
- **react-hook-form**: Form handling
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation library
- **zod-validation-error**: Better Zod error messages

### Styling
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx/tailwind-merge**: Class name utilities

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Runtime error display in development
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **@replit/vite-plugin-dev-banner**: Development environment banner