var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
 }

 mongoose.connect(process.env.MONGODBURL,
   options,        
   function(err) {
    console.log(err);
  }
 );