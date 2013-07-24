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
      'click .open-modal'         : 'openModal',
      'click .close-m'            : 'closeModal',
      'click .save'               : 'closeModal',
      'click .open-modal-import'  : 'openModalImport',
      'click #newDepartment'      : 'newDepartment'
    },
    openModal: function(){
      $('#menage-department').modal('show');
    },
    closeModal: function(){
      $('#menage-department').modal('hide');
      $('#menage-department-import').modal('hide');
    },
    openModalImport: function(){
      $('#menage-department-import').modal('show');
    },
    newDepartment: function(){
      $('#content-table').append("<tr><td class='text-center'><input type='text' size='10' placeholder='Ender Name'></td><td class='text-center'><select><option selected value='Крокодил Гена'>Крокодил Гена</option><option value='Edvart Шапокляк'>Edvart Шапокляк</option><option value='Лариса Linkoln'>Лариса Linkoln</option></select></td><td class='text-center'><select><option selected value='Doing Nothing'>Doing Nothing</option><option value='Pickup'>Pickup</option><option value='Mathematics'>Mathematics</option></select></td><td class='text-center'><button class='btn btn-success'>Create</button></td></tr>");
    }
  });
  return  FaDepartmentsView;
});