const DarkSky = require('../providers/forecast_io/dark-sky-api')


exports.getWeather = (req, res, next) => {
    const darksky = new DarkSky('a37c241707b192dae23e170de2d4966f')

    darksky
        .latitude('33.164404')            // required: latitude, string || float.
        .longitude(-96.752286)            // required: longitude, string || float.
        .extendHourly(true)             // optional: extend, boolean, refer to API documentation.
        .get()                          // execute your get request.
        .then(data => {
            res.status(200).json({
                currently: {
                    'temp': data.currently.temperature,
                    'time': data.currently.time,
                    'summary': data.currently.summary,
                    'icon': data.currently.icon,
                },
                hourly: {
                    'summary': data.hourly.summary,
                    'icon': data.hourly.icon,
                },
                daily: {
                    'summary': data.daily.summary,
                    'icon': data.daily.icon,
                },
                alerts: data.alerts
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })             // handle your error response
}



