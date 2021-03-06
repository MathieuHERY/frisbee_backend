var express = require('express');
var router = express.Router();
var request = require('sync-request');
var uid2 = require('uid2')
var uniqid = require('uniqid');
var fs = require('fs');
var bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
});


var userModel = require('../models/users'); // Import du modèle Users
var placesModel = require('../models/places')
var frisbeesModel = require('../models/frisbees');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// route inscription
router.post('/sign-up', async function (req, res, next) {

  var error = []
  var result = false
  var saveUser = null
  var token = null

  const data = await userModel.findOne({
    Email: req.body.Email
  })

  if (data != null) {
    error.push("Aïe ! L'utilisateur déjà existant")
  }

  if (error.length == 0) {

    var hash = bcrypt.hashSync(req.body.Password, 10);
    var newUser = new userModel({
      Firstname: req.body.Firstname,
      Email: req.body.Email,
      Password: hash,
      token: uid2(32),
      Age: req.body.Age,
      Description: req.body.Description,
      FavoritesSports: JSON.parse(req.body.FavoritesSports),
      SportsHabits: req.body.SportsHabits,
      SportsHours: req.body.SportsHours,
      UserPicture: req.body.UserPicture,
      UserLatitude: req.body.UserLatitude,
      UserLongitude: req.body.UserLongitude

    })

    saveUser = await newUser.save()


    if (saveUser) {
      result = true
      token = saveUser.token
    }
  }

  res.json({ result, saveUser, error, token })
})


/* POST Upload picture received from app. */
router.post('/upload-user-picture', async (req, res, next) => {

  /* console.log(req.files.picture) */
  var imagePath = `./tmp/userPhoto_${uniqid()}.jpeg`

  var resultCopy = await req.files.picture.mv(imagePath)

  if (!resultCopy) {

    var resultCloudinary = await cloudinary.uploader.upload(imagePath,
      { width: 580, height: 580 }
    );

    res.json({ url: resultCloudinary.url, imageSaved: true });

  } else {
    res.json({ imageSaved: false });
  }
  fs.unlinkSync(imagePath);
}
)


//connexion 
router.post('/sign-in', async function (req, res, next) {

  var result = false;
  var user = null;
  var error = [];
  var token = null;

  if (req.body.Email == ''
    || req.body.Password == ''
  ) {
    error.push("Aïe ! L'un des champs est vide")
  }

  if (error.length == 0) {
    user = await userModel.findOne({
      Email: req.body.Email,
    })
    if (user) {
      if (bcrypt.compareSync(req.body.Password, user.Password)) {
        result = true
        token = user.token
      } else {
        result = false
        error.push('Aïe ! Mot de passe incorrect')
      }
    } else {
      error.push('Aïe ! Email incorrect')
    }
  }


  res.json({result, user, error, token })
})


// USER ROUTE - SHOW ALL USERS
router.get('/users-filtered', async function (req, res, next) {
  var usersData = await userModel.find();
  res.json({ usersData })
})

// get Pins to display to Map
router.get('/places', async function (req, res, next) {
  var PinsData = await placesModel.find()
  res.json({ PinsData })
})



//add new Pins
router.post("/newplace", async function (req, res, next) {
  var newPlace = new placesModel({
    name: req.body.name,
    address: req.body.address,
    sport: req.body.sport,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    picture: req.body.picture,
  })

  savePlace = await newPlace.save()
  res.json({ result: true })
})

//get all Frisbee
router.get("/allfrisbees", async function (req, res, next) {

  var frisbees = await frisbeesModel.find().populate('userCreator').populate('userInvited').exec();

  res.json({ frisbees })
})

//Accept frisbee
router.post("/accept-frisbee", async function (req, res, next) {

  var Updatefrisbees = await frisbeesModel.updateOne({ _id: req.body._id }, { isAccepted: req.body.isAccepted })

  if (Updatefrisbees) {
    res.json({ result: true })
  } else {
    res.json({ result: false })
  }
})

//Reject frisbee
router.post("/reject-frisbee", async function (req, res, next) {

  var Updatefrisbees = await frisbeesModel.updateOne({ _id: req.body._id }, { isAccepted: req.body.isAccepted })

  if (Updatefrisbees) {
    res.json({ result: true })
  } else {
    res.json({ result: false })
  }
})


router.post("/send-frisbee", async function (req, res, next) {
  var newFrisbee = new frisbeesModel({
    CreatedDate: new Date(),
    userCreator: req.body.userCreator,
    userInvited: req.body.userInvited,
    Sport: req.body.Sport,
    Message: req.body.Message,
    isAccepted: "null",
    AddressMeeting: req.body.AddressMeeting,
    DateMeeting: req.body.DateMeeting,
    HoursMeeting: req.body.HoursMeeting,
  })

  saveFrisbee = await newFrisbee.save()
  res.json({ result: true })

})

/* // Logout
router.get('/logout', async (req, res, next) => {
  req.session.user = null;
});
 */

module.exports = router;
