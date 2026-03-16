## Proyecto Backend III - Entrega Final

Este proyecto corresponde a la entrega final del curso, donde se implementa una API de adopciones con documentación Swagger, tests funcionales y Dockerización.

### Endpoints principales

- **Usuarios**: `GET /api/users`, `GET /api/users/:uid`, `PUT /api/users/:uid`, `DELETE /api/users/:uid`
- **Mascotas**: `GET /api/pets`, etc.
- **Adopciones**: `GET /api/adoptions`, `GET /api/adoptions/:aid`, `POST /api/adoptions/:uid/:pid`

### Documentación Swagger (módulo Users)

La documentación de Swagger para el módulo de `users` está disponible en:

- **URL local**: `http://localhost:8080/api/docs`

Ahí podrás ver documentadas las rutas del router `users.router.js`.

### Tests funcionales (adoption.router.js)

Los tests funcionales se encuentran en `test/supertest.test.js` y cubren los endpoints del router `adoption.router.js`.

- **Ejecutar tests**:

```bash
npm test
```

Puedes configurar IDs reales para usuario, mascota, etc. mediante variables de entorno:

- **Variables usadas en los tests**:
  - `TEST_USER_ID`
  - `TEST_PET_ID`
  - `TEST_ADOPTED_PET_ID`
  - `TEST_NON_EXISTING_USER_ID`
  - `TEST_NON_EXISTING_PET_ID`

Si no se definen, se utilizarán IDs por defecto.

### Dockerfile e imagen de Docker

Se ha creado un `Dockerfile` en la raíz del proyecto que permite construir una imagen Docker de la aplicación.

- **Construir la imagen**:

```bash
docker build -t TU_USUARIO_DOCKERHUB/backendiii-adopciones .
```

- **Ejecutar el contenedor**:

```bash
docker run -p 8080:8080 -e MONGO_URL="TU_URL_DE_MONGO" TU_USUARIO_DOCKERHUB/backendiii-adopciones
```

### Imagen en Docker Hub

Sube la imagen a Docker Hub con:

```bash
docker push TU_USUARIO_DOCKERHUB/backendiii-adopciones
```

- **Enlace público a la imagen en Docker Hub**  
  Sustituye por tu enlace real:

`https://hub.docker.com/r/TU_USUARIO_DOCKERHUB/backendiii-adopciones`

### Resumen para la corrección

- **Swagger**: módulo `Users` documentado en `/api/docs`.
- **Tests funcionales**: definidos para todos los endpoints de `adoption.router.js` en `test/supertest.test.js`.
- **Dockerfile**: presente en la raíz del proyecto y listo para construir la imagen.
- **README**: este archivo incluye el enlace (a completar) a Docker Hub y las instrucciones para construir la imagen, ejecutar el contenedor y usar el proyecto.

