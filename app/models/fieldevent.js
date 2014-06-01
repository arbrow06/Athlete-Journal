var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var fieldEventSchema = mongoose.Schema({
    
});

fieldEventSchemaSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('fieldEvent', fieldEventSchemaSchema);