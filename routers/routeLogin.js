const router = require('express').Router();
const Controller = require('../controllers/controllerLogin');

router.get('/', Controller.getLogin)
router.post('/', Controller.postLogin)
router.get('/checkusername', Controller.getCheckUsername)
router.post('/checkusername', Controller.postCheckUsername)
router.get('/changepassword', Controller.getUpdatePassword)
router.post('/changepassword', Controller.postUpdatePassword)


module.exports = router