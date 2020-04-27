const express = require('express');

const router = express.Router();
const userService = require('../services/userService');

function register(req, res, next) {
  userService
    .registerUser(req.body)
    .then((user) => (user ? res.json(user) : res.status(400).json()))
    .catch((err) => next(err));
}

// routes
router.post('/register', register);

module.exports = router;
