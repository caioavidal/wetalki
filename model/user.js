  var mongoose = require( 'mongoose' );
  
  var userSchema = mongoose.Schema({
            name: String,
            email: String,
            password: String
        });
        
userSchema.methods.doesEmailAlreadyExist = function (email) {
    User.find({ email: email }, 
                function (err, users) {
                    if (err) return console.error(err);
                    console.log(users);
                });
}

        
var User = module.exports = mongoose.model('User', userSchema);