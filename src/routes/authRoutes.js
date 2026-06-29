const express = require('express');
const _ = express.Router();
const {registration} = require('./authRoutes')

_.post("/register" , registration);

module.exports = _;