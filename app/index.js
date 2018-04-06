const express = require('express');
const app = express();
const routes = require('./routes');

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server started at ${process.env.PORT}`);
  console.log('Press Ctrl-C to exit');
});