const request = require('request')


const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=268a73e92f68f76ec6842263be283641&query=/'+latitude + ' ' + longitude+'&units=m'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } 
        else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } 
        else {
            // console.log(response.body)
            callback(undefined, {
                data: body.current.temperature
            })
        }
    })
}


module.exports = forecast