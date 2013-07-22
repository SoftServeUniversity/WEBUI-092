define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
  var HelloView = Backbone.View.extend({
    el: '#content',
    initialize: function(){
      this.render();
    },
    render: function(){
      this.$el.html("Hello World");
    }
  });
  return HelloView;
});