const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a5b4804fc04e3b755a663afc72321502&query=' + latitude + ',%20' + longitude + ''

    request({ url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        } else if(response.body.location.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
               weather: `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out.`
                
            })
        }
    })
}

module.exports = forecast