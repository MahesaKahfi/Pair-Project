const { User, Profile, Post } = require('../models/index');
const qrcode = require("qrcode")

class ControllerProfile {
  static getProfile(req, res) {
    const { UserId } = req.session
     let str = `https://pair-project-mika-aji.herokuapp.com/${req.originalUrl}`
    qrcode.toDataURL(str, (err, src) => {
    if (err) res.send("Something went wrong!!");
    else {
      console.log(src);
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
        // res.send(user)
        res.render("profile", { user, qr_code: src })
      })
      .catch((err) => {
        res.send(err)
      });
      }
    })
  }

  static getProfileEdit(req, res) {
    const { UserId } = req.session

    Profile.findOne({ where: { UserId } })
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