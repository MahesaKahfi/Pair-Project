const { User, Profile } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerRegister {
  static getRegister(req, res) {
    let { errors } = req.query
    res.render('register')
  }

  static postRegister(req, res) {
    
  }
}

module.exports = ControllerRegister