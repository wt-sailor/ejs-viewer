FROM node:24-alpine AS builder
WORKDIR /app

# --- Build Frontend ---
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy all files (respecting .dockerignore) and build frontend
COPY . .
RUN yarn build

# --- Build Backend ---
WORKDIR /app/server
COPY server/package.json server/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy backend files and build
COPY server/ ./
RUN yarn build

# --- Production Image ---
FROM node:24-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5153

# Copy frontend build (to be served by backend)
COPY --from=builder /app/dist ./dist

# Set up server
WORKDIR /app/server
COPY --from=builder /app/server/package.json /app/server/yarn.lock ./
COPY --from=builder /app/server/dist ./dist

# Install production dependencies only
RUN yarn install --production --frozen-lockfile

EXPOSE 5153
CMD ["node", "dist/index.js"]
