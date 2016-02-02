'use strict';
var chai = require('chai');
var should = chai.should();
var User = require('../models/User');

// Note : If any tests fail after creating a user, this user will remain in the database and subsequent test runs will fail.  You will need to either manually remove the user or run the delete test.
var TEST_USER_EMAIL = 'some_unique_user@someuniquetestuser.co';

describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      email: TEST_USER_EMAIL,
      password: 'password'
    });
    user.save(function(err) {
      if (err) return done(err);
      done();
    });
  });

  it('should not create a user with the unique email', function(done) {
    var user = new User({
      email: TEST_USER_EMAIL,
      password: 'password'
    });
    user.save(function(err) {
      if (err) err.code.should.equal(11000);
      done();
    });
  });

  it('should find user by email', function(done) {
    User.findOne({ email: TEST_USER_EMAIL }, function(err, user) {
      if (err) return done(err);
      user.email.should.equal(TEST_USER_EMAIL);
      done();
    });
  });
  
  it('should delete a user', function(done) {
    User.remove({ email: TEST_USER_EMAIL }, function(err) {
      if (err) return done(err);
      done();
    });
  });
});
