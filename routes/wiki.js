const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  var page = req.body;
  models.Page.create(
    {
      title: page.title,
      content: page.content,
      status: page.status
    }
  ).then(function(){
    res.redirect('/');
  })
  .catch(function(err){
    console.log(err);
  })
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

module.exports = router;
