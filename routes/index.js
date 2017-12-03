var express = require('express');
var router = express.Router();
const booking = require('../handlers/booking');

const config = require('../config');
const initState = Object.assign({}, config);
console.log("initState:",JSON.stringify(initState))

/* GET home page. */
router.get('/', function(req, res, next) {
  booking.lumos(initState)
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: '登录' });
});
module.exports = router;
