define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/work/elementTemplate.html'
], function($, _, Backbone, elementTemplate){

  var ElementView =  Backbone.View.extend({
    tagName: 'li',
    className: 'draggable-item row-fluid',
    template: _.template(elementTemplate),

    render: function(){
      // counter -  is used for mark each element in a table
      // linkTo - is used for creating <a> links if it is needed
      var data = {
        progress: this.options.progress,
        task: this.model
      }
      this.$el.html(this.template(data));
      this.$el.attr("task-id", this.model.get("id"));
      return this;
    }
  });
  
  return ElementView;

});
