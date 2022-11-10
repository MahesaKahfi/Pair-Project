const { User, Profile, Post } = require('../models/index');
const bcrypt = require('bcryptjs');

class ControllerHome {
  static getHome(req, res) {
    console.log(req.session);
    Profile.findAll({
      include: {
        model: User,
        include: Post
      }
    })
      .then((profiles) => {
        res.render("home", { profiles })
      })
      .catch((err) => {
        res.send(err)
      });
  }

  static getAdd(req, res) {
    console.log(req.session);
    Profile.findAll({
      include: {
        model: User,
        include: Post
      }
    })
      .then((profiles) => {
        res.render("addPost", { profiles })
      })
      .catch((err) => {
        res.send(err)
      });
  }
}

module.exports = ControllerHome