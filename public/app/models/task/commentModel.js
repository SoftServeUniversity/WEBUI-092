define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var commentModel = Backbone.Model.extend({
	defaults: {
	    "id": Math.round(Math.random()*10e10),
	    "author": "Student",
	    "date": "7 / 12 / 2013",
	    "content": "Enter comment"
	}
  });

  return commentModel;

});