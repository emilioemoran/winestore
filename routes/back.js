const express = require('express')
const router = express.Router()

const{ adminGET, agregarProductoGET,editarProductoGET} = require('../controllers/back')


router.get('/admin',adminGET)

router.get('/agregar-producto',agregarProductoGET)

router.get('/editar-producto',editarProductoGET)
  
router.use((req, res, next)=>{
    res.status(404).render('404')
})

module.exports = router;