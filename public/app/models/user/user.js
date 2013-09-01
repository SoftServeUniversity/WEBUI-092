define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
  // TODO: WARNING: Can't verify CSRF token authenticity. $(document).trigger('csrfToken'); 
  return Backbone.Model.extend({
    getRole: function(){
      return $.post('user_helper/return_current_role', {id: this.id}, null, "json").responseText; 
    },
    getAbilities: function(){
      return $.post('user_helper/receive_user_abilities', null, null, "json").responseText; 
    }
  });
});