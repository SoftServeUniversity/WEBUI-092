define([
  'jquery',
  'underscore',
  'backbone',
  'models/student/StudentModel'
  ],
  function($, _, Backbone, StudentModel)
  {
    var StudentsCollection = Backbone.Collection.extend({
      model:StudentModel,
      url: 'app/mocks/students.json'
    });
    return StudentsCollection;
  });
