const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibHVjaWVuZ2VvcmdlIiwiYSI6ImNqdmNvZjJ5MDBiZXQ0NG96bGowbHUxM3QifQ.9WzPXb6M8o36uIxT4bUuhA&limit=1`;

  request({ url, json: true }, (error, response, { features }) => {
    if (error) {
      callback('unable to connect to location services', undefined);
    } else if (features.length === 0) {
      callback('unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      })
    }
  });
};

module.exports = geocode;
