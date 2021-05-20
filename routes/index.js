var express = require('express');
var router = express.Router();

var uid2 = require('uid2')
var bcrypt = require('bcrypt');

var userModel = require('../models/users'); // Import du modèle Users
const { updateOne } = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// route inscription
router.post('/sign-up', async function(req,res,next){

  var error = []
  var result = false
  var saveUser = null
  var token = null


  const data = await userModel.findOne({
    email: req.body.Email
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(
     req.body.Email == ''
  || req.body.Password == ''
  ){
    error.push('Les champs sont vides')
  }


  if(error.length == 0){

    var hash = bcrypt.hashSync(req.body.Password, 10);
    var newUser = new userModel({
      Firstname: req.body.Firstname,
      Email: req.body.Email,
      Password: hash,
      token: uid2(32),
      Age: req.body.Age,
      Description: req.body.Description,
      FavoritesSports: req.body.FavoritesSports,
      SportsHabits: req.body.SportsHabits,
      SportsHours: req.body.SportsHours,
      UserPicture: req.body.UserPicture,
    })
  
    saveUser = await newUser.save()
  
    
    if(saveUser){
      result = true
      token = saveUser.token
    }
  }

  res.json({result, saveUser, error, token})
})

// USER ROUTE - SHOW ALL USERS
// Je récupère TOUS les utilisateurs dans la BDD que je vais filtrer en front
router.get('/users', async function(req, res, next) {
  
  var usersData = await userModel.find() ; 

  res.json({usersData})

})


// MY LOCATION ROUTE - GET MY OWN LATITUDE AND LONGITUDE
// if myLocation est à true : faire un update sur la collection User avec mon ID (dans MongoDB) et mettre à jour la latitude et longitude
// else ne fait rien
router.post('/my-location', async function(req, res, next) {
  var myLocation = await userModel.findById(token);

  if (myLocation) {
    const currentLocation = userModel.updateOne({UserLatitude: '', UserLongitude: ''}) // besoin de dynamiser la latitude et la longitude
    
    res.json({ result: true, currentLocation: currentLocation })

  } else {
    res.json({ result: false })
  }

})



module.exports = router;
