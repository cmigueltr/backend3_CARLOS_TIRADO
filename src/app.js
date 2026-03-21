import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import { loadOpenApiSpec } from './utils/loadOpenApiSpec.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Conexión a Mongo (también en tests si se provee URL)
// Para desactivar conexión (tests unitarios sin DB), usar DISABLE_DB=true
if (process.env.DISABLE_DB !== 'true') {
  const mongoUrl =
    process.env.MONGO_URL ||
    process.env.MONGO_URL_TEST ||
    'mongodb://127.0.0.1:27017/backendiii_adoptions';
  mongoose.connect(mongoUrl);
}

app.use(express.json());
app.use(cookieParser());

// Swagger UI: especificación 100% en YAML (docs/swagger), no en comentarios del router
const openApiSpec = loadOpenApiSpec(PORT);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// Exportamos app para poder usarla en los tests funcionales
export default app;

// Solo levantamos el servidor cuando no estamos en tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}
