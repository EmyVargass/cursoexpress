const request = require('supertest');
const app = require('../app');
const { sequelize, setupDatabase } = require('../db/sequelize');

describe('App', () => {

  beforeAll(async () => {
    await setupDatabase();
  });

  // Close the database connection after all tests are done
  afterAll(async () => {
    await sequelize.close();
  });

  it('should return a welcome message on the root endpoint', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('mensaje', '¡Servidor Express funcionando!');
  });
});
