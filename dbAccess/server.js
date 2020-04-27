const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const debug = require('debug')('app');
const chalk = require('chalk');
const connect = require('./dbAccess/connect');

connect();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt());
app.use(morgan('dev'));


app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

module.exports = app;