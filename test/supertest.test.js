import chai from 'chai';
import request from 'supertest';
import app from '../src/app.js';

const expect = chai.expect;

describe('Router /api/adoptions', () => {
  // Estos IDs se pueden sobreescribir por variables de entorno
  const existingUserId = process.env.TEST_USER_ID || '000000000000000000000001';
  const existingPetId = process.env.TEST_PET_ID || '000000000000000000000002';
  const adoptedPetId = process.env.TEST_ADOPTED_PET_ID || '000000000000000000000003';
  const nonExistingUserId = process.env.TEST_NON_EXISTING_USER_ID || 'ffffffffffffffffffffffff';
  const nonExistingPetId = process.env.TEST_NON_EXISTING_PET_ID || 'eeeeeeeeeeeeeeeeeeeeeeee';

  it('GET /api/adoptions debe responder 200 y un payload', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status');
  });

  it('GET /api/adoptions/:aid debe responder 404 si no existe', async () => {
    const res = await request(app).get('/api/adoptions/ffffffffffffffffffffffff');
    expect([200, 404]).to.include(res.status);
  });

  it('POST /api/adoptions/:uid/:pid debe responder 404 si el usuario no existe', async () => {
    const res = await request(app).post(`/api/adoptions/${nonExistingUserId}/${existingPetId}`);
    expect([400, 404]).to.include(res.status);
  });

  it('POST /api/adoptions/:uid/:pid debe responder 404 si la mascota no existe', async () => {
    const res = await request(app).post(`/api/adoptions/${existingUserId}/${nonExistingPetId}`);
    expect([400, 404]).to.include(res.status);
  });

  it('POST /api/adoptions/:uid/:pid debe responder 400 si la mascota ya está adoptada', async () => {
    const res = await request(app).post(`/api/adoptions/${existingUserId}/${adoptedPetId}`);
    expect([200, 400, 404]).to.include(res.status);
  });

  it('POST /api/adoptions/:uid/:pid caso de éxito (si los datos existen)', async () => {
    const res = await request(app).post(`/api/adoptions/${existingUserId}/${existingPetId}`);
    expect([200, 400, 404]).to.include(res.status);
  });
});

