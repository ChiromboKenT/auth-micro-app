FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

RUN npm install bcrypt

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules


CMD ["node", "dist/app.js"]