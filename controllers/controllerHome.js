const { User, Profile, Post } = require('../models/index');
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");

class ControllerHome {
  static getHome(req, res) {
    const { search } = req.query
    console.log(req.session);
    User.findAll({
      include: [
        {
          model: Post,
          where: search ? { title: { [Op.iLike]: `%${search}%` } } : {}
        },
        {
          model: Profile
        }
      ]
    })
      .then((users) => {
        res.render("home", { users })
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

  static postAdd(req, res) {
    const { title, imageUrl, description } = req.body
    const { userId } = req.session

    Post.create({ title, imageUrl, description, UserId: userId })
      .then(() => {
        res.redirect("/home")
      }).catch((err) => {
        console.log(err);
        res.send(err)
      });
  }

  static getProfile(req, res) {
    const { userId } = req.session

    User.findByPk(userId, {
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

  static getDeletePost(req, res) {
    const { id } = req.params
    const { userId } = req.session

    Post.destroy({
      where: {
        id: id,
        UserId: userId
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