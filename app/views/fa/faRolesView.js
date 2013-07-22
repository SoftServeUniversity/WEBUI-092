define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/faRolesTemplate.html'
], function($, _, Backbone, faRolesTemplate){    
  var FaRolesView = Backbone.View.extend({
    el: $('#content'),
    template: _.template(faRolesTemplate),
    initialize: function (){
      this.render();
    },
    render: function (){
      this.$el.html(this.template({}));
    }
  });
  return  FaRolesView;
});