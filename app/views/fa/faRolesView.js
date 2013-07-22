define([
  'jquery',
  'underscore',
  'backbone',
  'views/fa/RoleView',
], function($, _, Backbone, RoleView){    
    var FaRolesView = Backbone.View.extend({
        collection : null,
        tagName: 'td',
        initialize : function (){},
        render     : function (){
          this.collection.each(function(element) {
            var elementView = new RoleView({model: element});
            this.$el.append(elementView.render().el);
          });

          return this;
        }

    });
    return  FaRolesView;
});