const { User, Profile } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerLogin {
  static getLogin(req, res) {
    res.render('login')
  }
}

module.exports = ControllerLogin