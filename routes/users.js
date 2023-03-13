var express = require('express');
var router = express.Router();
var { User } = require('../data/db.js');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let queryParameters = {};
    let idParam = req.query.id;
    let firstNameParam = req.query.firstName;
    let lastNameParam = req.query.lastName;
    let sportParam = req.query.sport;
    let sexParam = req.query.sex;
    if (idParam) {
      queryParameters["_id"] = idParam;
    }
    if (firstNameParam) {
      queryParameters["firstName"] = firstNameParam;
    }
    if (lastNameParam) {
      queryParameters["lastName"] = lastNameParam;
    }
    if (sportParam) {
      queryParameters["sport"] = sportParam;
    }
    if (sexParam) {
      queryParameters["sex"] = sexParam;
    }
    const response = await User.find(queryParameters);
    let usersList = [...response];
    res.send({users: usersList, requestStatus: true});
  } catch(err) {
    console.log(err)
    res.status(404).send({requestStatus: false});
  }
});

/* GET users listing. */
router.get('/all', async function(req, res, next) {
  try {
    const response = await User.find();
    let usersList = [...response];
    res.send({users: usersList, requestStatus: true});
  } catch(err) {
    console.log(err)
    res.status(404).send({requestStatus: false});
  }
});

/* GET users with specific id */
router.get('/:id', async function(req, res, next) {
  try {
    const user = await User.findOne({_id: req.params.id})
    res.send({user: user, requestStatus: true});
  } catch(err) {
    console.log(err);
    res.status(404).send({requestStatus: false});
  }
});

/* POST users listing. */
router.post('/', async function(req, res, next) {
  try {
    const newUser = new User({firstName: req.body.firstName, lastName: req.body.lastName, year: req.body.year, sport: req.body.sport ? req.body.sport : "", sex: req.body.sex});
    //{ "firstName": "Eshaan", "lastName": "C", "year": 4, "sport": "soccer" }
    await newUser.save();
    res.send('New user created');
  } catch(err) {
    console.log(err);
    res.status(404).send({requestStatus: false});
  }
});

module.exports = router;
