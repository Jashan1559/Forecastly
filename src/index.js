const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath)); 
// app.use(express.static(path.join(__dirname, '../public')));




/*--------------------------------------------------------------Routers-------------------------------------------------------------*/
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App', 
        name: 'Jashan'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Jashan',
        message: 'Help message'
    });
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About', 
        name: 'Jashan'
    });
})

app.get('/weather', (req, res) =>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "You must provide a search term"
        })
    }

    geocode(address, (error, data) =>{
        if(error){
            return res.send({error})
        }
        forecast(data.lat, data.lon, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            console.log(forecastData);
            res.send({
                LocationGivenToGeocode : address,
                Weather : forecastData, 
                LocationFromGeocode: data.display_name
            })

        })
    })
    
})


app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: 'Help', 
        name: 'Jashan', 
        msg: 'Help page not found'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 'Error',
        name: 'Jashan',
        msg: 'Page not found!'
    })
})

const port = 3000;
app.listen(port, () =>{
    console.log("Server running on port 3000");
})


// app.get('/products', (req,res) =>{
//     if(!req.query.search){
//          return res.send({
//             error: "You must provide a search term"
//         })
//     }

//     console.log(req.query.search);
//     res.send({
//         products: []
//     })
// })