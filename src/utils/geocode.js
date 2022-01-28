const request = require('request');

const geoCode = (address, callback) => {
    //instead of ${address}, can use encodeURIComponent(address) in url, coz if any special characters are passed, it will encode and wont throw error
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2lzaG9yZXJ1YmlrIiwiYSI6ImNreXUxb3pwdzAyeGcycXMyamJ0Mnc4aDEifQ.tSJJnJ0wcWaqwC4Zp7ZG-g`;
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location, try another place', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;
