var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../app')
  , context = describe
  , User = mongoose.model('User')
  , agent = request.agent(app)

//routes test

describe('Routes Tests', function(){


  describe('GET /profile', function(){
    it ('should render profile.html file', function(done) {
      agent
      .get('/profile')
      .expect('Content-Type', /html/)
      .expect(200)
      .end(done)
    }
  )})
})
