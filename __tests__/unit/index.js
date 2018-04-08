/* eslint-env mocha */

const request = require('supertest');
const server = require('../../app');

describe('Main server file', () => {
  afterEach(() => {
    server.close();
  });
  it('responds to /', (done) => {
    request(server)
      .get('/api/v1')
      .expect(200, done);
  });
});
