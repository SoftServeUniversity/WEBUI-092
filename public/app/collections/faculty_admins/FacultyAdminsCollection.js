define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

  var FacultyAdminsCollection = Backbone.Collection.extend({
    url: "/faculty_admins/"
  });

  return FacultyAdminsCollection;
});