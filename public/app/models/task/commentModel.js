define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  
  var commentModel = Backbone.Model.extend({
    url: "http://localhost:3000/task_changes",
  defaults: {
      "user_id": 1,
      "task_comment": "Enter comment"
  }
  });

  return commentModel;

});
