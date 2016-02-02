'use strict';
var request = require('supertest');
var app = require('../app.js');

//Async tests that call done()

describe('GET /', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /login', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /signup', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /invalid-url', function() {
  it('should return 404', function(done) {
    request(app)
      .get('/invalid-url')
      .expect(404, done);
  });
});