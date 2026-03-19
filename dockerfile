# Dockerfile optimized for Next.js 10
# Using multi-stage build to reduce image size

# Stage 1: Build
FROM node:16-alpine AS builder
WORKDIR /app

# Install dependencies first for better caching
COPY package*.json yarn.lock ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
# We use build only, not build && start
RUN npx env-cmd -f .env.production next build

# Stage 2: Runner
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Using port 3001 as defined in package.json start:production
EXPOSE 3001

# Start the application using the production script
CMD ["npm", "run", "start:production"]