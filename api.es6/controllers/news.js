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
        var item = $(this);
        var newsItem = {};
        newsItem.html = $(this)[0].outerHTML;
        newsItem.title = item.find('h2').text();
        var contentHtml = '';
        item.find('p').each(function() {
          contentHtml += `<p>${$(this).html()}</p>`;
        });
       newsItem.content = contentHtml;
        news[i] = newsItem;
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


