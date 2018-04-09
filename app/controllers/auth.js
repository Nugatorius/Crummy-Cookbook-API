const { jsonHelper } = require('../helpers/jsonResponse');
const jwt = require('../helpers/jwtHelper');
const models = require('../models');
const bcrypt = require('bcrypt');
const mailer = require('../mailers');

module.exports = {
  login: async (request, response) => {
    try {
      const { username, password } = request.body;
      const auth = await models.Auth.findOne({ where: { username: username }, raw: true });
      const user = await models.User.findOne({ where: { username: username }, raw: true });
      if (!user) {
        const result = jsonHelper(null, 'No User data found!', 404);
        response.status(404).json(result);
        return;
      }
      const id = user.id;
      const hashedPassword = auth.password;
      const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
      if (isPasswordCorrect) {
        const token = {
          'token': await jwt.encode({
            id,
            username
          })
        };
        const result = jsonHelper(token, null, 200);
        response.status(200).json(result);
      }
      else {
        const result = jsonHelper(null, 'Wrong Password', 401);
        response.status(401).json(result);
      }
    }
    catch (error) {
      const result = jsonHelper(null, error.message, 500);
      response.status(500).json(result);
    }
  },
  forgotPassword: async (request, response) => {
    try {
      const { username } = request.body;
      const { email } = await models.User.findOne({ where: { username: username }, raw: true });
      const password = await mailer.sendPassword(email);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await models.user.update({ password: hashedPassword }, { where: { username: username } });
      const result = jsonHelper({ status: true }, null, 200);
      response.status(200).json(result);
    }
    catch (error) {
      const result = jsonHelper(null, error.message, 500);
      response.status(500).json(result);
    }
  },
  changePassword: async (request, response) => {
    try {
      const { username, oldPassword, newPassword, confirmPassword } = request.body;
      const { password } = await models.Auth.findOne({ where: { username: username }, raw: true });
      const isPasswordCorrect = await bcrypt.compare(oldPassword, password);
      if (!isPasswordCorrect) {
        const result = jsonHelper(null, 'Wrong Old Password', 401);
        response.status(401).json(result);
        return;
      }
      if (newPassword === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await models.Auth.update({ password: hashedPassword }, { where: { username: username } });
        const result = jsonHelper({ status: true }, null, 200);
        response.status(200).json(result);
      }
      else {
        const result = jsonHelper(null, 'Incorrect new password', 400);
        response.status(200).json(result);
      }
    }
    catch (error) {
      const result = jsonHelper(null, error.message, 500);
      response.status(500).json(result);
    }
  }
};
