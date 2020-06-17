const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for Express config

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs') //integrating express with hbs library for creating a dynamic page
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



/* app.get('', (req, res) => {
    res.send('Hello Express')
}) */ //defining what the server should when a user accesses the content on those urls

app.get('', (req, res) => {
    res.render('index', {
        title: "About me",
        name: "Andrew Mead"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather App",
        name: "Andrew Mead"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "How can I help you?",
        title: "Help",
        name: "Andrew Mead"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    

geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    
    if (error) {
        return res.send({
            error
        })
    }
    
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({
                error
            })
        }

        res.send({
        forecast: forecastData.weather,
        location,
        address: req.query.address
    })

    })
})
    
    
    
    
    
})




app.get("/products", (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

//app.com domain
//app.com/help
//app.com/anout   different pages

//start the server up

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})  // app.get need to be put last

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})