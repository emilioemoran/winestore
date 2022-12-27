/* const products = require("../data/wines.json")
 */
const db = require('../models/connection.js')
const {multer,storage,maxSizeMB,upload} = require('../views/helpers/multer')
const fs = require('fs')

const adminGET = (req, res)=>{

    if(req.session.logueado){
      let sql = "SELECT * FROM Wines"

      db.query(sql,(err, data)=>{
        if(err)throw err
        res.render('admin',{
          titulo: "Wine Store",
          products : data
        })
      })
    }
    else{
      res.render('login',{
        titulo: "login",
        usuario: req.session.nombreUsuario,
        logueado: req.session.logueado
      })
    }

    
}

const agregarProductoGET = (req, res)=>{
  let logueado = req.session.logueado
  if(logueado){
  res.render("agregar-producto", {
    mensaje: "producto agregado",
    titulo: "agregar un producto"
  })
  }
  else{
    res.render('login',{
      titulo: "login",
      error:'por favor, debes loguearte para ver esta seccion'
    })
  }
}

const editarProductoGET = (req, res)=>{

  let logueado = req.session.logueado
  if(logueado){
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
  else{
    res.render('login',{
      titulo: "login",
      error:'por favor, debes loguearte para ver esta seccion'
    })
  }
}

const agregarProductoPOST = (req, res)=>{
  let logueado = req.session.logueado
  if(logueado){
    upload(req, res, error=>{
      if(error instanceof multer.MulterError){
        if(error.code ==="LIMIT_FILE_SIZE"){
          return res.status(400).render('agregar-producto',{mensaje:'imagen muy grande', clase:"danger"})
        }
        return res.status(400).render('agregar-producto',{mensaje: error.code,clase:"danger"})
      }
      else if (error){
       return res.status(400).render('agregar-producto',{mensaje:error,clase:"danger"})
      }
      else{
        let wine = req.body;
        let nombreImagen = req.file.filename;
        wine.picture = nombreImagen

        let sql = 'INSERT INTO Wines SET ?'

        db.query(sql, wine, (err, data)=>{
          if (err) throw err
          res.render("agregar-producto", {
            mensaje: "producto agregado",
            titulo: "agregar un producto",
            clase:"success"
          })
        })
        
      }
    })
  }
  else{
    res.render('login',{
      titulo: "login",
      error:'por favor, debes loguearte para ver esta seccion'
    })
  }
  
  
}

const editarProductoPOST = (req, res)=>{
  let logueado = req.session.logueado
  if(logueado){
    upload(req, res, error=>{
      if(error instanceof multer.MulterError){
        if(error.code ==="LIMIT_FILE_SIZE"){
          return res.status(400).render('agregar-producto',{mensaje:'imagen muy grande', clase:"danger"})
        }
        return res.status(400).render('agregar-producto',{mensaje: error.code,clase:"danger"})
      }
      else if (error){
       return res.status(400).render('agregar-producto',{mensaje:error,clase:"danger"})
      }
      else{
        const id = req.params.id
        const wine = req.body

        if(req.hasOwnProperty('file')){
          let nombreImagen = req.file.filename;
          wine.picture = nombreImagen

          let borrarImagen = "SELECT picture From Wines WHERE id = ?"
          db.query(borrarImagen, [id], (err, data)=>{
            if(err) throw err

            fs.unlink(`public/assets/img/wines/${data[0].picture}`, (err)=>{
              if (err) throw err
              let sql = "UPDATE Wines SET ? WHERE id = ?"

              db.query(sql, [wine, id], (err, data)=>{
                if (err) throw err
                res.redirect('/admin')
              })
            })
          })
        }
        else{
          let sql = "UPDATE Wines SET ? WHERE id = ?"

              db.query(sql, [wine, id], (err, data)=>{
                if (err) throw err
                res.redirect('/admin')
              })
        }
      }
    })
  }
  else{
    res.render('login',{
      titulo: "login",
      error:'por favor, debes loguearte para ver esta seccion'
    })
  }
}

const borrarProducto = (req, res)=>{
  const id = req.params.id

  let borrarImagen = "SELECT picture From Wines WHERE id = ?"
  db.query(borrarImagen, [id], (err, data)=>{
    if(err) throw err

    fs.unlink(`public/assets/img/wines/${data[0].picture}`, (err)=>{
      if (err) throw err
      let sql = 'DELETE FROM Wines WHERE id = ?'
      db.query(sql,  id, (err, data)=>{
        if (err) throw err
        res.redirect('/admin')
      })
    })
  })       


 
}

const loginGET = (req, res)=>{
  res.render('login',{  })
}

const loginPOST = (req, res)=>{
  const user = req.body.usuario
  const pass = req.body.password

  if(user && pass){
    let sql = 'SELECT * FROM Cuentas WHERE usuario = ? AND password = ?'
    db.query(sql, [user, pass],(err,data)=>{
      if(data.length>0){
        req.session.logueado = true; // creamos una propiedad "logueado" para usarlo en el header
        req.session.nombreUsuario = user
        res.redirect('/admin')
      }
      else{
        res.render('login',{
          titulo: "login",
          error: "nombre de usuario o contraseña incorrecta"
        })
      }
    })
  }
  else{
    res.render('login',{
      titulo: "login",
      error: "usuario o contraseña en blanco"
    })
  }
}

module.exports = {adminGET, agregarProductoGET, editarProductoGET,agregarProductoPOST, editarProductoPOST, borrarProducto, loginGET,loginPOST}