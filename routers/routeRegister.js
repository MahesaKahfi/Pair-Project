const router = require('express').Router();
const Controller = require('../controllers/controllerRegister');

router.get('/', Controller.getRegister)
router.post('/', Controller.postRegister)

module.exports = router