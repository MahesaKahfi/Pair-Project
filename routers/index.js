const router = require('express').Router();
let routeLogin = require('./routeLogin');


router.get('/', (req, res) => {
  res.send('landing page')
})

router.use('/login', routeLogin)
router.get('/register', ControllerRegister.getRegister)

module.exports = router