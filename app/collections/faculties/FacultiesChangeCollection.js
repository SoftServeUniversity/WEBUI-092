define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	

  var FacultiesChangeCollection = function(){
  	var c = new Backbone.Collection();
  	c.url = "app/mocks/facultiesChange.json";
  	return c;
  }
  return FacultiesChangeCollection;
});
