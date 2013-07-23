define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/RoleTemplate.html',
], function($, _, Backbone, RolesTemplate){    
  var ElementView = Backbone.View.extend({
      tagName: 'td',
      template: _.template(RoleTemplate),

      initialize:function(){
        this.render();
      } ,
      render:function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      }
  });
  return RoleTemplate;
});