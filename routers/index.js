const ControllerHome = require('../controllers/controllerHome');
const ControllerLogin = require('../controllers/controllerLogin');
const ControllerRegister = require('../controllers/controllerRegister');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`https://pair-project-mika-aji.herokuapp.com${req.url}`);
})

router.get('/home', ControllerHome.getHome)

router.get('/login', ControllerLogin.getLogin)
router.get('/register', ControllerRegister.getRegister)

module.exports = router