define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var WorkModel = Backbone.Model.extend({
	urlRoot: "http://localhost:3000/works"

  });

  return WorkModel;

});