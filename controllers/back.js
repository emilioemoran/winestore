/* const products = require("../data/wines.json")
 */
const db = require('../models/connection.js')



const adminGET = (req, res)=>{

    let sql = "SELECT * FROM Wines"

    db.query(sql,(err, data)=>{
      if(err)throw err
      res.render('admin',{
        titulo: "Wine Store",
        products : data
      })
    })

}

const agregarProductoGET = (req, res)=>{
  res.render("agregar-producto", {
    mensaje: "producto agregado",
    titulo: "agregar un producto"
  })
}

const editarProductoGET = (req, res)=>{
  const id = req.params.id
  const wine = req.body
  let sql = 'SELECT * FROM Wines WHERE id =?'
  db.query(sql,  id, (err, data)=>{
    if (err) throw err
    if(data==""){
      res.send(
        `<h1> no existe el producto con id ${id}</h1>`
      )
    }
    else{
      res.render("editar-producto",
      {
        titulo:"editar producto",
        producto: data[0]
      })
    }
  })
}

const agregarProductoPOST = (req, res)=>{
  let wine = req.body
  let sql = 'INSERT INTO Wines SET ?'

  db.query(sql, wine, (err, data)=>{
    if (err) throw err
    res.render("agregar-producto", {
      mensaje: "producto agregado",
      titulo: "agregar un producto"
    })
  })
}

const editarProductoPOST = (req, res)=>{
  const id = req.params.id
  const wine = req.body
  
  let sql = "UPDATE Wines SET ? WHERE id = ?"

  db.query(sql, [wine, id], (err, data)=>{
    if (err) throw err
    res.redirect('/admin')
  })
}

const borrarProducto = (req, res)=>{
  const id = req.params.id
  let sql = 'DELETE FROM Wines WHERE id = ?'
  db.query(sql,  id, (err, data)=>{
    if (err) throw err
    res.redirect('/admin')
  })
}

module.exports = {adminGET, agregarProductoGET, editarProductoGET,agregarProductoPOST, editarProductoPOST, borrarProducto}