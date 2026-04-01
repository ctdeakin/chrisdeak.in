FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY site/ /usr/share/nginx/html/
COPY public/favicon.ico /usr/share/nginx/html/favicon.ico
