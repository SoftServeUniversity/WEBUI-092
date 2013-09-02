define([
  'jquery',
  'underscore',
  'backbone',
  'models/faculty/FacultiesChangeModel'

], function($, _, Backbone, FacultiesChangeModel){

  var FacultiesChangeCollection = Backbone.Collection.extend({
  	model: FacultiesChangeModel,
  	url: "/faculties/"
  });
  
  return FacultiesChangeCollection;
});
