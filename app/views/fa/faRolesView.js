define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/faRolesTemplate.html',
  'collections/fa/FaRolesCollection',
], function($, _, Backbone, faRolesTemplate, FaRolesCollection){   

  var FaRolesView = Backbone.View.extend({
    el: $('#content'),
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
    },
    events: {
      'click .open-modal' : 'openModal',
      'click .close-m'      : 'closeModal',
      'click .save'       : 'closeModal'
    },
    openModal: function(){
      $('#menage-role').modal('show');
    },
    closeModal: function(){
      $('#menage-role').modal('hide');
    }
  });
  return  FaRolesView;
});