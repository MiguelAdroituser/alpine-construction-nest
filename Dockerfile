FROM node:20-bookworm-slim

WORKDIR /app

# Install Chromium and required system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        chromium \
        ca-certificates \
        fonts-liberation \
        fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Build NestJS application
RUN npm run build

# Application port
EXPOSE 3001

# Runtime environment
ENV NODE_ENV=production
ENV PORT=3001

# Start application
CMD ["node", "dist/main"]