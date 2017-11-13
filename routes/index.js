const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const models = require('../models');

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

router.get('/', function(req, res, next) {
  models.Page.findAll()
  .then(function(allPage){
    res.render('index', {pages: allPage});
  })

});

module.exports = router;
