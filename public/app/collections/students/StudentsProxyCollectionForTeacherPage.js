define([
  'jquery',
  'underscore',
  'backbone',
  'models/student/StudentProxyModelForTeacherGroupPage'
  ],
  function($, _, Backbone, StudentProxyModelForTeacherGroupPage)
  {
    var StudentsProxyCollectionForTeacherPage = Backbone.Collection.extend({
      model: StudentProxyModelForTeacherGroupPage,
      url: '/students/',
      comparator: function(item) {
        // set sort by first - group_pending, second - name
        // ! - for display first students, who must be pending
        return [!item.get('role_pending'), item.get('name')];
      }
    });

    return StudentsProxyCollectionForTeacherPage;
  });