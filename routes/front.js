const express = require('express')
const router = express.Router()

const {indexGET, aboutGET, contactGET, contactPOST, loginGET,teamGET} =require('../controllers/front')

router.get('/',indexGET)
  
router.get('/index', indexGET)
  
router.get('/login',loginGET)
  
router.get('/about',aboutGET)

router.get('/team',teamGET)
  
router.get('/contact',contactGET)

router.post('/contact',contactPOST)
module.exports = router;