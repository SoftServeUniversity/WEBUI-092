define([
  'jquery',
  'underscore',
  'backbone',
  'models/faculty/FacultyModel'
], function($, _, Backbone, FacultyModel){

  var FacultiesCollection = Backbone.Collection.extend({
    model: FacultyModel,
    url: "/faculties"
  });

  var Fac = new FacultiesCollection()
      Fac.fetch();

  console.log(Fac.toJSON())
  return FacultiesCollection;
});