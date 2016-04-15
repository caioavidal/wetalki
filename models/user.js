var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
var _ = require('lodash');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    last: Date
});

userSchema.methods.isDataValid = function (callback) {
    if (_.isEmpty(this.name.trim())) {
        callback(true, "No name was given");
    }
    
    callback(false,null);
}

userSchema.methods.findByEmail = function (callback) {
    User.find({ email: this.email }, callback);
}

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    errorMessages: {
        IncorrectPasswordError: 'Password or email are incorrect',
        IncorrectUsernameError: 'Password or email are incorrect',
        MissingUsernameError: 'No email was given',
        UserExistsError: 'A user with the given email is already registered'
    }
});

var User = module.exports = mongoose.model('User', userSchema);