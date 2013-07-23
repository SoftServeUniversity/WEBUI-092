define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/faRolesTemplate.html',
  'collections/fa/FaRolesCollection',
], function($, _, Backbone, faRolesTemplate, FaRolesCollection){   

  var FaRolesView = Backbone.View.extend({
    el: $('#content'),
    template: _.template(faRolesTemplate),
    initialize: function (){
      this.render();
    },
    render: function (){
      var that = this;

      var faRolesCollection = new FaRolesCollection();
        faRolesCollection.fetch({
            url: "app/mocks/roles.json",
            async: false
        });
      var data = {
          entities: faRolesCollection.models,
          _: _
        };
      var compiledTemplate = _.template( faRolesTemplate, data);

      this.$el.html(compiledTemplate);
    }
  });
  return  FaRolesView;
});