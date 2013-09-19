define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone, FacultyModel){

  var FacultyAdminsCollection = Backbone.Collection.extend({
    url: "/users/get_faculty_admins"
  });

  return FacultyAdminsCollection;
});