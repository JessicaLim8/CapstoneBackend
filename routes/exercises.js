var express = require('express');
var router = express.Router();
var { Exercise } = require('../data/db.js');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let queryParameters = {};
    let idParam = req.query.id;
    let exerciseParam = req.query.exercise;
    if (idParam) {
      queryParameters["_id"] = idParam;
    }
    if (exerciseParam) {
      queryParameters["exercise"] = exerciseParam;
    }
    console.log(queryParameters);
    const response = await Exercise.find(queryParameters);
    let exerciseList = [...response];
    res.send({exercise: exerciseList, requestStatus: true});
  } catch(err) {
    console.log(err)
    res.status(404).send({requestStatus: false});
  }
});

/* GET users listing. */
router.get('/all', async function(req, res, next) {
  try {
    const response = await Exercise.find();
    let exerciseList = [...response];
    res.send({exercise: exerciseList, requestStatus: true});
  } catch(err) {
    console.log(err)
    res.status(404).send({requestStatus: false});
  }
});

/* POST exercise listing. */
router.post('/', async function(req, res, next) {
  try {
    const newExercise = new Exercise({exercise: req.body.exercise, description: req.body.description})
    // { "exercise": "plantarflexion", "description": "Level of plantarflexion" }
    await newExercise.save();
    res.send('New exercise created');
  } catch(err) {
    console.log(err);
    res.status(404).send({requestStatus: false});
  }
});

module.exports = router;
