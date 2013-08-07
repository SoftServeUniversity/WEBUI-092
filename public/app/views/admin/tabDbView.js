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
  
    render: function (data){
      var that = this;

      var compiledTemplate = _.template(tabDbTemplate);

      that.$el.html(compiledTemplate);
      
      return this;
    },
    
  });
  
  return  TabDbView;
  
});