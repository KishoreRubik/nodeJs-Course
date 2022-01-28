const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cd0fcfbdf5fd3e9029139584be7df625&query=${latitude},${longitude}&units=f`;
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if(body.error) {
            callback('Unable to find location, try another place', undefined);
        } else {
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const weatherDesc = body.current.weather_descriptions[0];
            callback(undefined, `${weatherDesc}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
        }
    })
}

module.exports = forecast;
