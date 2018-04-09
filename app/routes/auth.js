const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const auth = express.Router();
const expressJoi = require('express-joi');
const Joi = expressJoi.Joi;

const postLoginSchema = {
  username: Joi.string().min(3).max(12),
  password: Joi.string().alphanum().min(6).max(20),
};
const postForgotPasswordSchema = {
  username: Joi.string().min(3).max(12)
};
const postChangePasswordSchema = {
  username: Joi.string().min(3).max(12),
  oldPassword: Joi.string().alphanum().min(6).max(20),
  newPassword: Joi.string().alphanum().min(6).max(20),
  confirmPassword: Joi.string().alphanum().min(6).max(20)
};

auth.use(bodyParser.urlencoded({ extended: false }));
auth.use(bodyParser.json());

auth.post('/login', expressJoi.joiValidate(postLoginSchema), controllers.auth.login);
auth.post('/forgotPassword', expressJoi.joiValidate(postForgotPasswordSchema), controllers.auth.forgotPassword);
auth.post('/changePassword', expressJoi.joiValidate(postChangePasswordSchema), controllers.auth.changePassword);

module.exports = auth;
