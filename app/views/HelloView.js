define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/helloTemplate.html'
], function($, _, Backbone, helloTemplate){
  var HelloView = Backbone.View.extend({
    el: $('#content'),
    template: _.template(helloTemplate),
    initialize: function(){
      this.render();
    },
    render: function(){
      this.$el.html(this.template({who: 'world'}));
    }
  });
  return HelloView;
});