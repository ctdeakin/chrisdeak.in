FROM node:lts-alpine
WORKDIR /app
COPY server.js .
COPY site/ site/
EXPOSE 3000
CMD ["node", "server.js"]
