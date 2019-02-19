FROM nginx:1.15.8-alpine

COPY docker.nginx.conf /etc/nginx/conf.d/default.conf

COPY dist /var/www/html
