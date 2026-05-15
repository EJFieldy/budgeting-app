FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN DATABASE_URL=dummy npx prisma generate
RUN npm run build

FROM node:24-alpine AS final
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma/migrations ./prisma/migrations
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma/client ./node_modules/.prisma/client
EXPOSE 3000
CMD npx prisma migrate deploy && node dist/index.js 
