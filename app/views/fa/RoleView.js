define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/RoleTemplate.html',
], function($, _, Backbone, RolesTemplate){    
  var ElementView = Backbone.View.extend({
      tagName:'tr' ,
      template: _.template(RoleTemplate),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit')
        return this; //enables chained calls
      },
      initialize: function(){
        this.model.on('change', this.render, this);
      },
      events: {
        'dblclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'blur .edit' : 'close'
      },
      
  });
  return RoleTemplate;
});