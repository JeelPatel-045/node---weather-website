const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
 
//Defined PAth
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsDirectoryPath=path.join(__dirname,'../templates/Views')
const partialDirectoryPath =  path.join(__dirname,'../templates/Partials')

//Setup Path
app.set('views',viewsDirectoryPath)
app.set('view engine','hbs')
hbs.registerPartials(partialDirectoryPath)
// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render("index",{
        title:'Weather app',
        name: 'Jeel Chaniyara'
    })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title: 'About Page',
        name: "Jeel Chaniyara"
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        title: 'Help Page',
        name: "Jeel Chaniyara"
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide valid address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        // console.log(latitude)
        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:"You must provide a search term"
        })
    }

    res.send({
        products: []
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Jeel Chaniyara",
        errorMessage:"This is 404 Page"
    })

})



app.listen(3000,()=>{
    console.log('Server is on Port 3000')
})
