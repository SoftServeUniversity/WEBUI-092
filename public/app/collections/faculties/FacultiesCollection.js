define([
  'jquery',
  'underscore',
  'backbone',
  'models/faculty/FacultyModel'
], function($, _, Backbone, FacultyModel){

  var FacultiesCollection = Backbone.Collection.extend({
    model: FacultyModel,
    //url: "app/mocks/faculties.json"
    url: "/faculties/"
  });

  return FacultiesCollection;
});