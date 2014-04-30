var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../app')
  , context = describe
  , User = mongoose.model('User')
  , agent = request.agent(app)

//routes test

describe('Routes Tests', function(){

   before(function (done) {
    require('./helper').clearDb(done)
  })

  describe('GET /profile', function(){
    it ('should render profile.html file', function(done) {
      agent
      .get('/profile')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(done)
    }
  )})

  describe('GET /', function(){
    it ('should render index.html file', function(done) {
      agent
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(done)
    }
  )})
  describe('GET /logout', function(){
    it ('should render index.html file', function(done) {
      agent
      .get('/logout')
      .expect('Content-Type', "text/plain; charset=UTF-8")
      .expect(302)
      .end(done)
    }
  )})
})
