# 1. Install deps with Bun (for speed)
FROM oven/bun:1.1.13-alpine AS deps

WORKDIR /app

# Copy all files (because you use local packages)
COPY . .

# Install node_modules using Bun
RUN bun install

# 2. Build and Run App with Node.js (stable)
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

# Copy necessary files from bun stage
COPY --from=deps /app ./

# Build with Next.js under Node.js (not Bun)
RUN npm run build

# Start app
CMD ["npm", "start"]
