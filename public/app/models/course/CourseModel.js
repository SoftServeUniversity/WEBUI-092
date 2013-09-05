define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var CourseModel = Backbone.Model.extend({
    defaults:{
    },
     
    urlRoot: '/courses/'
  });

  return CourseModel;

});
