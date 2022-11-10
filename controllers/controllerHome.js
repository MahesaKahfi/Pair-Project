const { User, Profile, Post } = require('../models/index');
const bcrypt = require('bcryptjs');
const toHourAndMinute = require('./helper/toHourAndMinute');
const postTime = require('./helper/postTime');


class ControllerHome {
  static getHome(req, res) {
    const { search } = req.query
    let { UserId, role } = req.session
    User.findAll({
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
      .then((users) => {
        res.render("home", { users, UserId, role, postTime })
      })
      .catch((err) => {
        res.send(err)
      });
  }

  static getAdd(req, res) {
    let { UserId, role } = req.session
    Profile.findAll({
      include: {
        model: User,
        include: Post
      }
    })
      .then((profiles) => {
        res.render("addPost", { profiles, UserId, role })
      })
      .catch((err) => {
        res.send(err)
      });
  }

  static postAdd(req, res) {
    const { title, imageUrl, description } = req.body
    const { UserId } = req.session

    Post.create({ title, imageUrl, description, UserId })
      .then(() => {
        res.redirect("/home")
      }).catch((err) => {
        console.log(err);
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
        res.redirect("/home")
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = ControllerHome