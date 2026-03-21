# Imagen de producción para la API (Node 20 Alpine)
FROM node:20-alpine

WORKDIR /app

# Solo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Código y documentación OpenAPI en YAML (Swagger UI)
COPY src ./src
COPY docs ./docs

ENV NODE_ENV=production
EXPOSE 8080

# La app lee MONGO_URL del entorno al ejecutar el contenedor
CMD ["node", "src/app.js"]
