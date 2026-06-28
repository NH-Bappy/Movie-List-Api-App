const express = require('express');

const _ = express.Router();



_.get('/hello' , (req , res) => {
    res.json({message: "hello"})
})




module.exports = _;