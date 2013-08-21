//parent of all admin views

define([
  'jquery',
  'bootstrapselect',
  'underscore',
  'backbone',
  'views/shared/MenuView',
  'text!templates/admin/parentAdminTemplate.html',
  'views/admin/newElementView',
  'views/admin/removeDialogView'


], function($, bootstrapselect, _,  Backbone, MenuView, parentAdminTemplate, NewElementView, RemoveDialogView){   

  var AdminParentView = Backbone.View.extend({
    
    el             : '#content',
    el_headline    : '#headline',
    el_tab_menu    : '#tab-menu',
    el_tab_content : '#tab-content',
    
    headline: 'Default Admin Headline',

    //when page loads - load default tab
    loadDefaultActiveTab: function(id){
      for(i=0; i<this.tabMenuConfig.length; i++){
        if(this.tabMenuConfig[i]['id'] == id){
          var action = this.tabMenuConfig[i]['action'];
          this[action]();
        }
      }
    },
  
    //add active class to tab menu
    addActiveClass: function(id){
      $('.nav-tabs *').removeClass('active').find('#'+id).addClass('active');
    },
    
    reloadTab: function () {
      $('.nav-tabs .active').trigger('click');
    },

    initialize: function(){
      var me = this;

      this.events = JSON.parse(JSON.stringify(this.events));


      //extend events with events from child
      this.addTabHandlers();

      //when child config loads we can update buttons' titles in parent view
      this.on('onChildConfigLoaded', function(){
        $('.new-button').html(me.config.buttons['create']);
      })
      
      //Subview has rendered              
      GlobalEventBus.on('tabChildSupViewLoaded', function(tabContent, config){      
        me.config = config;        
        me.render(tabContent);
        me.trigger('onChildConfigLoaded');
      }) 

      this.loadDefaultActiveTab(this.defaultActiveTab);
            
    },

    //remove all events, (to remove events bound in previous adminView.extend)
    events: {},
    
    events: {
     //table events
     'dblclick .model .toggle-text'     : 'showInput',
     'blur .model .toggle-input'        : 'changed',
     'keypress .model .toggle-input'    : 'changed',
     
     //modal windows
     'click .save'               : 'closeModal',
     'click .open-modal-import'  : 'openModalImport',
     //'click #newElement'         : 'appendNewElementRow', 
     'click #create_button'      : 'saveElement',
     'click .delete-button'      : 'showRemoveDialog',
     'click .verify-button'      : 'verifyElement'
    },

    //add click handler for each tab
    addTabHandlers: function(){
      var me = this;
      _.each(this.tabMenuConfig, function (item){
        me.events['click #'+ item['id']] = item['action'];
      })
    },    

    appendNewElementRow: function(){
      var me = this;
      if ($('#new_entity').length < 1){
        var newElementView = new NewElementView();
        var content = newElementView.render(me.config);
        $(me.el_tab_content + ' table tbody').append(content.$el.html())
        //$('#content select').selectpicker() 
      
      } else {
        $('#new_entity').remove();
      
      }    
    },
    
    showInput: function(e){
      $(e.target).css('display', 'none').prev().css('display','block'); 
    },
    hideAdminButtons: function(){
      $('.admin-buttons').css('display', 'none')
    },
    showAdminButtons: function(){
      $('.admin-buttons').css('display', 'block')
    },
    

    //some input in tab has been changed
    changed: function (e){
      var me = this;
      if ((e.type == 'keypress' && e.keyCode == 13) || e.type == 'focusout'){
        var field_name = $(e.target).attr('name'); 
        var model_id = $(e.target).closest('.model').attr('model_id'); 
        var toggle_text = $(e.target).closest('.model').find('.toggle-text')
        
        var field_value = $(e.target).val();
        
        me.modelSaveOnChange({
          id:model_id,
          field_name: field_name,
          field_value: field_value
        });
         
        $('.toggle-list .toggle-input').css('display','none');
        $('.toggle-list .toggle-text').css('display', 'block');
        me.reloadTab();
      }   
    },      
    
    modelSaveOnChange: function(data){
      var a =this.config.collection.get(data.id);
      var field_name = data.field_name;
      var field_value = data.field_value;
      
      putData = {};
      putData[field_name]=field_value;
      a.set(putData)
      a.save();
    },

    openModal: function(e){
      modal_id = ($(e.target).attr('data-target'));
      $('#'+modal_id).modal('show');
    },

    closeModal: function(){
      $('#manage-department').modal('hide');
      $('#manage-department-import').modal('hide');
    },

    openModalImport: function(){
      $('#manage-department-import').modal('show');
    },


    showRemoveDialog: function(e){
       var model_id = $(e.target).closest('.model').attr('model_id');
       var collection = this.config.col;
       new RemoveDialogView(model_id, collection);
    },

    saveElement: function(){
      var me = this, name;
      var model = new me.config.model;

      $("input[data-field]").each(function(){
          field = $(this).attr('name');
          value =  $(this).val();
          model.set(field, value);
      });

      //model.save() with responses
      model.save({att1 : "value"}, {
        success: function(model, response){
          console.log('success');
          $('#content').prepend("<div class='alert alert-success'><strong>Success!</strong>You have successfully created a new entity.</div>");
        },
        error: function(model, response){
          console.log('error');
        }
      })
      window.setTimeout(function () {
        $('.alert-success').fadeOut();
        $('.alert-error').fadeOut();
      }, 3000);
      me.reloadTab();

    },

    verifyElement: function(e){
      var model_id = $(e.target).closest('.model').attr('model_id');
      var model = this.config.collection.get(model_id);
      
      var options = {
        success: function (model, response) {
            console.log('remove success');
        },
        error: function (model, response) {
            console.log('remove error');
        }
      };

      model.set('verified', 1);
      model.save(options);

      $('.nav-tabs .active').trigger('click')
    },


    renderHeadline: function(headline){
      $(this.el_headline).html(this.headline);
    },

    renderMenu: function(){
      var menuView = new MenuView(this.tabMenuConfig);
      $(this.el_tab_menu).html(menuView.$el.html());
      this.addActiveClass(this.activeMenuId)
    },

    renderTab: function(tabContent){
      var me = this;
      $(me.el_tab_content).html(tabContent);
      me.addActiveClass(this.activeMenuId)
      //$('#content select').selectpicker() 
    },

    render: function (tabContent){
      var me = this;
      
      //render basic template with containers
      var compiledTemplate = _.template(parentAdminTemplate);
      this.$el.html(compiledTemplate);
      
      //render elements of page
      this.renderHeadline();
      this.renderMenu();
      this.renderTab(tabContent);
      
      //hide all toggle-inputs when user clicks not on input
      $('body').on('click',function(e){
        if ($(e.target).closest('.toggle-input').length <= 0){  
          $('.toggle-list .toggle-input').css('display','none');
          $('.toggle-list .toggle-text').css('display', 'block'); 
        }
      })
      
      //HACK !!! (this must be placed in this.events, but i can't get it working across
      // both admin pages: it fires two times when i switch to different admin page)
      $('#newElement').click(function(){
        me.appendNewElementRow();
      });

      // next time child view loads - only tab content will render and button text update 
      GlobalEventBus.off('tabChildSupViewLoaded');
      GlobalEventBus.on('tabChildSupViewLoaded', function(tabContent, config){
        me.config = config;
        me.renderTab(tabContent);
        me.trigger('onChildConfigLoaded');
      })

      //$('#content select').selectpicker() 
    }
  
  });

  return  AdminParentView;
});