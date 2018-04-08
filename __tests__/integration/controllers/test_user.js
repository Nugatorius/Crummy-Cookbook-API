/* eslint-env mocha */

const request = require('supertest');
const expect = require('chai').expect;
const models = require('../../../app/models');
const server = require('../../../app/index');
describe('User controller', () => {
  afterEach(() => {
    server.close(async () => {
      await models.sequelize.connectionManager.close();
    });
  });
  it('should return all users when /users', (done) => {
    request(server)
      .get('/api/v1/users')
      .expect(200)
      .then((res) => {
        expect(res.body.dataType).to.be.equal('array');
        done();
      });
  });
});
