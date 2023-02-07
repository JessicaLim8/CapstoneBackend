var express = require('express');
var router = express.Router();
var { User } = require('../data/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Respond with all users');
});

/* POST users listing. */
router.post('/', async function(req, res, next) {
  const newUser = new User({firstName: "Jessica", lastName: "Lim", year: 5, sport: 'Field Hockey'})
  await newUser.save();
  res.send('respond with a resource');
});

module.exports = router;
