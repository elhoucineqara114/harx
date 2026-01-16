export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/unified_platform',
    dbName: process.env.MONGODB_DB_NAME || 'unified_platform',
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    env: process.env.NODE_ENV || 'development',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'fallback_jwt_secret',
    sessionSecret: process.env.SESSION_SECRET || 'fallback_session_secret',
  },
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM || 'noreply@example.com',
  },
  matching: {
    algorithmType: process.env.MATCHING_ALGORITHM_TYPE || 'cosine_similarity',
    minScore: parseFloat(process.env.MATCHING_MIN_SCORE || '0.7'),
    maxResults: parseInt(process.env.MATCHING_MAX_RESULTS || '50'),
  },
  process: {
    intervalMs: parseInt(process.env.PROCESS_INTERVAL_MS || '5000'),
    maxConcurrent: parseInt(process.env.MAX_CONCURRENT_PROCESSES || '10'),
  },
  analytics: {
    enabled: process.env.ANALYTICS_ENABLED === 'true',
    retentionDays: parseInt(process.env.ANALYTICS_RETENTION_DAYS || '90'),
  },
  registration: {
    verificationRequired: process.env.REGISTRATION_VERIFICATION_REQUIRED === 'true',
    autoApprove: process.env.REGISTRATION_AUTO_APPROVE !== 'false',
  },
  messaging: {
    maxLength: parseInt(process.env.MESSAGE_MAX_LENGTH || '5000'),
    attachmentMaxSizeMB: parseInt(process.env.MESSAGE_ATTACHMENT_MAX_SIZE_MB || '10'),
  },
  notifications: {
    enabled: process.env.NOTIFICATIONS_ENABLED !== 'false',
    pushEnabled: process.env.NOTIFICATIONS_PUSH_ENABLED === 'true',
  },
  upload: {
    maxFileSizeMB: parseInt(process.env.UPLOAD_MAX_FILE_SIZE_MB || '50'),
    allowedTypes: (process.env.UPLOAD_ALLOWED_TYPES || 'image/jpeg,image/png,application/pdf').split(','),
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  },
} as const

export type Config = typeof config
