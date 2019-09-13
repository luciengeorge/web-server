const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/869fc6e809ef43b96cc30725d2e115c4/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, response, { error: errorMessage, daily, currently }) => {
    if (error) {
      callback('unable to connect to weather service', undefined);
    } else if (errorMessage) {
      callback(errorMessage, undefined);
    } else {
      callback(undefined, {
        summary: daily.data[0].summary,
        temperature: currently.temperature,
        precipProbability: Math.round(currently.precipProbability * 100)
      });
    }
  });

}

module.exports = forecast;
