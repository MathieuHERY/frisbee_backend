const mongoose = require('mongoose')

const frisbeesSchema = mongoose.Schema({
   CreatedDate:Date,
   userCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
   userInvited: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
   Sport: String,
   isAccepted:String,
   AddressMeeting: String,
   DateMeeting:Date,
   HoursMeeting: String,
})

const frisbeesModel = mongoose.model('frisbees', frisbeesSchema)

module.exports = frisbeesModel