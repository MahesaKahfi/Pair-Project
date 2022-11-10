const router = require('express').Router();
let routeLogin = require('./routeLogin');
let routeRegister = require('./routeRegister');
let routeLogout = require('./routeLogout');
let routeHome = require('./routeHome');

router.get('/', (req, res) => {
  res.send('landing page')
})
router.use('/login', routeLogin)
router.use('/register', routeRegister)
router.use('/logout', routeLogout)
router.use('/home', routeHome)

module.exports = router