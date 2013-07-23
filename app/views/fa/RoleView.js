define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/RoleTemplate.html',
], function($, _, Backbone, RolesTemplate){    
  var ElementView = Backbone.View.extend({
<<<<<<< HEAD
      tagName:'tr' ,
=======
      tagName: 'td',
>>>>>>> old-state
      template: _.template(RoleTemplate),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.inputUserRole = this.$('.edit_role')
        this.inputUserName = this.$('.edit_name')
        return this; //enables chained calls
      },
      initialize: function(){
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
      },
      events: {
        'dblclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'blur .edit' : 'close',
        'click .toggle': 'toggleCompleted',
        'click .destroy': 'destroy'
      },
      edit: function(){
        this.$el.addClass('.editing');
        this.inputUserRole.focus();
      },
      close: function(){
        var role_name_value = this.inputUserRole.val().trim();
        var user_name_value = this.inputUserName.val().trim();
        if(role_name_value && user_name_value){
          this.model.save({user_name: user_name_value, role_name: role_name_value});
        }
        this.$el.removeClass('editing');
      },
      updateOnEnter: function(e){
        if(e.which == 13){
          this.close();
        }
      },
      destroy: function(){
        this.model.destroy();
      }
  });
  return RoleTemplate;
});