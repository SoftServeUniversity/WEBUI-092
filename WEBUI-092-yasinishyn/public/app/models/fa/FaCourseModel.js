define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var FaCourseModel = Backbone.Model.extend({
    defaults:{
      id: null,
      name: null,
      percentage: null
    }
  });

  return FaCourseModel;
});