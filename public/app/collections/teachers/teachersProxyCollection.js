define([
  'jquery',
  'underscore',
  'backbone',
  'models/teacher/TeacherProxyModel'
  ],
  function($, _, Backbone, TeacherProxyModel)
  {
    var TeachersProxyCollection = Backbone.Collection.extend({
      model: TeacherProxyModel,
      url: '/teachers/'
    });
    return TeachersProxyCollection;
  });
