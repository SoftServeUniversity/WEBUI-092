define([
  'jquery',
  'underscore',
  'backbone',
  'views/work/ElementView'
], function($, _, Backbone, ElementView){

  var ListView = Backbone.View.extend({
    render: function () {
          var me = this;
        _.each(this.collection.models, function(currentTask) {
          var progress = this.options.taskProgresses.where({"task_id": currentTask.get("id")});
          var elementView = new ElementView({model: currentTask, progress: progress[0].get("progress")});
          this.$el.append(elementView.render().$el);
        }, this)

      return this;
    }

  });
  return  ListView;
});

