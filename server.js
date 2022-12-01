const express = require('express')
const app = express()
const port = 3000
const hbs = require('hbs')
const products = require("./data/wines.json")


app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + '/views/partials', function (err) {})

app.use(express.static('public'))


console.log(products.products)
app.get('/',function (req, res){
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})