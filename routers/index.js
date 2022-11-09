const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`https://pair-project-mika-aji.herokuapp.com${req.url}`);
})

module.exports = router