const express = require('express');
const _ = express.Router();
const { registration } = require('../controllers/authController')

_.post("/register" , registration);

module.exports = _;