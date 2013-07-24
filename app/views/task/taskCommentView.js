define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/task/taskCommentTemplate.html'
], function($, _, Backbone, taskCommentTemplate){

  var TaskCommentView = Backbone.View.extend({
    tagName: 'div',
    className: 'well well-small', 
    template: _.template(taskCommentTemplate),
    render: function(){  
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
  return TaskCommentView;
  
});