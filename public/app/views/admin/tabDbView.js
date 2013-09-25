define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/tabDbTemplate.html'

], function($, _, Backbone, tabDbTemplate){

  var TabDbView = Backbone.View.extend({

    tagName: 'div',

    initialize: function(){
      this.render();
    },

    render: function (){
      var that = this;
      var compiledTemplate = _.template(tabDbTemplate);
      this.$el.html(compiledTemplate);
    }

  });

  return  TabDbView;

});