var express = require('express');
var router = express.Router();
var usersModel = require("../models/usersSchema"); // LIEN+NOM DE LA CONSTANTE À AJUSTER // Import du modèle Users

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
