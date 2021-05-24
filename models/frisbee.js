const mongoose = require('mongoose')

const frisbeeSchema = mongoose.Schema({
   CreatedDate:Date,
   userCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
   userInvited: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
   Sport: String,
   isAccepted:String,
   AddressMeeting: String,
   DateMeeting:Date,
   HoursMeeting: String,
})

const frisbeeModel = mongoose.model('frisbee', frisbeeSchema)

module.exports = frisbeeModel