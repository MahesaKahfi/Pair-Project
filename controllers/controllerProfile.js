const { User, Profile, Post } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerProfile {
  static getProfile(req, res) {
    const { UserId } = req.session
    const { search } = req.query

    User.findByPk(UserId, {
      include: [
        {
          model: Post,
          where: search ? Post.searchPost(search) : {}
        },
        {
          model: Profile
        }
      ]
    })
      .then((user) => {
        // res.send(user)
        res.render("profile", { user })
      })
      .catch((err) => {
        res.send(err)
      });
  }

  static getProfileEdit(req, res) {
    const { UserId } = req.session

    Profile.findOne({ where: { UserId: UserId } })
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
      { where: { UserId: UserId } }
    )
      .then((result) => {
        res.redirect("/profile")
      })
      .catch((err) => {
        res.send(err)
      });
  }

  static getDeletePost(req, res) {
    const { id } = req.params
    const { UserId } = req.session

    Post.destroy({
      where: {
        id: id,
        UserId: UserId
      }
    })
      .then(() => {
        res.redirect("/profile")
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = ControllerProfile