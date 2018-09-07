/* eslint-env mocha */

const request = require('supertest');
const server = require('../../../app/index');

describe('Auth controller', () => {
  it('should return 200 on post /login', (done) => {
    const loginDetails = {
      'username': 'TheNewJD',
      'password': 'password'
    };
    request(server)
      .post('/api/v1/auth/login')
      .accept('json')
      .send(loginDetails)
      .expect(200, done);
  });
});
