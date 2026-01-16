# Migration Guide: Microservices to Next.js Monolith

This guide explains the architecture of the unified Next.js monolith and how to migrate your v25_ microservices into it.

## Architecture Overview

### Directory Structure

```
project/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group (login, register)
│   ├── (dashboard)/              # Dashboard route group
│   ├── (matching)/               # Matching route group
│   ├── (profile)/                # Profile route group
│   ├── (registration)/           # Registration route group
│   ├── (admin)/                  # Admin route group
│   ├── (messaging)/              # Messaging route group
│   ├── (notifications)/          # Notifications route group
│   ├── api/                      # API routes (backend services)
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── users/                # User management
│   │   ├── matching/             # Matching service
│   │   ├── connections/          # Connections service
│   │   ├── messages/             # Messaging service
│   │   ├── notifications/        # Notifications service
│   │   ├── dashboard/            # Dashboard analytics
│   │   └── process/              # Process connections (v25_process_connections)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # UI primitives (Button, Card, Input)
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components (Navbar)
│   └── shared/                   # Shared components (Loading, ErrorMessage)
├── lib/                          # Business logic
│   ├── db/                       # Database clients (Supabase, MongoDB)
│   ├── services/                 # Service layer (UserService, MatchingService, etc.)
│   ├── utils/                    # Utility functions
│   ├── hooks/                    # Custom React hooks
│   ├── validations/              # Validation schemas
│   └── config.ts                 # Configuration
├── types/                        # TypeScript types
│   ├── models/                   # Data models (User, Connection, Message, etc.)
│   └── api/                      # API types
└── public/                       # Static assets
```

## Database Schema

The Supabase database includes the following tables:

- **users**: User profiles and account information
- **connections**: User connections and relationships
- **messages**: Direct messages between users
- **notifications**: User notifications
- **matches**: Matching results and scores
- **user_preferences**: User settings and preferences

All tables have Row Level Security (RLS) enabled for data protection.

## Migration Steps

### 1. Understanding v25_process_connections

The `v25_process_connections` service is the "brain" of your system. To migrate it:

1. Analyze its core logic in your existing codebase
2. Extract the connection processing algorithm
3. Implement it in `/lib/services/connection.service.ts` or `/lib/services/matching.service.ts`
4. Create an API endpoint at `/app/api/process/connections/route.ts`
5. If it needs to run on a schedule, use Next.js API routes with cron jobs or edge functions

### 2. Migrating Frontend Services

For each `v25_*_frontend` folder:

1. Identify the service domain (auth, dashboard, matching, etc.)
2. Copy React components to the corresponding route group in `/app/(domain)/`
3. Update imports to use the centralized `/components` and `/lib` folders
4. Replace API calls to use direct TypeScript function calls or local API routes
5. Update styling to use Tailwind CSS classes

Example:
```typescript
// Old: External API call
const response = await fetch('http://matching-service:3001/api/candidates')

// New: Direct function call
import { MatchingService } from '@/lib/services'
const candidates = await MatchingService.findCandidates(userId)
```

### 3. Migrating Backend Services

For each `v25_*_backend` folder:

1. Identify the service endpoints
2. Create corresponding API routes in `/app/api/`
3. Extract business logic to service classes in `/lib/services/`
4. Replace inter-service HTTP calls with direct function calls
5. Update database queries to use Supabase client

Example migration path:
- `v25_matching_backend` → `/app/api/matching/` + `/lib/services/matching.service.ts`
- `v25_messaging_backend` → `/app/api/messages/` + `/lib/services/message.service.ts`
- `v25_dashboard_backend` → `/app/api/dashboard/` + dashboard logic in services

### 4. Environment Variables

All environment variables from your Docker files should be consolidated into `.env.local`:

```env
# Supabase (already configured)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# MongoDB (if needed)
MONGODB_URI=...

# Service-specific configs
MATCHING_ALGORITHM_TYPE=cosine_similarity
MATCHING_MIN_SCORE=0.7
PROCESS_INTERVAL_MS=5000

# Add any service-specific variables here
```

### 5. Replacing Inter-Service Communication

In the microservices architecture, services communicated via REST/GraphQL. In the monolith:

**Before (Microservices):**
```typescript
// In matching service
const userResponse = await fetch('http://user-service:3002/api/users/123')
const user = await userResponse.json()
```

**After (Monolith):**
```typescript
// Direct function call
import { UserService } from '@/lib/services'
const user = await UserService.findById('123')
```

This eliminates network overhead and simplifies error handling.

## Service Layer Pattern

Each domain has a dedicated service class:

- `UserService` - User management
- `ConnectionService` - Connection requests and relationships
- `MatchingService` - Matching algorithm and candidate finding
- `MessageService` - Messaging and conversations
- `NotificationService` - Notification creation and delivery

These services encapsulate all business logic and database operations.

## API Route Pattern

All API routes follow this structure:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Extract params
    const { searchParams } = new URL(request.url)

    // Call service layer
    const data = await SomeService.getData()

    // Return response
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: 'ERROR_CODE', message: 'Error message' } },
      { status: 500 }
    )
  }
}
```

## Next Steps

1. **Analyze v25_process_connections**: This is your priority. Understand its logic and map out dependencies.

2. **Extract Docker Environment Variables**: Go through each Dockerfile and docker-compose.yml to collect all environment variables.

3. **Migrate One Service at a Time**: Start with the simplest service and work your way up to more complex ones.

4. **Test Each Migration**: Ensure each migrated service works before moving to the next.

5. **Update Documentation**: Document any service-specific quirks or important migration notes.

## Performance Benefits

Moving from microservices to a monolith provides:

- **Faster execution**: No network overhead between services
- **Simplified deployment**: Single application to deploy
- **Better type safety**: TypeScript across the entire stack
- **Easier debugging**: All code in one place
- **Reduced infrastructure costs**: Fewer containers to manage

## Need Help?

If you encounter any issues during migration:

1. Check the existing service implementations in `/lib/services/`
2. Review the API route examples in `/app/api/`
3. Ensure environment variables are properly set in `.env.local`
4. Verify database schema matches your needs in the Supabase dashboard
