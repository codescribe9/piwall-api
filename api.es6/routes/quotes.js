const express = require('express')
const router = express.Router()
const apicache  = require('apicache')

const cache = apicache.options({
    headers: {
      'cache-control': 'no-cache'
    }
  })
  .middleware

const QuotesController = require('../controllers/quotes')
// higher-order function returns false for responses of other status codes (e.g. 403, 404, 500, etc)
const onlyStatus200 = (req, res) => res.statusCode === 200

router.get("/", cache('4 hours', onlyStatus200), QuotesController.getQuotes)

module.exports = router;