FROM node:22-alpine3.20

RUN apk add --no-cache libc6-compat && \
    npm install -g pnpm@9.1.1

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Give ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 5173

CMD ["pnpm", "run", "dev"]