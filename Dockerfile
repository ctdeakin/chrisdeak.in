FROM node:lts-alpine
WORKDIR /app
COPY server.js .
COPY site/ site/
COPY public/favicon.ico site/favicon.ico
EXPOSE 3000
CMD ["node", "server.js"]
