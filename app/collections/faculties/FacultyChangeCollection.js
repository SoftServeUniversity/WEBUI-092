define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	

  var FacultyChangeCollection = function(){
  	var c = new Backbone.Collection();
  	c.url = "app/mocks/facultyChange.json";
  	return c;
  }
  return FacultyChangeCollection;
});
