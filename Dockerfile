# SawtFlow AI — local static frontend image
FROM nginx:1.27-alpine

# Serve the static website and Studio from Nginx's document root.
COPY site/ /usr/share/nginx/html/

# Nginx listens on port 80 inside the container.
EXPOSE 80

# Keep the container in the foreground for Docker.
CMD ["nginx", "-g", "daemon off;"]
