const { User, Profile } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerRegister {
  static getRegister(req, res) {
    res.render('register')
  }
}

module.exports = ControllerRegister