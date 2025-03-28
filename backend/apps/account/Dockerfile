FROM node:20.18.2-alpine3.20
WORKDIR /app/fitfriends-account
COPY ./dist/apps/account/package*.json .
RUN npm install --omit=dev
COPY ./dist/apps/account .
EXPOSE 3001
CMD ["node", "./main.js"]
