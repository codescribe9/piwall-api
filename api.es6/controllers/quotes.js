const request = require('request')
const moment = require('moment')

exports.getQuotes = (req, res, next) => {
    
    var urlQuotes = 'http://quotes.rest/qod.json?maxlength=300&'
    console.log('urlQuotes', urlQuotes);
    request({ url: `${urlQuotes}category=funny`, json: true }, (err1, res1, body1) => {
        if (err1) {
            console.log('Error:',err1)
            res.status(500).json({
                message: err1.message
            })
        }
        console.log('body1',body1)

        request({ url: `${urlQuotes}category=inspire`, json: true }, (err2, res2, body2) => {
            if (err2) {
                console.log('Error:',err2)
                res.status(500).json({
                    message: err2.message
                })
            }
            console.log('body2', body2)
            res.status(200).json({
                quotes: {
                    "funny": body1,
                    "inspire": body2
                }
            })
        })

    })
}


