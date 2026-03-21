import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Carga y fusiona la especificación OpenAPI desde archivos YAML (sin JSDoc en routers).
 * - openapi-root.yaml: info, servers base, components (schemas)
 * - paths/*.yaml: solo definición de paths (OpenAPI 3)
 */
export function loadOpenApiSpec(port = 8080) {
  const docsDir = join(__dirname, '../../docs/swagger');
  const rootPath = join(docsDir, 'openapi-root.yaml');
  const usersPathsPath = join(docsDir, 'paths/users.yaml');

  const root = yaml.load(readFileSync(rootPath, 'utf8'));
  const usersPaths = yaml.load(readFileSync(usersPathsPath, 'utf8'));

  const spec = {
    ...root,
    paths: {
      ...(root.paths || {}),
      ...usersPaths,
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor actual (ajustado por PORT)',
      },
    ],
  };

  return spec;
}
