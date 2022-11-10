const { User, Profile, Post } = require('../models/index');

class ControllerProfile {
  static getProfile(req, res) {
    const { UserId } = req.session
    const { search } = req.query

    let user

    User.findByPk(2, { include: Profile })
      .then((result) => {
        user = result
        return Post.findAll({ where: { UserId: 2 } })
      })
      .then((posts) => {
        // res.send(posts)
        res.render("profile", { user, posts })
      })
      .catch((err) => {
        console.log(err);
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
        UserId: 2
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