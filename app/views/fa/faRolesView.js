define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/faRolesTemplate.html',
  'collections/fa/FaRolesCollection',
], function($, _, Backbone, faRolesTemplate, FsRolesCollection){    
    var FaRolesView = Backbone.View.extend({
        collection : new FaRolesCollection(),
        initialize : function (){},
        render     : function (){
            //load mock data
            this.collection.fetch({
                url: "app/mocks/roles.json",
                async:false
            });
            this.collection.each(function(role) {
                var roleView = new RoleView({model: role});
                this.$el.append(roleView.render().el);
            }, this);

            return this;
        }

    });
    return  FaRolesView;
});