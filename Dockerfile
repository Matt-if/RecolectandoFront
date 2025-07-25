# Stage 1: Build the app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Fix: Copy to conf.d/default.conf instead of nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install curl for health checks
RUN apk add --no-cache curl

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]