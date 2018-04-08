const { jsonHelper } = require('../helpers/jsonResponse');
const models = require('../models');

const bcrypt = require('bcrypt');

module.exports = {
  get: async (request, response) => {
    try {
      const users = await models.User.findAll({ raw: true });
      if (users.length) {
        const result = jsonHelper(users, null, 200);
        response.status(200).json(result);
      }
      else {
        const result = jsonHelper(null, 'No User data found!', 404);
        response.status(404).json(result);
      }
    }
    catch (error) {
      const result = jsonHelper(null, error.message, 500);
      response.status(500).json(result);
    }
  },
  index: async (request, response) => {
    try {
      const user = await models.User.findOne({ where: { id: request.params.id }, raw: true });
      if (user) {
        const result = jsonHelper(user, null, 200);
        response.status(200).json(result);
      }
      else {
        const result = jsonHelper(null, 'No User data found!', 404);
        response.status(404).json(result);
      }
    }
    catch (error) {
      const result = jsonHelper(null, error.message, 500);
      response.status(500).json(result);
    }
  },
  create: async (request, response) => {
    try {
      const { firstName, lastName, username, password, email, phone, address } = request.body;
      const user = await models.User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        phone: phone,
        address: address
      });
      const salt = await bcrypt.genSalt(10);
      await models.Auth.create({
        username: username,
        password: await bcrypt.hash(password, salt),
      });
      const result = jsonHelper(user, null, 200);
      response.status(200).json(result);
    }
    catch (error) {
      const result = jsonHelper(null, error.message, 500);
      response.status(500).json(result);
    }
  },
  update: async (request, response) => {
    try {
      const { email } = request.body;
      await models.User.update({ email: email }, { where: { id: request.params.id }, raw: true });
      const result = jsonHelper({ status: true }, null, 200);
      response.status(200).json(result);
    }
    catch (error) {
      const result = jsonHelper(null, error.message, 500);
      response.status(500).json(result);
    }
  },
  destroy: async (request, response) => {
    try {
      await models.User.destroy({ where: { id: request.params.id } });
      const result = jsonHelper({ status: true }, null, 200);
      response.status(200).json(result);
    }
    catch (error) {
      const result = jsonHelper(null, error.message, 500);
      response.status(500).json(result);
    }
  }
};
