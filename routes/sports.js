var express = require('express');
var router = express.Router();
var { Sport } = require('../data/db.js');

/* GET sports listing. */
router.get('/', function(req, res, next) {
  res.send('send list of all sports');
});

/* POST users listing. */
router.post('/', async function(req, res, next) {
  const newUser = new Sport({firstName: "Jessica", lastName: "Lim", year: 5, sport: 'Field Hockey'})
  await newUser.save();
  res.send('respond with a resource');
});

module.exports = router;