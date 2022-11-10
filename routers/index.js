const router = require('express').Router();
let routeLogin = require('./routeLogin');
let routeRegister = require('./routeRegister');
let routeLogout = require('./routeLogout');
let routeHome = require('./routeHome');
let routeProfile = require('./routeProfile');

router.get('/', (req, res) => {
  res.render('landing')
})
router.use('/login', routeLogin)
router.use('/register', routeRegister)
router.use((req, res, next) => {
  if (!req.session.UserId) {
    let error = `Please Login First`
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})
router.use('/home', routeHome)
router.use('/logout', routeLogout)
router.use('/profile', routeProfile)

module.exports = router