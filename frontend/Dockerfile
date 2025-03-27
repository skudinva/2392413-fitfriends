FROM node:20.18.2-alpine3.20
WORKDIR /app
COPY package*.json vite.config.ts ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "preview"]
