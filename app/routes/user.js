const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('../controllers');
const user = express.Router();

user.use(bodyParser.urlencoded({ extended: false }));
user.use(bodyParser.json());


user.post('/', controllers.user.create);
user.get('/', controllers.user.get);
user.get('/:id', controllers.user.index);
user.put('/:id', controllers.user.update);
user.delete('/:id', controllers.user.destroy);

module.exports = user;
