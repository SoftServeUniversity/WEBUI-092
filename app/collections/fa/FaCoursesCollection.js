define([
  'jquery',
  'underscore',
  'backbone',
  'models/fa/FaCourseModel',
], function($, _, Backbone, FaCourseModel){
  var FaCoursesCollection = Backbone.Collection.extend({
    model: FaCourseModel,
    url: "app/mocks/fa/courses.json"
  });
  return FaCoursesCollection;
});