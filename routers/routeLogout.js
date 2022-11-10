const router = require('express').Router();
const Controller = require('../controllers/controllerLogout');

router.get('/', Controller.logout)

module.exports = router