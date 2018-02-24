const express = require('express')
const router = express.Router()

const ForecastController = require('../controllers/forecast')

router.get("/", ForecastController.getWeather)

module.exports = router;