const router = require('express').Router();
let routeLogin = require('./routeLogin');
let routeRegister = require('./routeRegister');
let routeLogout = require('./routeLogout');
let routeHome = require('./routeHome');

router.get('/', (req, res) => {
  res.render('landing')
})
router.use('/login', routeLogin)
router.use('/register', routeRegister)
router.use('/home', routeHome)
router.use('/logout', routeLogout)

module.exports = router