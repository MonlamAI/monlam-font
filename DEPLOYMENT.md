# Production Deployment Guide

## Tibetan Font Viewer - Production Setup

This guide will help you deploy the Tibetan Font Viewer to production.

### Prerequisites

- Node.js 18+
- npm or yarn
- A hosting service (Vercel, Netlify, AWS, etc.)

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Application settings
NEXT_PUBLIC_APP_NAME="Tibetan Font Viewer"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Environment
NODE_ENV="production"
NEXT_PUBLIC_DEBUG="false"
```

### Build Commands

```bash
# Install dependencies
npm install

# Type checking
npm run type-check

# Linting
npm run lint:fix

# Production build
npm run build:production

# Start production server
npm start
```

### Deployment Options

#### 1. Vercel (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts to deploy

#### 2. Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`

#### 3. Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### 4. Static Export

For static hosting (GitHub Pages, etc.):

```bash
# Update next.config.js to include:
# output: 'export'

npm run export
```

### Performance Optimizations

1. **Font Loading**: Critical fonts are preloaded, others are lazy-loaded
2. **Caching**: Fonts are cached for 1 year
3. **Compression**: Gzip compression enabled
4. **Security Headers**: XSS protection, content type options, etc.

### Monitoring

- Use Vercel Analytics or Google Analytics
- Monitor Core Web Vitals
- Set up error tracking (Sentry, etc.)

### Troubleshooting

1. **Font Loading Issues**: Check that all font files are in `/public/fonts/`
2. **Build Errors**: Run `npm run type-check` and `npm run lint`
3. **Performance**: Use `npm run build:analyze` to analyze bundle size

### Security Checklist

- [ ] Environment variables are secure
- [ ] No sensitive data in client-side code
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Dependencies are up to date

### Maintenance

- Regular dependency updates
- Monitor performance metrics
- Backup font files
- Test font loading across browsers
