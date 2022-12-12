const products = require("../data/wines.json")

const indexGET = (req, res)=>{
    res.render('index',{
      titulo: "Wine Store",
      products : products.products
    })
}

const loginGET = (req, res)=>{
    res.render('login',{  })
}

const aboutGET = (req, res)=>{
    res.render('about',{
      titulo: "Sobre nosotros"
    })
}

const contactGET =  (req, res)=>{
    res.render('contact',{
      titulo: "Contactanos"
    })
}

module.exports = { indexGET, aboutGET, contactGET, loginGET}