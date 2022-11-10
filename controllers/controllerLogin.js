const { User, Profile } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerLogin {
  static getLogin(req, res) {
    let { errors } = req.query
    res.render('login', { errors })
  }

  static postLogin(req, res) {
    let { username, password } = req.body
    User.findOne({
      where: {
        username: username
      }
    })
    .then((user) => {
      if (user) {
        let checkPassword = bcrypt.compareSync(password, user.password)
        if (checkPassword) {
          req.session.regenerate(err => {
            if (err) {
              res.send(err)
            } else {
              req.session.userId = user.id
              req.session.save(err => {
                if (err) {
                  res.send(err)
                } else {
                  res.redirect('/home')
                }
              })
            }
          })
        } else {
          let error = `invalid Password`
          res.redirect(`/login?error=${error}`)
        }
      } else {
        let error = `invalid Username`
        res.redirect(`/login?error=${error}`)
      }
    })
    .catch((err) => {
      res.send(err)
    });
  }
}

module.exports = ControllerLogin