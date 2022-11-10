const { User, Profile } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerLogin {
  static getLogin(req, res) {
    let { error, alert } = req.query
    res.render('login', { error, alert })
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

  static getCheckUsername(req, res) {
    let { error } = req.query
    res.render('checkUsername', { error })
  }

  static postCheckUsername(req, res) {
    const { username } = req.body
    User.findOne({
      where: {
        username
      }
    })
    .then((user) => {
      res.redirect(`/login/changepassword?userid=${user.id}`)
    })
    .catch((err) => {
      let error = `No user found with username ${username}`
      res.redirect(`/login/checkusername?error=${error}`);
    });
  }

  static getUpdatePassword(req, res) {
    let { error } = req.query
    res.render('updatePassword', { error })
  }

  static postUpdatePassword(req, res) {
    const { password } = req.body
    const { userid } = req.query
    User.update({ 
      password
      }, { 
      where: {
        id: userid
      },
      individualHooks: true
    })
    .then((result) => {
      let alert = `password updated successfully`
      res.redirect(`/login?alert=${alert}`)
    })
    .catch((err) => {
      let error = `error changing password`
      res.redirect(`/login/updatepasssword?error=${error}`)
    });
  }
}

module.exports = ControllerLogin