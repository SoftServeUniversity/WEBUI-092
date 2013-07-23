define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/faRolesTemplate.html',
  'collections/fa/FaRolesCollection',
], function($, _, Backbone, faRolesTemplate, FaRolesCollection){    
  var rolesList = new FaRolesCollection();
  var FaRolesView = Backbone.View.extend({
    el: $('#content'),
    template: _.template(faRolesTemplate),
    initialize: function (){
      this.inputUserName = this.$('#new-name');
      this.inputUserRole = this.$('#new-role');
      rolesList.on('add', this.addAll, this);
      rolesList.on('reset', this.addAll, this);
      rolesList.fetch(); //loades rolies list from licalstorage
      this.render();
    },
    events: {
      'keypress #new-role': 'createRoleOnEnter'
    },
    createRoleOnEnter: function(e){
      if(e.which !==13 || this.inputUserRole.val().trim() || this.inputUserName.val().trim()){ //ENTER key code == 13
        return;
      }
      rolesList.create(this.newAttributes());
      this.inputUserRole.val('');//cleans inputs box
      this.inputUserName.val('');
    },
    addOne: function(role){
      var view = new RoleView({model: role});
      $('#roles-list').append(view.render().el);
    },
    addAll: function(){
      this.$('#roles-list').html('') //clean the todo list
      rolesList.each(this.addOne, this);
    },
    newAttributes: function(){
      return{
        user_name: this.inputUserName.val().trim(),
        user_role: this.inputUserRole.val().trim()
      }
    }
  });
  return  FaRolesView;
});