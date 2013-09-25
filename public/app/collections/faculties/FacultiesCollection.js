define([
  'jquery',
  'underscore',
  'backbone',
  'models/faculty/FacultyModel'
], function($, _, Backbone, FacultyModel){

  var FacultiesCollection = Backbone.Collection.extend({
    model: FacultyModel,
    url: "/faculties/"
  });

  return FacultiesCollection;
});