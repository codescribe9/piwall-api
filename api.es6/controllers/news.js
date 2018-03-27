const request = require('request')
const moment = require('moment')
const rp = require('request-promise');
const cheerio = require('cheerio');



exports.getNews = (req, res, next) => {
    
    var n2kURL = 'http://theneed2know.com/'

    const options = {
        uri: n2kURL,
        transform: function (body) {
          return cheerio.load(body);
        }
      };
    
      rp(options)
  .then(($) => {
    //console.log($);
    var news = Array();
    $('.index-article.grid-item').each(function(i, elem) {
        news[i] = $(this).html();
      });

      res.status(200).json({
        'news':  news 
    })
  })
  .catch((err) => {
    console.log(err);
    
            res.status(500).json({
                message: err.message
            })
  });
}


