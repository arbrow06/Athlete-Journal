var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var trackEventSchema = mongoose.Schema({
    
});

trackEventSchemaSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('trackEvent', trackEventSchemaSchema);