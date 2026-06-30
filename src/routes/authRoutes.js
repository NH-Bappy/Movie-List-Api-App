const express = require('express');
const _ = express.Router();
const { registration ,login } = require('../controllers/authController')


_.post("/register" , registration);
_.post("/login" , login)

module.exports = _;