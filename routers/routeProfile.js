const Controller = require('../controllers/controllerProfile');

const router = require('express').Router();

router.get('/', Controller.getProfile)
router.get('/edit', Controller.getProfileEdit)
router.post('/edit', Controller.postProfileEdit)
router.get('/delete/:id', Controller.getDeletePost)

module.exports = router