# Design-Aura - Coffee Portfolio Website

## Overview

Design-Aura is a premium coffee portfolio website titled "Roots of Roast" that serves as a digital museum experience for coffee culture. The project showcases coffee as an art form through immersive storytelling, sophisticated animations, and elegant design. Built as a full-stack application with React/Vite frontend and Express backend, it emphasizes visual aesthetics, smooth interactions, and a warm, handcrafted feel that avoids AI-generated appearance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing instead of React Router

**UI Component Strategy**
- shadcn/ui component library (New York style variant) with Radix UI primitives for accessible, unstyled base components
- Tailwind CSS v4 for utility-first styling with custom coffee-inspired color palette
- CSS variables for theming with dark mode support built-in
- Custom component path aliases (@/components, @/lib, etc.) for clean imports

**Animation Philosophy**
- Framer Motion for declarative animations and gesture handling
- GSAP with ScrollTrigger for complex scroll-based animations
- Lenis for smooth scroll experience with custom easing
- Focus on performance with GPU-accelerated transforms and careful use of blur effects
- Animation patterns: parallax effects, reveal on scroll, magnetic hover interactions, 3D tilt cards, liquid morphing backgrounds

**State Management**
- TanStack Query (React Query) for server state management
- Local component state with React hooks for UI state
- No global state management library - keeping state close to components

**Page Structure**
- Home: Landing page with hero, menu showcase, case studies, origin map, brewing guide, culture section, and contact
- Sourcing: Detail page for coffee origins (Ethiopia, Nepal, Colombia)
- Space: Cafe design and ambience showcase
- Craft: Espresso extraction technical study
- AnimatePresence for smooth page transitions with blur effects

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- Node.js HTTP server with middleware-based architecture
- Custom request logging with timestamps and performance metrics
- JSON body parsing with raw body access for webhook verification

**Development vs Production**
- Development: Vite dev server with HMR middleware integration
- Production: Static file serving from pre-built dist/public directory
- SPA fallback to index.html for client-side routing support

**API Design**
- RESTful API pattern with /api prefix for all backend routes
- Storage abstraction layer for CRUD operations
- Currently implements in-memory storage (MemStorage) with user management
- Designed for easy swapping to database-backed storage

### Data Storage Solutions

**Database Configuration**
- Drizzle ORM configured for PostgreSQL dialect
- Schema defined in shared/schema.ts for type sharing between client/server
- Drizzle Zod integration for runtime validation matching database schema
- Migration files stored in ./migrations directory

**Current Schema**
- Users table with UUID primary keys, username (unique), and password fields
- Extensible design allows adding coffee-related entities (beans, origins, brews, etc.)

**Storage Interface**
- IStorage interface defines CRUD contract
- MemStorage provides in-memory implementation for development
- Production should implement PostgreSQL-backed storage using Drizzle queries

**Session Management**
- connect-pg-simple for PostgreSQL-backed sessions (configured but not actively used)
- Session storage ready for authentication implementation

### External Dependencies

**UI & Animation Libraries**
- @radix-ui/* packages: Comprehensive set of unstyled, accessible UI primitives (accordion, dialog, dropdown, etc.)
- framer-motion: Declarative animations and gesture handling
- gsap + ScrollTrigger: Advanced scroll-based animations
- lenis: Smooth scroll library with custom easing
- embla-carousel-react: Touch-friendly carousel component

**Form & Validation**
- react-hook-form: Performant form state management
- @hookform/resolvers: Validation resolver adapters
- zod: TypeScript-first schema validation
- zod-validation-error: Better error messages from Zod
- drizzle-zod: Generate Zod schemas from Drizzle tables

**Styling**
- tailwindcss: Utility-first CSS framework
- @tailwindcss/vite: Vite plugin for Tailwind v4
- class-variance-authority: Type-safe variant management for components
- clsx + tailwind-merge: Conditional className composition
- tw-animate-css: Extended animation utilities

**Icons & Fonts**
- lucide-react: Icon library
- Google Fonts: Playfair Display (serif) and DM Sans (sans-serif)

**Backend Services**
- drizzle-orm: Type-safe database ORM
- pg: PostgreSQL client
- express: Web framework
- express-session: Session middleware
- date-fns: Date utility library

**Build & Development Tools**
- vite: Frontend build tool
- esbuild: Backend bundler for production
- tsx: TypeScript execution for development server
- cross-env: Cross-platform environment variables
- drizzle-kit: Database migration CLI

**Type Safety**
- TypeScript with strict mode enabled
- Shared types between client/server via @shared path alias
- Drizzle schema as single source of truth for database types