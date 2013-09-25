define([
  'jquery',
  'underscore',
  'backbone',
  'models/faculty/FacultyChangeModel'
], function($, _, Backbone, FacultyChangeModel){

  var FacultyChangeCollection = Backbone.Collection.extend({
    model: FacultyChangeModel,
    url: "/progress_changes.json"
  });
    
  return FacultyChangeCollection;
});
