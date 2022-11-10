const router = require('express').Router();
const Controller = require('../controllers/controllerHome');

router.get('/', Controller.getHome)
router.get('/add', Controller.getAdd)
router.post('/add', Controller.postAdd)
router.get('/delete/:id', Controller.getDeletePost)

module.exports = router