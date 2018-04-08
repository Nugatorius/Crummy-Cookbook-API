const express = require('express');
const bodyParser = require('body-parser');
const logger = require('winston');

require('./utils/logger');
process.env.NODE_ENV === 'test' ? require('dotenv').config({ path: '.test.env' }) : require('dotenv').config();

const routes = require('./routes');

const app = express();

app.use('/api/v1', routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server started at ${process.env.PORT || 3000}`);
  logger.info('Press Ctrl-C to exit');
});

module.exports = server;
