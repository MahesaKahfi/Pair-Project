const { User, Profile } = require('../models/index');

class ControllerRegister {
  static getRegister(req, res) {
    let { errors } = req.query
    if (errors) {
      errors = errors.split(",")
    }
    res.render('register', { errors })
  }

  static postRegister(req, res) {

    const { fullName, phoneNumber, username, dateOfBirth, email, password, address } = req.body
    User.create({ username, password })
      .then((user) => {
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
        // res.send(err.errors);
        let errors = err.errors.map(el => {
          return el.message
        })
        res.send(errors)
      });
  }
}

module.exports = ControllerRegister