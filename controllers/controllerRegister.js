const { User, Profile } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerRegister {
  static getRegister(req, res) {
    let { errors } = req.query
    res.render('register', { errors })
  }

  static postRegister(req, res) {
    // console.log(req.body);
    let { fullName, phoneNumber, username, dateOfBirth, email, password, address } = req.body
    User.create({ username, password })
    .then((user) => {
      // console.log(user);
      Profile.create({
        fullName,
        phoneNumber,
        dateOfBirth,
        email,
        address,
        UserId: user.id
      })
    })
    .then(() => {
      res.redirect('/login')
    })
    .catch((err) => {
      res.send(err)
    });
  }
}

module.exports = ControllerRegister