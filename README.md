# Development

Los pasos a seguir para levantar el proyecto.

1. Instalar npm
```
npm install
```

2. Levantar la DB
```
docker compose up -d
npx prisma migrate dev
npx prisma generate
```

3. Renombrar el .env.template a .env
4. Reemplazar las variables de entorno
5. Ejecutar Seed para la DB [create seed](localhost:3000/api/seed)

# Comandos para Prisma ORM

```
npx prisma init
```