# Architecture Documentation

## System Overview

This is a unified Next.js monolith application that consolidates 26+ microservices and micro-frontends into a single, cohesive application.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL) + MongoDB
- **UI Icons**: Lucide React
- **Validation**: Zod
- **HTTP Client**: Native Fetch API

## Core Principles

1. **Separation of Concerns**: Clear boundaries between presentation, business logic, and data access
2. **Type Safety**: Strong TypeScript typing throughout the application
3. **Service Layer Pattern**: Business logic encapsulated in service classes
4. **Direct Function Calls**: No internal HTTP calls between services
5. **Security First**: Row Level Security (RLS) on all database tables

## Layer Architecture

### 1. Presentation Layer (`/app`, `/components`)

**Responsibilities:**
- User interface rendering
- User input handling
- Client-side routing
- Layout and styling

**Key Directories:**
- `/app/(domain)`: Feature-specific pages and layouts
- `/components/ui`: Reusable UI components
- `/components/layout`: Layout components
- `/components/shared`: Shared functionality components

### 2. API Layer (`/app/api`)

**Responsibilities:**
- HTTP request handling
- Request validation
- Response formatting
- Error handling

**Pattern:**
```typescript
app/api/
├── auth/              # Authentication
├── users/             # User management
├── matching/          # Matching service
├── connections/       # Connections
├── messages/          # Messaging
├── notifications/     # Notifications
└── process/           # Background processes
```

### 3. Service Layer (`/lib/services`)

**Responsibilities:**
- Business logic implementation
- Data validation
- Complex operations
- Service orchestration

**Available Services:**
- `UserService`: User CRUD operations
- `ConnectionService`: Connection management
- `MatchingService`: Matching algorithm implementation
- `MessageService`: Messaging operations
- `NotificationService`: Notification handling

### 4. Data Access Layer (`/lib/db`)

**Responsibilities:**
- Database connections
- Query execution
- Connection pooling

**Clients:**
- Supabase client (primary database)
- MongoDB client (optional, for specific use cases)

## Data Flow

### Standard Request Flow

```
User Request
    ↓
Next.js Route (app/page.tsx)
    ↓
API Route (app/api/*/route.ts)
    ↓
Service Layer (lib/services/*.service.ts)
    ↓
Database (lib/db/supabase.ts)
    ↓
Response
```

### Direct Server Component Flow

```
User Request
    ↓
Server Component (app/page.tsx)
    ↓
Service Layer (lib/services/*.service.ts)
    ↓
Database (lib/db/supabase.ts)
    ↓
Rendered HTML
```

## Database Architecture

### Supabase Tables

1. **users**: Core user information
2. **connections**: User relationships and connections
3. **messages**: Direct messaging between users
4. **notifications**: User notifications
5. **matches**: Matching results and scores
6. **user_preferences**: User settings

### Row Level Security (RLS)

All tables have RLS enabled with policies ensuring:
- Users can only access their own data
- Public profiles are readable by authenticated users
- Sensitive operations require authentication

## Configuration Management

### Environment Variables

Centralized in `.env.local`:
- Supabase credentials
- MongoDB connection string
- Service-specific configurations
- Feature flags

### Configuration Object

The `/lib/config.ts` file exports a typed configuration object:

```typescript
import { config } from '@/lib/config'

// Access configuration
const matchingAlgorithm = config.matching.algorithmType
const maxResults = config.matching.maxResults
```

## Type System

### Model Types (`/types/models`)

Define the shape of domain entities:
- `User`, `UserProfile`
- `Connection`, `ConnectionRequest`
- `Message`, `Conversation`
- `Notification`
- `Match`, `MatchResult`

### API Types (`/types/api`)

Define request/response structures:
- `ApiResponse<T>`
- `PaginatedResponse<T>`
- `ListQueryParams`

## Service Pattern

Services follow a consistent pattern:

```typescript
export class ServiceName {
  static async findById(id: string): Promise<Entity | null> {
    // Implementation
  }

  static async create(input: CreateInput): Promise<Entity> {
    // Implementation
  }

  static async update(id: string, input: UpdateInput): Promise<Entity> {
    // Implementation
  }

  static async delete(id: string): Promise<void> {
    // Implementation
  }

  static async list(options: ListOptions): Promise<Entity[]> {
    // Implementation
  }
}
```

## Utility Functions

### Validation (`/lib/utils/validation.ts`)

Zod schemas for input validation:
- Email validation
- Password strength validation
- Form schemas

### Formatting (`/lib/utils/format.ts`)

Data formatting utilities:
- Date formatting
- Number formatting
- Text truncation

### Class Names (`/lib/utils/cn.ts`)

Tailwind CSS class name merging using `clsx` and `tailwind-merge`.

## Security Considerations

1. **Authentication**: All API routes should verify authentication
2. **Authorization**: RLS policies enforce data access rules
3. **Input Validation**: Zod schemas validate all user input
4. **SQL Injection Prevention**: Supabase client handles parameterization
5. **XSS Prevention**: React automatically escapes output

## Performance Optimization

1. **Direct Function Calls**: No network overhead between services
2. **Database Indexing**: Indexes on frequently queried columns
3. **Efficient Queries**: Use Supabase's query builder for optimal queries
4. **Caching**: Consider implementing Redis for frequently accessed data

## Scalability Considerations

While this is a monolith, it's designed for growth:

1. **Clear Boundaries**: Services can be extracted if needed
2. **Stateless Design**: All state in the database
3. **Horizontal Scaling**: Next.js supports multiple instances
4. **Database Scaling**: Supabase handles scaling

## Testing Strategy

1. **Unit Tests**: Test service layer functions
2. **Integration Tests**: Test API routes
3. **E2E Tests**: Test user flows
4. **Type Checking**: TypeScript provides compile-time checks

## Monitoring and Observability

Consider adding:
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Database monitoring (Supabase Dashboard)
- Custom logging for critical operations

## Migration Path

If specific services need to be extracted later:

1. Service layer provides clear boundaries
2. Extract service + API routes
3. Replace function calls with HTTP calls
4. Deploy as separate service

The architecture supports gradual extraction if needed.
