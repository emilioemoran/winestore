const express = require('express')
const router = express.Router()

const {indexGET, aboutGET, contactGET, loginGET} =require('../controllers/front')

router.get('/',indexGET)
  
router.get('/index', indexGET)
  
router.get('/login',loginGET)
  
router.get('/about',aboutGET)
  
router.get('/contact',contactGET)

module.exports = router;