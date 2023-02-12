var express = require('express');
var router = express.Router();
var { Sport } = require('../data/db.js');

/* GET sports listing. */
router.get('/', function(req, res, next) {
  res.send('Send list of all sports');
});

/* POST sports listing. */
router.post('/', async function(req, res, next) {
  const newSport = new Sport();
  await newSport.save();
  res.send('Successfully send sports');
});

module.exports = router;