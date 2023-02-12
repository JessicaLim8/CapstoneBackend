var express = require('express');
var router = express.Router();
var { Sport } = require('../data/db.js');

/* GET sports listing. */
router.get('/', async function(req, res, next) {
  try {
    let coachParam = req.query.coach;
    let queryParameters = {};
    if (coachParam) {
      queryParameters["coach"] = coachParam;
    }
    const response = await Sport.find(queryParameters);
    let sportList = [...response];
    res.send({sport: sportList, requestStatus: true});
  } catch(err) {
    console.log(err);
    res.status(404).send({requestStatus: false});
  }
});

/* POST sports listing. */
router.post('/', async function(req, res, next) {
  try {
    const newSport = new Sport({sport: req.body.sport, coach: req.body.coach ? req.body.coach : ""});
    await newSport.save();
    res.send('New sport created');
  } catch(err) {
    console.log(err);
    res.status(404).send({requestStatus: false});
  }
});

module.exports = router;