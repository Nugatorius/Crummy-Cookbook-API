'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      username: 'TheNewJD',
      email: 'jd@email.com',
      phone: '999999999',
      address: 'Some random address',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('Users', [{
      firstName: 'John'
    }]);
  }
};
