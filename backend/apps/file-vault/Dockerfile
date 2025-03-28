FROM node:20.18.2-alpine3.20
WORKDIR /app/fitfriends-file-vault
COPY ./dist/apps/file-vault/package*.json .
RUN npm install --omit=dev
COPY ./dist/apps/file-vault .
EXPOSE 3003
CMD ["node", "./main.js"]
