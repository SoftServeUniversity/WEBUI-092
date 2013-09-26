define([
  'jquery',
  'underscore',
  'backbone',
  'models/work/WorkModel'

], function($, _, Backbone, WorkModel){

  var WorkCollection = Backbone.Collection.extend({
    model: WorkModel,
    url: '/works/',
    comparator: function(item) {
        // set sort stusents by group
        if (item.attributes &&
            item.attributes.student &&
            item.attributes.student.course_name) {
          return [item.attributes.student.course_name];
        }
      }
  });

  return WorkCollection;

});
