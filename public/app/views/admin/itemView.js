define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/itemTemplate.html',
  'views/shared/RemoveDialogView',
  'views/admin/EmployeeDialogView'

], function ($, _, Backbone, ItemTemplate, RemoveDialogView, EmployeeDialogView) {
  
    var ItemView = Backbone.View.extend({ 

      tagName: 'tr',
      
      className: 'toggle-list',
      
      template: _.template(ItemTemplate),

      initialize: function(data){
        var me = this; 
        this.data = data;

        if (me.data.newModel == true){
          
          this.model.on("sync", function(){
            GlobalEventBus.trigger('NewItemAdded', me.model);
            me.model.off("sync");
            me.remove();
          })

        } else {

          me.data.newModel = "";
          this.model.on("remove", me.removeView, me);
          this.model.on("change", me.updateView, me);
          
          this.model.on("change:role_pending", me.updatePendingTab)

         }

        _.bindAll(this, 'verifyItem');
      
      },

      events: {
        'dblclick .toggle-text'      : 'showInput',
        'click .employee-button'     : 'showEmployee',
        'click .delete-button'       : 'removeItem',
        'click .verify-button'       : 'verifyItem',
        'blur  .toggle-input'        : 'updateItem',
        'keypress .toggle-input'     : 'updateItem',
        'click #create_button'       : 'saveItem',
        'click body'                 : 'hideInputs'
      },

      updateView: function(){
        this.render();
      },
      
      removeView: function(){
        this.remove();
      },

      showInput: function(e){
        $(e.target).closest('td').find('.toggle-input').css('display','block');
        $(e.target).closest('td').find('.toggle-text').css('display','none');
      },

      showEmployee: function(){
         var employeeTabView = new EmployeeDialogView(this.model.get('id'));
         $('#content').append(employeeTabView.$el);
         $('#employee-modal').modal('show');
      
      },

      removeItem: function(){
        var message = '';
        var header = 'Підтвердіть видалення';
        var removeDialogView = new RemoveDialogView({model: this.model}, {message: message, header: header});
      },

      //some input in tab has been changed
      updateItem: function (e){
        var me = this;
        if ((e.type == 'keypress' && e.keyCode == 13) || e.type == 'focusout'){
          
          
          if ($(e.target).prop("tagName") == 'SELECT'){
            var field_name = $(e.target).attr('name');
            var field_value = parseInt($(e.target).find(":selected").val(), 10);
          } else {
            var field_name = $(e.target).attr('name');
            var field_value = $(e.target).val();
          }
          

          var putRequestParams = {};
          putRequestParams[field_name]=field_value;
          this.model.save(putRequestParams, {wait: true});

          $('.toggle-list .toggle-input').css('display','none');
          $('.toggle-list .toggle-text').css('display', 'block');
        }
      },

      verifyItem: function(e){
        this.model.set('role_pending', false);
        this.model.save();
      },

      saveItem: function(e){
         var saveData = {};
         $(e.target).closest('tr').find('.tab-input').each(function(i, input){
            saveData [$(input).attr('name')] = $(input).val();
         })
         this.model.set(saveData);
         this.model.save();
      },

      updatePendingTab: function(){
        if( $('.verify-button').length == 1 ){
          $('.nav-tabs .needs-verification').removeClass('needs-verification')
        }
      },

      hideInputs: function(){
        console.log('hidin')
        if ($(e.target).closest('.toggle-input').length <= 0){
          $('.toggle-list .toggle-input').css('display','none');
          $('.toggle-list .toggle-text').css('display', 'block');
        }
      },

      render: function(){
        var me = this;
        me.data.model = me.model.toJSON();
        var compiledTemplate = me.template(me.data);
        me.$el.html(compiledTemplate); 
        return me;
      }

    });

    return  ItemView;

});
