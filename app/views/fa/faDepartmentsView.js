define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/departmentsListTemplate.html',
  'collections/fa/FaDepartmentsCollection',
], function($, _, Backbone, departmentsListTemplate, FaDepartmentsCollection){   

  var FaDepartmentsView = Backbone.View.extend({
    el: $('#content'),
    render: function (){
      var that = this;

      var faDepartmentsCollection = new FaDepartmentsCollection();
        faDepartmentsCollection.fetch({
            url: "app/mocks/fa/departments.json",
            async: false
        });
      var data = {
          entities: faDepartmentsCollection.models,
          _: _
        };
      var compiledTemplate = _.template( departmentsListTemplate, data);

      this.$el.html(compiledTemplate);
    },
    events: {
      'click .open-modal' : 'openModal',
      'click .close-m'    : 'closeModal',
      'click .save'       : 'closeModal'
    },
    openModal: function(){
      $('#menage-department').modal('show');
    },
    closeModal: function(){
      $('#menage-department').modal('hide');
    }
  });
  return  FaDepartmentsView;
});