const logger = require('winston');
require('./utils/logger');

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(routes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server started at ${process.env.PORT || 3000}`);
  logger.info('Press Ctrl-C to exit');
});

module.exports = server;
