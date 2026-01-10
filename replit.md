# Ryzeks Profile

## Overview

A personal Discord-style profile page for "Ryzeks" (also known as Umbreon). This is a single-page web application that displays a user profile with avatar, bio, Discord information, and a list of games the user plays. The design is inspired by krisendo.carrd.co with a dark red and black theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom dark red/black theme
- **UI Components**: shadcn/ui component library (New York style)
- **Animations**: Framer Motion for smooth entry effects
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Style**: Simple REST endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL
- **Schema Location**: `shared/schema.ts`
- **Tables**:
  - `profile`: Single user profile (name, bio, Discord info, avatar/background URLs)
  - `games`: List of games with title and image URL
- **Migrations**: Managed via `drizzle-kit push`

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components (shadcn + custom)
    pages/        # Route pages
    hooks/        # Custom React hooks
    lib/          # Utilities
server/           # Express backend
  index.ts        # Server entry
  routes.ts       # API routes
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared code
  schema.ts       # Drizzle schema
  routes.ts       # API route definitions with Zod
```

### Key Design Decisions
1. **Monorepo structure**: Client and server in same repository with shared types
2. **Type-safe API**: Zod schemas validate API responses on both ends
3. **Database seeding**: Initial profile and games data seeded on first run
4. **CSS Variables**: Theme colors defined as CSS custom properties for easy customization

## External Dependencies

### Database
- PostgreSQL (via `DATABASE_URL` environment variable)
- Drizzle ORM for queries
- `connect-pg-simple` for session storage capability

### Frontend Libraries
- `@tanstack/react-query`: Server state management
- `framer-motion`: Animations
- `embla-carousel-react`: Carousel component
- `react-icons`: Icon library (Discord icon)
- Full shadcn/ui component suite via Radix primitives

### Development Tools
- Vite dev server with HMR
- esbuild for production server bundling
- TypeScript for type checking