const express = require('express')
const router = express.Router()
const apicache  = require('apicache')

const cache = apicache.options({
    headers: {
      'cache-control': 'no-cache'
    }
  })
  .middleware

const NewsController = require('../controllers/news')
// higher-order function returns false for responses of other status codes (e.g. 403, 404, 500, etc)
const onlyStatus200 = (req, res) => res.statusCode === 200

router.get("/", cache('5 seconds', onlyStatus200), NewsController.getNews)

module.exports = router;