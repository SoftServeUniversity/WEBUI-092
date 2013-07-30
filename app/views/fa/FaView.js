define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/faPageTemplate.html',
], function($, _, Backbone, faPage){   

  var FaView = Backbone.View.extend({
    el: $('#content'),
    initialize: function(){
      this.render();
    },
    render: function (){
      var that = this;

      var compiledTemplate = _.template( faPage, {welcome: 'Welcome to MEGA Admin-Panel'} );

      this.$el.html(compiledTemplate);
    },
  });
  return  FaView;
});