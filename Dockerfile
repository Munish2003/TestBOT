# Use lightweight NGINX Alpine image
FROM nginx:1.25-alpine

# Copy widget files
COPY build/chatbot-widget.min.js /usr/share/nginx/html/
COPY build/chatbot-widget.bundle.js /usr/share/nginx/html/
COPY test.html /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1
