define([
  'jquery',
  'underscore',
  'backbone',
  'models/faculties/FacultiesChangeModel'

], function($, _, Backbone, FacultiesChangeModel){

  var FacultiesChangeCollection = Backbone.Collection.extend({
  	model: FacultiesChangeModel,
  	url: "app/mocks/facultiesChange.json"
  });
  
  return FacultiesChangeCollection;
});
