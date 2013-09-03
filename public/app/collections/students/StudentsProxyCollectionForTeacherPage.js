define([
  'jquery',
  'underscore',
  'backbone',
  'models/student/StudentProxyModelForTeacherGroupPage'
  ],
  function($, _, Backbone, StudentProxyModelForTeacherGroupPage)
  {
    var StudentsProxyCollectionForTeacherPage = Backbone.Collection.extend({
      model:StudentProxyModelForTeacherGroupPage,
      url: "app/collections/teachers/studentsOfTeacherGroup.json",
      comparator: function(item) {
        return [item.get('group_pending'), item.get('student_full_name')];
      }
    });

    return StudentsProxyCollectionForTeacherPage;
  });