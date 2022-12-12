const express = require('express')
const app = express()
const port = 3000
const hbs = require('hbs')
const path = require('path')
const rutasFront = require('./routes/front')
const rutasBack = require('./routes/back')
const products = require("./data/wines.json")
require ('./views/helpers/helpers.js')


app.set('view engine', 'hbs')
app.set('views',
[path.join('./views/front'),
path.join('./views/back'),
path.join('./views')
])

hbs.registerPartials(__dirname + '/views/partials', function (err) {})

app.use(express.static('public'))

app.use('/', rutasFront)
app.use('/', rutasBack)


app.get('/',function (req, res){
  res.render('index',{
    titulo: "Wine Store",
    products : products.products
  })
})

app.get('/index',function (req, res){
  res.render('index',{
    titulo: "Wine Store",
    products : products.products
  })
})

app.get('/login',function (req, res){
  res.render('login',{  })
})

app.get('/about',function (req, res){
  res.render('about',{
    titulo: "Sobre nosotros"
  })
})

app.get('/contact',function (req, res){
  res.render('contact',{
    titulo: "Contactanos"
  })
})

//rutas de Back

app.get('/admin',function (req, res){
  res.render('admin',{
    titulo: "Admin",
    products : products.products
  })
})

app.use((req, res, next)=>{
  res.status(404).render('404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})