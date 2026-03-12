# Stage 1: Build the app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config template (Note the .template extension)
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Nginx Alpine image has a built-in feature:
# It looks for files in /etc/nginx/templates/*.template
# runs envsubst on them, and outputs to /etc/nginx/conf.d/
# So we just need to pass the ENV var in ECS.

# Install curl for health checks
RUN apk add --no-cache curl

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]