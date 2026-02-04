# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve
FROM nginx:alpine

# Copy built assets from builder stage
# Note: Path might vary based on angular.json, usually dist/shop/browser or dist/shop
COPY --from=build /app/dist/shop/browser /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
