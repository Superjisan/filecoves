// console.log(process.env.NODE_ENV)

var mongoose = require('mongoose'),
    should = require('should'),
    app = require('../app'),
    context = describe
    User = mongoose.model('User');


describe('User Model Tests', function () {

  describe('User Model properties', function(){
  /**
   * Your model should have two fields (both required) of title and body
   */
  it('should have a name, e-mail, dropbox_id, roles', function (done) {
    var filter_category = {filter_options: [], select_value: '', input_values: '' }
    var user = new User({name: "Lamarcus Aldridge", email: "la@ripcity.com" , dropbox_id: "48", roles: ['client']});
    user.save(function(err) {
      user.name.should.equal("Lamarcus Aldridge");
      user.email.should.equal("la@ripcity.com");
      user.dropbox_id.should.equal("48");
      user.roles[0].should.equal('client')
      done(err);
      });
    });
  })

  it('should require name and email', function (done) {
    var user = new User({name: "Kevin Durant"});
    user.save(function(err) {
      err.message.should.equal("Validation failed");
      done();
    });
  });


  // /**
  //  * Set up an instance method (check out mongoose .methods) called asJSON that
  //  * will output the JSON representation of the model
  //  */
  // it('should have an instance method to get itself as JSON', function(done) {
  //   User.findOne({title: "My Article"}, function(err, article) {
  //     var jsonArticle = article.asJSON();
  //     jsonArticle.should.match(/"title":"My Article"/);
  //     done(err);
  //   });
  // });


  // *
  //  * Set up a static method called findByTitle that's a convenience
  //  * method to find by a title

  // it('should have a static method to findByTitle', function(done) {
  //   User.findByTitle("My Article", function(err, article) {
  //     article.body.should.equal("Isn't this interesting?");
  //     done(err);
  //   });
  // });


  // /**
  //  * Your Article model should also have a tag field that's an array
  //  * but when we access it, we should get the string joined by a comma
  //  *
  //  * Look at using getters in your Schema
  //  */
  // it('should have a tags field of [] that has a custom getter', function (done) {
  //   var user = new User({ title: "Taggy", body: "So Taggy" });
  //   article.tags = ["tag1", "tag2", "tag3"];
  //   article.tags.should.equal("tag1,tag2,tag3");
  //   done();
  // });

});
