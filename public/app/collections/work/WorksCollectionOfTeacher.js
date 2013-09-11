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
      url: '/works/',
      comparator: function(item) {
        return item.get('full_name');
      }
    });

    return WorksCollectionOfTeacherGroup;
  });