define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/itemTemplate.html'

    
], function ($, _, Backbone, ItemTemplate) {   
  
var ItemView = Backbone.View.extend({ 
  tagName: 'div', 
  initialize: function(){
    console.log(this.model);
    //this.render();
  },
  render: function(){
  	data = {};
  	var compiledTemplate = _.template(ItemTemplate, data);
    me.$el.html(compiledTemplate); 
  }

});

return  ItemView;

});













