# Unified Platform - Next.js Monolith

A modern, unified monolith application that consolidates 26+ microservices and micro-frontends into a single Next.js application.

## Features

- **Authentication**: User registration, login, and session management
- **User Profiles**: Complete profile management with preferences
- **Matching System**: Advanced matching algorithm with customizable factors
- **Connections**: Connection requests and relationship management
- **Messaging**: Real-time messaging between users
- **Notifications**: Comprehensive notification system
- **Dashboard**: Analytics and activity tracking
- **Admin Panel**: Administrative tools and controls

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Optional**: MongoDB for specific use cases
- **Icons**: Lucide React
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (credentials already configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Environment variables are already configured in `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── (matching)/        # Matching pages
│   ├── (profile)/         # Profile pages
│   └── api/               # API routes (backend)
├── components/            # React components
│   ├── ui/               # UI primitives
│   ├── layout/           # Layout components
│   └── shared/           # Shared components
├── lib/                  # Business logic
│   ├── db/              # Database clients
│   ├── services/        # Service layer
│   ├── utils/           # Utilities
│   └── config.ts        # Configuration
├── types/               # TypeScript types
│   ├── models/         # Data models
│   └── api/            # API types
└── public/             # Static assets
```

## Key Concepts

### Service Layer

Business logic is encapsulated in service classes:

```typescript
import { UserService } from '@/lib/services'

const user = await UserService.findById(userId)
```

### API Routes

All backend endpoints are in `/app/api/`:

```typescript
// GET /api/users/[id]
// POST /api/connections
// GET /api/matching/candidates
```

### Direct Function Calls

Services communicate via direct TypeScript function calls instead of HTTP:

```typescript
// No network overhead!
const user = await UserService.findById(userId)
const matches = await MatchingService.findCandidates(user.id)
```

## Database Schema

Supabase PostgreSQL database with the following tables:

- `users` - User profiles
- `connections` - User relationships
- `messages` - Direct messages
- `notifications` - User notifications
- `matches` - Match results
- `user_preferences` - User settings

All tables have Row Level Security (RLS) enabled.

## Configuration

Environment variables are in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
MONGODB_URI=...
MATCHING_ALGORITHM_TYPE=cosine_similarity
MATCHING_MIN_SCORE=0.7
```

Access configuration:

```typescript
import { config } from '@/lib/config'

const minScore = config.matching.minScore
```

## Migration from Microservices

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed instructions on migrating your v25_ microservices.

Key migration steps:

1. Analyze `v25_process_connections` (the "brain")
2. Extract Docker environment variables
3. Migrate frontend services to route groups
4. Migrate backend services to API routes + service layer
5. Replace HTTP calls with direct function calls

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

The application follows a layered architecture:

1. **Presentation Layer** - UI components and pages
2. **API Layer** - HTTP request handling
3. **Service Layer** - Business logic
4. **Data Access Layer** - Database operations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - List users
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Matching
- `GET /api/matching/candidates` - Get match candidates
- `POST /api/matching/score` - Calculate match score

### Connections
- `GET /api/connections` - List connections
- `POST /api/connections` - Create connection request
- `PUT /api/connections/[id]` - Update connection status

### Messages
- `GET /api/messages` - List messages
- `POST /api/messages` - Send message

### Notifications
- `GET /api/notifications` - List notifications
- `POST /api/notifications` - Create notification
- `PUT /api/notifications/[id]/read` - Mark as read

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Process
- `POST /api/process/connections` - Process connections (v25_process_connections logic)

## Development Guidelines

1. **Follow the service layer pattern** - Put business logic in services
2. **Use TypeScript types** - Import from `/types/models`
3. **Validate input** - Use Zod schemas from `/lib/utils/validation`
4. **Follow RLS policies** - Respect database security
5. **Use direct function calls** - No internal HTTP requests

## Security

- All database tables have Row Level Security (RLS)
- Input validation with Zod
- Authentication required for protected routes
- SQL injection prevention via Supabase client
- XSS prevention via React

## Performance

- No network overhead between services
- Database indexes on frequently queried columns
- Efficient Supabase queries
- Server-side rendering with Next.js

## Contributing

When adding new features:

1. Create models in `/types/models/`
2. Create service in `/lib/services/`
3. Create API routes in `/app/api/`
4. Create UI components in `/components/`
5. Create pages in `/app/(domain)/`

## License

Private - All Rights Reserved

## Support

For issues or questions:
1. Check the MIGRATION_GUIDE.md
2. Review the ARCHITECTURE.md
3. Examine existing service implementations
4. Verify environment variables

## Next Steps

To complete the migration:

1. **Locate your v25_ folders** and provide access to them
2. **Extract environment variables** from all Dockerfiles
3. **Analyze v25_process_connections** to understand the core logic
4. **Migrate services one by one** following the migration guide
5. **Test each migration** before moving to the next

The foundation is ready. Once you provide access to the microservices code, the actual business logic can be migrated into this structure.
