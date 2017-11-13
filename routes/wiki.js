const express = require('express');
const router = express.Router();
const models = require('../models');
router.get('/add', function(req, res, next) {
  res.render('addpage');
});
router.get('/:urlTitle', function(req, res, next){
console.log("REQ", req.params.urlTitle);
  //res.render("wikipage");
  models.Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render("wikipage", {page: foundPage});
  })
  .catch(next);
});

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
  ).then(function(newRow){
  //  models.Page.findAll({where: {title: req.body.title}})
  // })
  // // .then(function(newRow){
     console.log("NEW ROW", newRow);
    res.redirect(`/wiki/${newRow.urlTitle}`);
  })
  .catch(function(err){
    console.log("err", err);
  })
});



module.exports = router;
