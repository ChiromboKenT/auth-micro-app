
FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci
COPY . .

RUN npm run build

FROM node:latest

WORKDIR /app

COPY --from=build /app/dist /app

RUN npm i -g serve

EXPOSE 3000

# Command to run the serve
CMD ["serve", "-s", "."]
