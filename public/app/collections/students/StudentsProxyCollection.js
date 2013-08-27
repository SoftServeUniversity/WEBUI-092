define([
  'jquery',
  'underscore',
  'backbone',
  'models/student/StudentProxyModel'
  ],
  function($, _, Backbone, StudentProxyModel)
  {
    var StudentsCollection = Backbone.Collection.extend({
      model:StudentProxyModel,
      url: 'app/mocks/students.json'
    });
    return StudentsCollection;
  });
