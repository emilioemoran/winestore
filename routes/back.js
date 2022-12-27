const express = require('express')
const router = express.Router()

const{ adminGET, agregarProductoGET,editarProductoGET, agregarProductoPOST, editarProductoPOST,borrarProducto, loginGET,loginPOST} = require('../controllers/back')


router.get('/admin',adminGET)

router.get('/login',loginGET)
router.post('/login',loginPOST)

router.get('/agregar-producto',agregarProductoGET)
router.post('/agregar-producto',agregarProductoPOST)

router.get('/editar-producto/:id',editarProductoGET)
router.post('/editar-producto/:id',editarProductoPOST)
  
router.get('/borrar/:id',borrarProducto)
router.use((req, res, next)=>{
    res.status(404).render('404')
})

module.exports = router;