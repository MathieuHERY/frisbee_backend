var express = require('express');
var router = express.Router();

var uid2 = require('uid2')
var bcrypt = require('bcrypt');

var userModel = require('../models/users')

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

//route connexion 

router.post('/sign-in', async function(req,res,next){

  var result = false
  var user = null
  var error = []
  var token = null
  
  if(req.body.Email == ''
  || req.body.Password == ''
  ){
    error.push('Les champs sont vides')
  }

  if(error.length == 0){
    const user = await userModel.findOne({
      Email: req.body.Email,
    })
  
    
    if(user){
      if(bcrypt.compareSync(req.body.Password, user.Password)){
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
      
    } else {
      error.push('email incorrect')
    }
  }
  

  res.json({result, user, error, token})


})

module.exports = router;
