/* const products = require("../data/wines.json") */
const nodemailer = require('nodemailer');

const db = require('../models/connection.js')


const indexGET = (req, res)=>{

    let sql = "SELECT * FROM Wines"

    db.query(sql,(err, data)=>{
      if(err)throw err
      res.render('index',{
        titulo: "Wine Store",
        products : data
      })
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

const contactPOST =  (req, res)=>{
  console.log('si entra')

  let data = req.body

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: 'eemoran1989@gmail.com',
      pass: 'wogsumwjcomtpgna'
    }
    /* auth:{
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    } */
  })

  const mailOptions= {
    from : data.nombre,
    to: 'emilioemoran@gmail.com',
    subject:'Mi pagina ejemplo',
    text:'Contenido'
  }

  transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      res.status(500, error.message)
      res.status(500).render('contact',{
        mensage: 'Ha ocurrido un error'+ error.message,
        mostrar: true,
        clase:'danger'
      })
    }
    else{
      res.status(200, info)
      res.status(200).render('contact',{
        mensage: 'mail enviado correctamente',
        mostrar: true,
        clase:'success'
      })
    }
  })
  
}

const teamGET = (req, res)=>{
  res.render('team',{
    titulo: "nuestro equipo"
  })
}



module.exports = { indexGET, aboutGET, contactGET, contactPOST, loginGET,teamGET}