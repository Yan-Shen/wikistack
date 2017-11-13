const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next){
  models.Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      {model: models.User, as: 'author'}
    ]
  })
  .then(function(foundPage){
    console.log('foundpage is', foundPage)
    if (foundPage === null) {
      res.status(404).send();
  } else {
      res.render('wikipage', {
          page: foundPage
      });
    }
  })
  .catch(next);
});

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  models.User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function (values) {

    var user = values[0];

    var page = models.Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });

  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);


});



module.exports = router;
