var express = require('express');
var router = express.Router();
var { Record } = require('../data/db.js');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let queryParameters = {};
    let idParam = req.query.id;
    let exerciseParam = req.query.exerciseType;
    let userParam = req.query.userId;
    if (idParam) {
      queryParameters["_id"] = idParam;
    }
    if (exerciseParam) {
      queryParameters["exerciseType"] = exerciseParam;
    }
    if (userParam) {
      queryParameters["userId"] = userParam;
    }
    const response = await Record.find(queryParameters);
    let recordsList = [...response];
    res.send({records: recordsList, requestStatus: true});
  } catch(err) {
    console.log(err)
    res.status(404).send({requestStatus: false});
  }
});

/* GET record listing. */
router.get('/all', async function(req, res, next) {
  try {
    const response = await Record.find();
    let recordsList = [...response];
    res.send({records: recordsList, requestStatus: true});
  } catch(err) {
    console.log(err)
    res.status(404).send({requestStatus: false});
  }
});

/* GET records with specific id */
router.get('/:id', async function(req, res, next) {
  try {
    const record = await Record.findOne({id: req.params.id})
    res.send({record: record, requestStatus: true});
  } catch(err) {
    console.log(err);
    res.status(404).send({requestStatus: false});
  }
});

/* POST records listing. */
router.post('/', async function(req, res, next) {
  try {
    const newRecord = new Record({userId: req.body.uid, exerciseType: req.body.exerciseType, side: req.body.side, max: req.body.max, avg: req.body.avg, data: req.body.data, date: new Date()});
    await newRecord.save();
    res.send('New record created');
  } catch(err) {
    console.log(err);
    res.status(404).send({requestStatus: false});
  }
});

module.exports = router;