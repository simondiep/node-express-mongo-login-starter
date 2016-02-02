'use strict';
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

// Set up Mongo Schema
var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Before saving user, hash the password
userSchema.pre('save', function(callback) {
  var user = this;
  if (!user.isModified('password')) {
    return callback();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return callback(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return callback(err);
      }
      user.password = hash;
      callback();
    });
  });
});


// Async verification of password
userSchema.methods.verifyPassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
