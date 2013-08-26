define([
  'jquery',
  'underscore',
  'backbone',
  'models/student/StudentProxyModelForTeacherPage'
  ],
  function($, _, Backbone, StudentProxyModelForTeacherPage)
  {
    var StudentsCollectionOfTeacherGroup = Backbone.Collection.extend({
      model:StudentProxyModelForTeacherPage,
      url: "app/collections/teachers/studentsOfTeacherGroup.json"
    });
    return StudentsCollectionOfTeacherGroup;
  });