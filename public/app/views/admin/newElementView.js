/*
 * цей View підвантажує додає в таблицю рядок з новим елементом
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'text!templates/admin/newElementTemplate.html'
  
], function($, _, Backbone, ParentTabView, newElementTemplate){   
   
  var NewElementView = ParentTabView.extend({
    
    tagName: 'div',
    

    render: function (data){
      console.log(data)
      var that = this;
      
      var compiledTemplate = _.template(newElementTemplate, data);
      that.$el.html(compiledTemplate);
      return this;
    },
    
  });
  
  return NewElementView;
  
});