const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const user = express.Router();
const expressJoi = require('express-joi');
const Joi = expressJoi.Joi;

const postUserSchema = {
  firstName: Joi.string().min(3).max(50),
  lastName: Joi.string().min(3).max(50),
  username: Joi.string().min(3).max(12),
  password: Joi.string().alphanum().min(6).max(20),
  email: Joi.string().email(),
  phone: Joi.string().min(10).max(12),
  address: Joi.string().max(50)
};
const getUserSchema = {
  id: Joi.number()
};
const putUserSchema = {
  id: Joi.number(),
  email: Joi.string().email(),
};
const deleteUserSchema = {
  id: Joi.number()
};

user.use(bodyParser.urlencoded({ extended: false }));
user.use(bodyParser.json());

user.post('/', expressJoi.joiValidate(postUserSchema), controllers.user.create);
user.get('/', controllers.user.get);
user.get('/:id', expressJoi.joiValidate(getUserSchema), controllers.user.index);
user.put('/:id', expressJoi.joiValidate(putUserSchema), controllers.user.update);
user.delete('/:id', expressJoi.joiValidate(deleteUserSchema), controllers.user.destroy);

module.exports = user;
