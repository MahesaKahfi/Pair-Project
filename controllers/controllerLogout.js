class Controller{
  static logout(req, res) {
    req.session.UserId = null
    req.session.save(function (err) {
      if (err) next(err)
      req.session.regenerate((err) => {
        if (err) next(err)
        else res.redirect('/')
      })
    })
  }
}

module.exports = Controller