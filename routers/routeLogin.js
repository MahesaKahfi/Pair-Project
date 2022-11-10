const router = require('express').Router();
const Controller = require('../controllers/controllerLogin');

router.get('/', Controller.getLogin)
router.post('/', Controller.postLogin)

module.exports = router