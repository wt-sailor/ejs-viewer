FROM node:20-alpine AS builder
WORKDIR /app

# --- Build Frontend ---
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy frontend code and build
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts postcss.config.js tailwind.config.js index.html ./
COPY src ./src
COPY public ./public
RUN yarn build

# --- Build Backend ---
WORKDIR /app/server
COPY server/package.json server/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy backend code and build
COPY server/tsconfig.json ./
COPY server/src ./src
RUN yarn build

# --- Production Image ---
FROM node:20-alpine
WORKDIR /app

# Set environments
ENV NODE_ENV=production
ENV PORT=5153

# Copy frontend build
COPY --from=builder /app/dist ./dist

# Copy backend
WORKDIR /app/server
COPY --from=builder /app/server/package.json ./
COPY --from=builder /app/server/yarn.lock ./
COPY --from=builder /app/server/dist ./dist

# Install production dependencies for server
RUN yarn install --production --frozen-lockfile

EXPOSE 5153

CMD ["node", "dist/index.js"]
