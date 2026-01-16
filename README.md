# Harx Monolith - Next.js Migration

This is a unified Next.js monolith migrated from 25+ microservices into a single application using the App Router architecture.

## Architecture Overview

### Original Microservices (v25_*)

The application was originally composed of 25 microservices:

**Frontend Services:**
- `v25_dashboard_frontend` - Main dashboard interface
- `v25_copilot_frontend` - AI copilot features
- `v25_gigsaicreation_frontend` - Gigs creation UI
- `v25_knowledgebase_frontend` - Knowledge base interface
- `v25_matching_frontend` - Matching system UI
- `v25_platform_training_frontend` - Training platform
- `v25_repscreationwizard_frontend` - Reps creation wizard
- `v25_searchcompanywizard_frontend` - Company search wizard
- `v25_comporchestrator_front` - Company orchestrator UI
- `v25_reporchestrator_front` - Rep orchestrator UI
- `v25_dash_rep_front` - Dashboard rep interface
- `v25_choicepage` - Selection/choice page
- `v25_companysearchwizard` - Company search

**Backend Services:**
- `v25_dashboard_backend` - Dashboard API
- `v25_registration_backend` - User registration
- `v25_gigsaicreation_backend` - Gigs API
- `v25_knowledgebase_backend` - Knowledge base API
- `v25_matching_backend` - Matching API
- `v25_platform_training_backend` - Training API
- `v25_repscreationwizard_backend` - Reps wizard API
- `v25_searchcompanywizard_backend` - Company search API
- `v25_comporchestrator_back` - Company orchestrator backend
- `v25_dash_calls_backend` - Calls API
- `v25_dash_integrations_backend` - Integrations API

**Orchestration:**
- `v25_process_connections` - Master service orchestration

## New Monolith Structure

```
harx-monolith/
├── app/
│   ├── (auth)/          # Authentication routes (login, register)
│   ├── (dashboard)/     # Dashboard routes
│   ├── (wizards)/       # Wizard interfaces (gigs, reps, company search)
│   ├── (training)/      # Training platform routes
│   ├── (matching)/      # Matching system routes
│   ├── (knowledgebase)/ # Knowledge base routes
│   ├── (copilot)/       # AI copilot routes
│   ├── (orchestrators)/ # Orchestrator routes
│   ├── api/             # API routes (replaces backend services)
│   │   ├── auth/        # Authentication endpoints
│   │   ├── gigs/        # Gigs endpoints
│   │   ├── reps/        # Reps endpoints
│   │   ├── companies/   # Companies endpoints
│   │   ├── matching/    # Matching endpoints
│   │   └── ...
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   ├── forms/           # Form components
│   ├── dashboard/       # Dashboard-specific components
│   └── wizards/         # Wizard components
├── lib/
│   ├── db/              # Database connection and models
│   │   ├── mongodb.ts
│   │   ├── mongoose.ts
│   │   └── models/
│   ├── auth/            # Authentication utilities
│   ├── api/             # API utilities
│   └── validations/     # Validation schemas
├── types/               # TypeScript type definitions
├── services/            # Business logic (replaces internal HTTP calls)
├── hooks/               # React hooks
├── utils/               # Utility functions
├── styles/              # Global styles
└── config/              # Configuration files
```

## Key Migration Benefits

1. **Eliminated Network Latency**: Internal HTTP calls between services replaced with direct TypeScript function imports
2. **Simplified Deployment**: Single application instead of 25+ separate services
3. **Unified Codebase**: Easier to maintain and refactor
4. **Type Safety**: Full TypeScript coverage across frontend and backend
5. **Shared Code**: Types, utilities, and business logic shared seamlessly
6. **Better Performance**: No inter-service communication overhead

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.local` and configure:

```env
MONGODB_URI=mongodb://localhost:27017/harx_monolith
MONGODB_DB=harx_monolith
JWT_SECRET=your-secret-key
NEXTAUTH_SECRET=your-nextauth-secret
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## API Routes

All backend services migrated to `/app/api/*`:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/gigs` - List gigs
- `POST /api/gigs` - Create gig
- `GET /api/reps` - List reps
- `POST /api/reps` - Create rep
- `GET /api/companies` - List companies
- `POST /api/companies` - Create company

## Database Models

- **User** - User accounts and authentication
- **Company** - Company profiles
- **Rep** - Sales representative profiles
- **Gig** - Job opportunities
- **Match** - Rep-Gig matching
- **Training** - Training content
- **KnowledgeBase** - Documentation articles
- **DashboardCall** - Call logs
- **Integration** - Third-party integrations

## Features

- User authentication (registration/login)
- Dashboard with analytics
- Company search and management
- Rep creation and management
- Gig creation with AI assistance
- Matching algorithm for reps and gigs
- Training platform
- Knowledge base
- AI copilot
- Call logging
- Integrations management

## Migration Notes

- Original UI styles and logic preserved
- CSS/Tailwind classes maintained as-is
- Business logic adapted to Next.js structure
- MongoDB replaces any previous databases
- All environment variables consolidated

## License

Proprietary
