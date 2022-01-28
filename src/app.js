const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);

// console.log(path.join(__dirname, '../public'));

const app = express();

const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//handlebar template
//setup handlebars engine and views location
//first parameter must be same as in express docs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kishore',
        coAuthor: 'Mom'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kishore Kumar',
        coAuthor: 'Dad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help Screen',
        title: 'Help',
        name: 'Kishore',
        coAuthor: 'Friend'
    })
})

//.get --> get request
//.post --> post request
// app.com
// app.get('', (req, res) => {
//     res.send('<h1>Hello express</h1>');
// })

// app.com/help
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Kishore',
//         age: 25
//     });
// })

// // app.com/about
// app.get('/about', (req, res) => {
//     res.send('you are in the about page');
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
             error: 'Provide an address to search'
         })
     }

    const address = req.query.address;

    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error });
        }
        foreCast(latitude, longitude, (error, forecastData) => {
            if(error) {
                res.send({ error });
            }
            res.send({
                location,
                forecast: forecastData,
                address
            });
        })
    })
})

app.get('/products', (req, res) => {
    // http://localhost:3000/products?search=apple&place
    // console.log(req.query.search)
    if (!req.query.search) {
       return res.send({
            error: 'Provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kishore',
        errorMsg: 'help article not found'
    })
})

//404 page --> * --> all urls which does not match
//should always come last because it is sequential in express
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kishore',
        errorMsg: 'page not found'
    })
})


//start server on a local port
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});