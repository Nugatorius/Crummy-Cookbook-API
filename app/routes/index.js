const express = require('express');
const router = express.Router();
const logger = require('winston');

router.get('/', (request, response) => {
  logger.info('Home Page');
  response.send('Home page');
});

router.get('/about', (request, response) => {
  logger.info('About Page');
  response.send('Learn about us');
});

module.exports = router;
