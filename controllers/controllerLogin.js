const { User, Profile } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerLogin {
  static getLogin(req, res) {
    let { error } = req.query
    res.render('login', { error })
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
          // console.log(user);
          let checkPassword = bcrypt.compareSync(password, user.password)
          if (checkPassword) {
            req.session.regenerate(err => {
              if (err) {
                res.send(err)
              } else {
                req.session.UserId = user.id
                req.session.role = user.role
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
            let error = `Invalid Password or Username`
            res.redirect(`/login?error=${error}`)
          }
        } else {
          let error = `Invalid Password or Username`
          res.redirect(`/login?error=${error}`)
        }
      })
      .catch((err) => {
        res.send(err)
      });
  }
}

module.exports = ControllerLogin