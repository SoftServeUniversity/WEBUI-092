define([
  'jquery',
  'underscore',
  'backbone',
  'models/student/StudentProxyModelForTeacherPage'
  ],
  function($, _, Backbone, StudentProxyModelForTeacherPage)
  {
    var StudentsCollectionForTeacherConfirmations = Backbone.Collection.extend({
      model:StudentProxyModelForTeacherPage,
      url: "app/collections/teachers/studentsForTeacherConfirmation.json"
    });
    return StudentsCollectionForTeacherConfirmations;
  });