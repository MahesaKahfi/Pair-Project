const { User, Profile, Post } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerHome {
  static getHome(req, res) {
    Profile.findAll({
      include: {
        model: User,
        include: Post
      }
    })
      .then((profiles) => {
        // res.send(profiles)
        res.render("home", { profiles })
      })
      .catch((err) => {
        console.log(err);
        res.send(err)
      });
  }
}

module.exports = ControllerHome