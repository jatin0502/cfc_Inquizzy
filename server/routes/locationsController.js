const express = require('express');
const locationsService = require('../services/locationsService');

const locationsRouter = express.Router();

function getLocations (req, res, next) {
    locationsService
      .getLocations()
      .then((locations) => (locations ? res.json(locations) : res.status(400).json()))
      .catch((err) => next(err));
  }

locationsRouter.get('/', getLocations);

module.exports = locationsRouter;
