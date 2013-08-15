define([
  'jquery',
  'underscore',
  'backbone',
  'models/student/StudentProxyModelForTeacherPage'
  ],
  function($, _, Backbone, StudentProxyModelForTeacherPage)
  {
    var StudentsProxyCollectionForTeacherPage = Backbone.Collection.extend({
      model:StudentProxyModelForTeacherPage,
      url: "app/collections/teachers/studentsCollection.json"
    });
    return StudentsProxyCollectionForTeacherPage;
  });