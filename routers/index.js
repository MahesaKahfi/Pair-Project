const router = require('express').Router();
let routeLogin = require('./routeLogin');
let routeRegister = require('./routeRegister');
let routeLogout = require('./routeLogout');

router.get('/', (req, res) => {
  res.send('landing page')
})
router.use('/login', routeLogin)
router.use('/register', routeRegister)
router.use('/logout', routeLogout)

module.exports = router