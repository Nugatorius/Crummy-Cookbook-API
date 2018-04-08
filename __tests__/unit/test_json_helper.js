/* eslint-env mocha */

const { jsonHelper } = require('../../app/helpers/jsonResponse');
const chai = require('chai');
const expect = chai.expect;

describe('Json Response Creator', () => {
  it('should return object with data when data given', () => {
    const data = {
      'mockKey': 'mockValue'
    };
    const response = jsonHelper(data, null, 200);
    expect(response.data).to.eqls(data);
    expect(response.data.mockKey).to.eqls('mockValue');
    expect(response.dataType).to.eqls('object');
    expect(response.error).to.eqls(null);
    expect(response.status).to.eqls(200);
  });
  it('should return object with error when error given', () => {
    const error = {
      message: 'mockError'
    };
    const response = jsonHelper(null, error.message, 500);
    expect(response.data === null).to.be.equal(true);
    expect(response.dataType === null).to.be.equal(true);
    expect(response.error).to.eqls('mockError');
    expect(response.status).to.eqls(500);
  });
});
