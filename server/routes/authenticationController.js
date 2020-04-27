const express = require('express');

const router = express.Router();
const userService = require('../services/userService');

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) => (user ? res.json(user) : res.status(400).json()))
    .catch((err) => next(err));
}

// routes
router.post('/authenticate', authenticate);

module.exports = router;
