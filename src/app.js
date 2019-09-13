const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

// setting up views directory
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // can be omitted if the views are in views folder
const partialsPath = path.join(__dirname, '../templates/partials'); // partials directory path


// setting up handlebars engine
app.set('view engine', 'hbs'); // setting up handlebars with hbs library
app.set('views', viewsPath); // setting up path of views folder. can be omitted if the views are in views folder
hbs.registerPartials(partialsPath); // setting up partials directory

// setting up static directory to serve
app.use(express.static(publicDirectoryPath));

// setting up dynamic routes
app.get('/', (req, res) => {
  res.render('index', {
    title:'weather app',
    name: 'Lucien'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title:'About',
    name: 'Lucien'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Lucien',
    message: 'What can I help you with?'
  });
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'An address must be provided'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ // return to prevent sending a second time if condition is valid
      error: 'you must provide a search term'
    })
  }

  res.send({
    products: []
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help Page not found',
    title: '404',
    name: 'Lucien'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'Lucien'
  });
});


// starts up the server and makes it listen on a specific port
app.listen(port, () => { // port 3000
  console.log(`server is up on port ${port}.`);
});
