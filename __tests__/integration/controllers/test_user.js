/* eslint-env mocha */

const request = require('supertest');
const expect = require('chai').expect;
const models = require('../../../app/models');
const server = require('../../../app/index');
describe('User controller', () => {
  after(() => {
    server.close(async () => {
      await models.sequelize.connectionManager.close();
    });
  });
  it('should return all users when /users', (done) => {
    request(server)
      .get('/api/v1/users')
      .expect(200)
      .then((res) => {
        expect(res.body.data[0].firstName).to.be.equal('John');
        expect(res.body.data[0].lastName).to.be.equal('Doe');
        expect(res.body.error).to.be.equal(null);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.dataType).to.be.equal('array');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it('should return one user when /users/:id when user exists', (done) => {
    request(server)
      .get('/api/v1/users/1')
      .expect(200)
      .then((res) => {
        expect(res.body.data.firstName).to.be.equal('John');
        expect(res.body.data.lastName).to.be.equal('Doe');
        expect(res.body.error).to.be.equal(null);
        expect(res.body.status).to.be.equal(200);
        expect(res.body.dataType).to.be.equal('object');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it('should return one user when /users/:id when user doesnt exists', (done) => {
    request(server)
      .get('/api/v1/users/1000')
      .expect(404)
      .then((res) => {
        expect(res.body.data).to.be.equal(null);
        expect(res.body.error).to.be.equal('No User data found!');
        expect(res.body.status).to.be.equal(404);
        expect(res.body.dataType).to.be.equal(null);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it('should create one user on post /users', (done) => {
    const user = {
      'firstName':'matt',
      'lastName':'ryan',
      'password':'mr12345',
      'username': 'kuyyuuuaa',
      'email':'mattrya@mail.com',
      'address':'new york',
      'phone':'9927377718'
    };
    request(server)
      .post('/api/v1/users/')
      .accept('json')
      .send(user)
      .expect(200, done);
  });

  it('should create one user on delete /users', (done) => {
    request(server)
      .delete('/api/v1/users/2')
      .expect(200, done);
  });

  it('should create one user on delete /users', (done) => {
    request(server)
      .delete('/api/v1/users/1000')
      .expect(404, done);
  });
});
