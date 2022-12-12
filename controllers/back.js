const products = require("../data/wines.json")

const adminGET = (req, res)=>{
    res.render('admin',{
      titulo: "Admin",
      products : products.products
    })
}

const agregarProductoGET = (req, res)=>{
    res.render('agregar-producto', {})
}

const editarProductoGET = (req, res)=>{
    res.render('editar-producto', {})
}

module.exports = {adminGET, agregarProductoGET, editarProductoGET}