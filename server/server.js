const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const debug = require('debug')('app');
const chalk = require('chalk');
const path = require('path');
const cors = require('cors');
const connect = require('./dbAccess/connect');
const authentication = require('./routes/authenticationController');
const requests = require('./routes/requestsController');
const user = require('./routes/userController');
const locations = require('./routes/locationsController');
const authService = require('./services/authService');

connect();
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(authService());
app.use(morgan('dev'));
app.use('/authentication', authentication);
app.use('/requests', requests);
app.use('/user', user);
app.use('/locations', locations);

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

