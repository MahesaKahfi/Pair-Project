const ControllerProfile = require('../controllers/controllerProfile');

const router = require('express').Router();

router.get('/', ControllerProfile.getProfile)
router.get('/edit', ControllerProfile.getProfileEdit)
router.post('/edit', ControllerProfile.postProfileEdit)

module.exports = router