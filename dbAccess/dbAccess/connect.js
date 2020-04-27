const mongoose = require('mongoose');
const debug = require('debug')('app:connect');
const chalk = require('chalk');

const connected = chalk.cyan;
const error = chalk.yellow;
const disconnected = chalk.red;
const termination = chalk.magenta;

const server = process.env.MONGOSERVER || "127.0.0.1:27017";
const database = process.env.COLLECTION || "coviddata";
const dburl = `mongodb://${server}/${database}`;

function connect() {
  mongoose.connect(dburl, { useNewUrlParser: true });

  mongoose.connection.on('connected', () => {
    debug(connected('Mongoose default connection is open to ', dburl));
  });

  mongoose.connection.on('error', (err) => {
    debug(error(`Mongoose default connection has occured ${err} error`));
  });

  mongoose.connection.on('disconnected', () => {
    debug(disconnected('Mongoose default connection is disconnected'));
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      debug(termination('Mongoose default connection is disconnected due to application termination'));
      process.exit(0);
    });
  });
}

module.exports = connect;
