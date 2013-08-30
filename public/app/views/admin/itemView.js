define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/itemTemplate.html'

    
], function ($, _, Backbone, ItemTemplate) {   
  
var ItemView = Backbone.View.extend({ 
  
  tagName: 'tr', 
  
  className: 'toggle-list model',
  
  initialize: function(data){
    this.data = data;

  },
  
  render: function(){
  	var compiledTemplate = _.template(ItemTemplate, this.data);
    this.$el.html(compiledTemplate); 
    return this;
  }

});

return  ItemView;

});













