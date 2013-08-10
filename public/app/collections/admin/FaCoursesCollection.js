define([
  'jquery',
  'underscore',
  'backbone',
  'models/admin/FaCourseModel',
], function($, _, Backbone, FaCourseModel){
  var FaCoursesCollection = Backbone.Collection.extend({
    model: FaCourseModel,
    url: "app/mocks/admin/courses.json"
  });
  return FaCoursesCollection;
});