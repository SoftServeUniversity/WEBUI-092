define([
  'jquery',
  'underscore',
  'backbone',
  'models/faculties/FacultyModel'
], function($, _, Backbone, FacultyModel){

  var FacultiesCollection = Backbone.Collection.extend({
    model: FacultyModel,
    url: "app/mocks/faculties.json"
  });

  return FacultiesCollection;
});