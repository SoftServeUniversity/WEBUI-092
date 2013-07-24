define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/notFound.html'
], function($, _, Backbone, notFound){

  var NotFoundView = Backbone.View.extend({
    tagName: 'div',
    className: 'not-found', 
    template: _.template(notFound),
    render: function(){  
      this.$el.html(this.template());
      $('#content').html(this.el);
    }

  });
  return NotFoundView;
  
});