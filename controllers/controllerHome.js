const { User, Profile, Post } = require('../models/index');
const toHourAndMinute = require('./helper/toHourAndMinute');
const postTime = require('./helper/postTime');


class ControllerHome {
  static getHome(req, res) {
    // console.log(req.session);
    const { search } = req.query
    const { UserId, role } = req.session
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
      res.render("home", { users, UserId, role, postTime, home: true })
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
      res.render("addPost", { profiles, UserId, role, home: false })
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

  static getUsers(req, res) {
    let { role } = req.session
    if (role !== 'admin') {
      res.redirect('/home')
    } else {
      User.findAll()
      .then((data) => {
        res.render('userList', { data, role, home: true })
      }).catch((err) => {
        res.send(err)
      });
    }
  }

  static deleteUser(req, res) {
    let { id } = req.params
    User.destroy({
      where: {
        id
      }
    })
    .then((result) => {
      res.redirect('/home/userlist')
    }).catch((err) => {
      res.send(err)
    });
  }
}

module.exports = ControllerHome