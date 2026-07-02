const express = require('express');
const { addToWatchList } = require('../controllers/watchListController');
const _ = express.Router()



_.post("/" , addToWatchList)

module.exports =_;