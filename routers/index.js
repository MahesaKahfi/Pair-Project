const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('halo ini home')
})

module.exports = router