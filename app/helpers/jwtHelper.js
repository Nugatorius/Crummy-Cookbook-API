process.env.NODE_ENV === 'test' ? require('dotenv').config({ path: '.test.env' }) : require('dotenv').config();

const JWT = require('jsonwebtoken');

module.exports = {
  encode: async (user) => await JWT.sign(user, process.env.SECRET_KEY),
  decode: async (token)  => await JWT.verify(token, process.env.SECRET_KEY)
};
