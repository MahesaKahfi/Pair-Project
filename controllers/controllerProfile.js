const { User, Profile, Post } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerProfile {
  static getProfile(req, res) {
    const { UserId } = req.session

    User.findByPk(2, {
      include: [
        {
          model: Post,
        },
        {
          model: Profile
        }
      ]
    })
      .then((user) => {
        res.render("profile", { user })
      })
      .catch((err) => {
        res.send(err)
      });
  }

  static getProfileEdit(req, res) {
    const { UserId } = req.session

    Profile.findOne({ where: { UserId: 2 } })
      .then((profile) => {
        res.render("editProfile", { profile })
      })
      .catch((err) => {
        res.send(err)
      });
  }

  static postProfileEdit(req, res) {
    const { UserId } = req.session
    const { fullName, phoneNumber, dateOfBirth, email, address } = req.body

    Profile.update(
      { fullName, phoneNumber, dateOfBirth, email, address },
      { where: { UserId: 2 } }
    )
      .then((result) => {
        res.redirect("/profile")
      })
      .catch((err) => {
        res.send(err)
      });

  }
}

module.exports = ControllerProfile