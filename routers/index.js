const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(`http://localhost:3000${req.url}`);
})

module.exports = router