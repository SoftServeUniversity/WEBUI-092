define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
  return Backbone.Model.extend({
    getRole: function(){
      return $.ajax({type: "POST", url: 'user_helper/return_current_role', data: {id: this.id}, dataType: "json", async: false}).responseText; 
    }
  });
});