var express = require('express');
var router = express.Router();

console.log('Autodoc: initialized');

router.get('/', function(req, res, next){
  res.render('autodoc/autodoc_layout', {title: 'Autodoc View'});
});

module.exports = router;
