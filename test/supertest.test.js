import chai from 'chai';
import request from 'supertest';
import app from '../src/app.js';

const expect = chai.expect;

describe('Router /api/adoptions', function () {
  this.timeout(15000);

  /** IDs reales obtenidos de la API si hay datos en Mongo (evita falsos fallos con IDs inventados) */
  let realUserId;
  let realPetIdFree;
  let realPetIdAdopted;

  const nonExistingUserId =
    process.env.TEST_NON_EXISTING_USER_ID || 'ffffffffffffffffffffffff';
  const nonExistingPetId =
    process.env.TEST_NON_EXISTING_PET_ID || 'eeeeeeeeeeeeeeeeeeeeeeee';

  before(async () => {
    const usersRes = await request(app).get('/api/users');
    const users = usersRes.body?.payload;
    if (Array.isArray(users) && users.length > 0) {
      realUserId = String(users[0]._id);
    }
    const petsRes = await request(app).get('/api/pets');
    const pets = petsRes.body?.payload;
    if (Array.isArray(pets) && pets.length > 0) {
      const adopted = pets.find((p) => p.adopted === true);
      const free = pets.find((p) => !p.adopted);
      if (free) realPetIdFree = String(free._id);
      if (adopted) realPetIdAdopted = String(adopted._id);
    }
  });

  it('GET /api/adoptions responde JSON con lista en payload', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.match(/json/);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('payload');
    expect(res.body.payload).to.be.an('array');
  });

  it('GET /api/adoptions/:aid inexistente devuelve cuerpo de error coherente', async () => {
    const res = await request(app).get(
      '/api/adoptions/000000000000000000000099',
    );
    expect(res.status).to.equal(404);
    expect(res.body).to.deep.include({
      status: 'error',
      error: 'Adoption not found',
    });
  });

  it('POST con usuario inexistente devuelve 404 y mensaje de usuario', async () => {
    const res = await request(app).post(
      `/api/adoptions/${nonExistingUserId}/${nonExistingPetId}`,
    );
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal('error');
    expect(res.body.error).to.match(/user/i);
  });

  it('POST con mascota inexistente devuelve 404 y mensaje de mascota', async function () {
    const uid =
      realUserId ||
      process.env.TEST_USER_ID;
    if (!uid) this.skip();

    const res = await request(app).post(
      `/api/adoptions/${uid}/${nonExistingPetId}`,
    );
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property('status', 'error');
    expect(res.body.error).to.match(/pet/i);
  });

  it('POST con mascota ya adoptada devuelve 400 (regla de negocio)', async function () {
    const uid =
      realUserId ||
      process.env.TEST_USER_ID;
    const pid =
      realPetIdAdopted ||
      process.env.TEST_ADOPTED_PET_ID;
    if (!uid || !pid) this.skip();

    const res = await request(app).post(`/api/adoptions/${uid}/${pid}`);
    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal('error');
    expect(res.body.error).to.match(/adopted|adoptada/i);
  });

  it('POST adopción exitosa devuelve mensaje de éxito cuando hay usuario y mascota libre', async function () {
    const uid =
      realUserId ||
      process.env.TEST_USER_ID;
    const pid =
      realPetIdFree ||
      process.env.TEST_PET_ID;
    if (!uid || !pid) this.skip();

    const res = await request(app).post(`/api/adoptions/${uid}/${pid}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.message).to.match(/adopt/i);
  });
});
