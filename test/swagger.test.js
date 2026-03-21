import chai from 'chai';
import request from 'supertest';
import app from '../src/app.js';

const expect = chai.expect;

describe('Documentación Swagger (YAML)', () => {
  it('GET /api/docs responde HTML de Swagger UI (no solo un código HTTP)', async () => {
    const res = await request(app).get('/api/docs/');
    expect(res.status).to.equal(200);
    expect(res.headers['content-type']).to.match(/html/i);
    expect(res.text.length).to.be.greaterThan(100);
    expect(res.text.toLowerCase()).to.match(/swagger|html/);
  });
});
