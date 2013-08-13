/*
 * цей View підвантажує додає в таблицю рядок з новим елементом
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/tabChildView',
  'text!templates/admin/newElementTemplate.html'
  
], function($, _, Backbone, TabChildView, newElementTemplate){   
   
  var NewElementView = TabChildView.extend({
    
    tagName: 'div',
    

    render: function (data){
      
      var that = this;
      
      var compiledTemplate = _.template(newElementTemplate, data);
      that.$el.html(compiledTemplate);
      return this;
    },
    
  });
  
  return NewElementView;
  
});