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
      var ufo = {name: "НЛО", last_name: ""} 
      var author = this.model.get('user') || ufo;
      this.model.set({"name": author.name, "last_name": author.last_name});
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
  return TaskCommentView;
  
});