const express = require('express')
const app = express()
const port = 3000
const hbs = require('hbs')
const path = require('path')
const rutasFront = require('./routes/front')
const rutasBack = require('./routes/back')
const bodyParser = require("body-parser");
const products = require("./data/wines.json")
require ('./views/helpers/helpers.js')
require('dotenv').config()


app.set('view engine', 'hbs')
app.set('views',
[path.join('./views/front'),
path.join('./views/back'),
path.join('./views')
])

hbs.registerPartials(__dirname + '/views/partials', function (err) {})

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', rutasFront)
app.use('/', rutasBack)


app.use((req, res, next)=>{
  res.status(404).render('404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})