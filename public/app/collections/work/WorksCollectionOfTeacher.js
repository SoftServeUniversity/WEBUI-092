define([
  'jquery',
  'underscore',
  'backbone',
  'models/work/WorkProxyModelForTeacherPage'
  ],
  function($, _, Backbone, WorkProxyModelForTeacherPage)
  {
    var WorksCollectionOfTeacherGroup = Backbone.Collection.extend({
      model:WorkProxyModelForTeacherPage,
      //url: "app/collections/teachers/WorksCollectionOfTeacher.json",
      url: '/works/',
      comparator: function(item) {
        return item.get('full_name');
      }
    });

    return WorksCollectionOfTeacherGroup;
  });