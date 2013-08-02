/*
 * Відображає таблицю, отриману з tabChild***Template + додає кнопки управління
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/tabParentTemplate.html'
], function($, _, Backbone, TabParentTemplate){   
   
  var TabParentView = Backbone.View.extend({
    
    tagName: 'div',
    
    
    
    initialize: function(tabChildSupView){
      var that= this;
      
      this.TabChildSupView = new tabChildSupView();
      
      //subscribe to rendering of child Super View 
      GlobalEventBus.on('tabChildSupViewLoaded', function(){
      	that.render();
      })
      
    },
    
    render: function (){
      console.log('hello from tab-parent view')

      var compiledTemplate = _.template(TabParentTemplate);
      
      this.$el.empty();
     
      this.$el.append(this.TabChildSupView.$el.html())
      this.$el.append(compiledTemplate());  
      
      return this;
      GlobalEventBus.off('tabChildSupViewLoaded');
    },
    
  });
  
  return  TabParentView;
  
});