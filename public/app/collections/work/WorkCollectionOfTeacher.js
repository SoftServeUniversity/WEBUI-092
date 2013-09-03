define([
  'jquery',
  'underscore',
  'backbone',
  'models/work/WorkModelForTeacherPage'
  ],
  function($, _, Backbone, WorkModelForTeacherPage)
  {
    var WorksCollectionOfTeacherGroup = Backbone.Collection.extend({
      model:WorkModelForTeacherPage,
      url: "app/collections/works/studentsOfTeacherGroup.json",
      comparator: function(item) {
        return [item.get('group_pending'), item.get('full_name')];
      }
    });

    return WorksCollectionOfTeacherGroup;
  });