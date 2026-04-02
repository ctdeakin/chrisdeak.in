FROM node:lts-alpine
WORKDIR /app
COPY server.js .
COPY site/ site/
COPY data/ data/
EXPOSE 3000
CMD ["node", "server.js"]
