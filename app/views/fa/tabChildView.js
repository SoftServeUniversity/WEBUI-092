/*
 * Цей View отримує при ініціалізації всі необхідні дані
 * для побудови вмісту табів і рендерить універсальний tabChildTemplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/tabChildTemplate.html'
], function($, _, Backbone, tabChildTemplate){   
   
  var TabChildView = Backbone.View.extend({
    
    tagName: 'div',
    
    initialize: function(config){
      this.render(config)
    },
    
    events: {
    
    },
 
    
    render: function (config){
    	
      //console.log(config)
      
      var compiledTemplate = _.template(tabChildTemplate, config);
      this.$el.prepend(compiledTemplate);
      
      return this;
    },
    
  });
  
  return  TabChildView;
  
});