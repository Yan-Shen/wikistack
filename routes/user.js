const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/:userId', function(req, res, next) {

    var userPromise = models.User.findById(req.params.userId);
    var pagesPromise = models.Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });

    Promise.all([
      userPromise,
      pagesPromise
    ])
    .then(function(values) {
      var user = values[0];
      var pages = values[1];
      console.log('user is', user)
      res.render('user', { user: user, pages: pages });
    })
    .catch(next);

  });

router.get('/', function(req, res, next) {
  models.User.findAll({})
  .then(function(selectedUser){
    res.render('user', {users: selectedUser});
  })
});


router.post('/', function(req, res, next) {
  res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
  res.send('got to GET /wiki/add');
});

module.exports = router;
