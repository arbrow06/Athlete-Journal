var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var athleteSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    dob: Date
});

athleteSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Athlete', athleteSchema);