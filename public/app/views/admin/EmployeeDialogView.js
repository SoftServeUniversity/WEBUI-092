define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/employeeDialogTemplate.html',
  'collections/teachers/TeachersCollection',
  'views/admin/tableHeadView',
  'views/admin/dialogItemView'


], function($, _, Backbone, employeeDialogTemplate, TeachersCollection, TableHeadView, DialogItemView){

var EmployeeDialogView = Backbone.View.extend(
{
  el: '#content',
  el_modal: '#employee-modal',


  initialize: function (department_id) {

    this.collection = new TeachersCollection();
    this.collection.fetch({async: false, data: { filter: { department_id: department_id }}});
    _.each(this.collection.models,
        function(teacher, index){
        teacher.set('order', index + 1);
        teacher.set('pib',
            teacher.get('last_name') + ' ' +
                teacher.get('name') + ' ' +
                teacher.get('middle_name'));
        });
    this.config = this.setConfig();
    this.render();
  },

  setConfig: function(){
      var me = this;

      var config = {

          table_class: 'employee-table',

          collection: me.collection,

          fields: {
              order:{
                  label: '№',
                  type:  'static'
              },
              pib: {
                  label: 'П.І.Б.',
                  type:  'static'
              },
              degree: {
                  label: 'Наукове звання',
                  type:  'static'
              }

          },
          buttons: {
              employee: false
          }

      }

      return config;
  },

  hideModal: function () {
    $(this.el_modal).modal('hide');
  },
  showModal: function () {
    $(this.el_modal).modal('show');
  },

  render: function () {

      var me = this;

      //render containing table
      var compiledTemplate = _.template(employeeDialogTemplate, {conf: me.config});

      this.$el.append(compiledTemplate);


      var tableHeadView = new TableHeadView({ conf: me.config });
      me.$('#modal-table-container #tab-head').html(tableHeadView.render().$el);

      //render rows
      me.$('#modal-table-container #tab-body').empty();
      this.collection.each(function(item) {
          var itemView = new DialogItemView({ model: item, conf: me.config, newModel: false });
          me.$('#modal-table-container #tab-body').append(itemView.render().$el)
      });

      this.showModal();

      return this;

  },

  cancelAction: function () {
    this.hideModal();
  }


  })
return EmployeeDialogView;

});