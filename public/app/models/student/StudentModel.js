define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var StudentModel = Backbone.Model.extend({
    urlRoot: "/students/",
    defaults: {
      name: "Петро",
      middle_name: "Петрович",
      last_name: "Петренко",
      email: "Unknown",
      progress: 20,
      group: 0
    }
  });

  return StudentModel;

});