# Backend III — API de adopciones

Express + MongoDB. Incluye rutas de usuarios, mascotas, adopciones, sesiones y mocks.

## Cómo levantar el proyecto

```bash
npm install
npm start
```

Por defecto escucha en el puerto `8080`. La URL de Mongo se configura con la variable `MONGO_URL` (si no, usa la local del código).

## Swagger

La documentación del módulo de usuarios está en archivos YAML (`docs/swagger/`), no en comentarios dentro del router. La UI queda en:

`http://localhost:8080/api/docs`

Archivos: `openapi-root.yaml` (info y esquemas) y `paths/users.yaml` (rutas).

## Tests

```bash
npm test
```

Hay pruebas sobre `/api/adoptions` y otra que comprueba que `/api/docs` devuelve HTML. Si en tu Mongo no hay usuarios o mascotas, algunos casos se saltan hasta que haya datos o configures las variables `TEST_*` que están en el código.

## Docker

Imagen en Docker Hub: **cmigueltr/backendiii-adopciones**

- Página del repo: https://hub.docker.com/r/cmigueltr/backendiii-adopciones

Para generar la imagen localmente y subirla (desde la raíz del proyecto, con Docker Desktop abierto):

```bash
docker build -t cmigueltr/backendiii-adopciones:latest .
docker login
docker push cmigueltr/backendiii-adopciones:latest
```

Para correr un contenedor apuntando a Mongo en tu máquina (Windows):

```bash
docker run -p 8080:8080 -e MONGO_URL="mongodb://host.docker.internal:27017/backendiii_adoptions" cmigueltr/backendiii-adopciones:latest
```

Ajustá `MONGO_URL` si tu base está en otro servidor o con otro nombre de base de datos.
