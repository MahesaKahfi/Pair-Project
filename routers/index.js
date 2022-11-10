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
router.use('/home', (req, res) => {
  if (!req.session.UserId) res.redirect('/login')
  else routeHome
})
router.use('/logout', (req, res) => {
  if (!req.session.UserId) res.redirect('/login')
  else routeLogin
})

module.exports = router