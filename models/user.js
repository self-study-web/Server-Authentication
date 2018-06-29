const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true}, // will be saved as lowercase
    password: String
});

// On save hook, encrypt password
    // - before saving the model, run this function
userSchema.pre('save', function(next) {
    // get access to the user (user.email, user.password)
    const user = this;

    // generate a salt, then run callback
    bcrypt.genSalt(10, function (err, salt) {
        if(err) {
            return next(err);
        }
        
        // hash (encrypt) the password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            // overwrite plain text password with encrypted password
            user.password = hash;
            // next from pre save hook - go ahead and save the model
            next();
        });
    });
});

// whenever we create user object, its going to have access to any functions that we 
// define on methods object
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
}

// Create our model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;