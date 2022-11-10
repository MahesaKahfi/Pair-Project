const router = require('express').Router();
const Controller = require('../controllers/controllerHome');

router.get('/', Controller.getHome)
router.get('/add', Controller.getAdd)
// router.post('/add', Controller.postAdd)

module.exports = router