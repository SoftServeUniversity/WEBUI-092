define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	
	
  var FacultiesCollection = function(){
  	var c =  new Backbone.Collection();
  	c.url = "app/mocks/faculties.json";
  	return c;
  }
  return FacultiesCollection;
});
