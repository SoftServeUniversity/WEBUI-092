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
        this.model.on("destroy update", me.updateView, me);
        
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
        this.remove();
      },

      showInput: function(e){
        $(e.target).css('display', 'none').prev().css('display','block');
      },

      showEmployee: function(){

         var employeeTabView = new EmployeeDialogView(this.model.get('id'));
         $('#content').append(employeeTabView.$el);
         $('#employee-modal').modal('show');
      },


      removeItem: function(){
        var message = 'Ви дійсно бажаєте видалити '+ this.model.attributes.name + ' ?</strong>';
        var header = 'Підтвердіть видалення';
        var removeDialogView = new RemoveDialogView({model: this.model}, {message: message, header: header});
      },

      //some input in tab has been changed
      updateItem: function (e){
        var me = this;
        if ((e.type == 'keypress' && e.keyCode == 13) || e.type == 'focusout'){
          
          var field_name = $(e.target).attr('name');
          var field_value = $(e.target).val();

          var putRequestParams = {};
          putRequestParams[field_name]=field_value;
          this.model.set(putRequestParams)
          this.model.save();

          $('.toggle-list .toggle-input').css('display','none');
          $('.toggle-list .toggle-text').css('display', 'block');
        }
      },

      verifyItem: function(e){
        this.model.set('verified', 1);
        this.model.save();
      },

      saveItem: function(e){
         var saveData = {};
         $(e.target).closest('tr').find('input').each(function(i, input){
            saveData [$(input).attr('name')] = $(input).val();
         })
         this.model.save(saveData)
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

        me.data.model = me.data.model.toJSON();
        
        var compiledTemplate = me.template(me.data);

        me.$el.append(compiledTemplate); 
        
        return me;

      }

    });

    return  ItemView;

});
