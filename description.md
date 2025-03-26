# FitFriends

FitFriends

Запуск приложения:

```bash
cp backend/apps/account/.env-example backend/apps/account/.env
cp backend/apps/api/.env-example backend/apps/api/.env
cp backend/apps/file-vault/.env-example backend/apps/file-vault/.env
cp backend/apps/trainings/.env-example backend/apps/trainings/.env
cp backend/libs/trainings/models/prisma/.env-example backend/libs/trainings/models/prisma/.env

docker compose -f docker-compose.dev.yml up -d
cd backend
npm install
npx nx run trainings:db:generate
npx nx run trainings:db:migrate
npx nx run cli:build
npm run cli:generate
npx nx run trainings:db:seed

npx nx run file-vault:serve
npx nx run account:serve
npx nx run trainings:serve
npx nx run api:serve

cd ../frontend/
npm install
npm run start
```

Swagger
[app API](http://localhost:3000/spec#/)

FitFriends
[React App](http://localhost:5173/)

Спецификация:
specification.yaml [OpenAPI](http://localhost:3000/spec-yaml)
