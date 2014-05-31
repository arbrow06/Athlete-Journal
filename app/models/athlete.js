var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var athleteSchema = mongoose.Schema({
    username: String,
    password: 
    firstName: String,
    lastName: String,
    age: Number,
    usatfGroup: String,
    aauGroup: String
});

athleteSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Athlete', athleteSchema);