define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var commentModel = Backbone.Model.extend({
    url: "/task_changes",
     defaults: {
      "user_id": 1,
      "task_comment": "Enter comment"
  }
  });

  return commentModel;

});
