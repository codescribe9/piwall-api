'use strict';

var express = require('express');
var router = express.Router();

var ForecastController = require('../controllers/forecast');

router.get("/", ForecastController.getWeather);

module.exports = router;