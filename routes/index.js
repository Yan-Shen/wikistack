const express = require('express');
const router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', function(req, res, next) {
  res.send('Home Page');
});

module.exports = router;
