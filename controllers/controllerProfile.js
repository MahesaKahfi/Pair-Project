const { User, Profile, Post } = require('../models/index');
const qrcode = require("qrcode")

class ControllerProfile {
  static getProfile(req, res) {
    const { UserId, role } = req.session
    let str = `https://pair-project-mika-aji.herokuapp.com/${req.originalUrl}`
    qrcode.toDataURL(str, (err, src) => {
      if (err) res.send("Something went wrong!!");
      else {
        User.findByPk(UserId, {
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
            res.render("profile", { user, qr_code: src, role })
          })
          .catch((err) => {
            res.send(err)
          });
      }
    })
  }
  static getProfileEdit(req, res) {
    const { UserId, role } = req.session

    Profile.findOne({ where: { UserId } })
      .then((profile) => {
        res.render("editProfile", { profile, role })
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