define([
  'jquery',
  'underscore',
  'backbone',
  'views/task/taskCommentView',
], function($, _, Backbone, TaskCommentView){

  var TaskCommentsView = Backbone.View.extend({
    tagName: 'div',
    className: 'comments',
    render: function(){  
        this.collection.each(function(comment){
        var commentView = new TaskCommentView({model: comment});
        commentView.render();
        this.$el.append(commentView.el);
      }, this);
        return this;
    },
    initialize: function(){
      this.render();
    }

  });

  return TaskCommentsView;
  
});
