const express = require('express');
const _ = express.Router();
const { registration ,login, logout } = require('../controllers/authController')


_.post("/register" , registration);
_.post("/login" , login);
_.post("/logout" ,logout);

module.exports = _;