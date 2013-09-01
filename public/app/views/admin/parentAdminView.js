//parent of all admin views

define([
  'jquery',
  'bootstrapselect',
  'underscore',
  'backbone',
  'bootstrap_datatables',
  'views/shared/MenuView',
  'text!templates/admin/parentAdminTemplate.html',
  'views/shared/RemoveDialogView',
  'views/admin/itemView'

], function( $, bootstrapselect, _,  Backbone, Bootstrap_dataTables,
            MenuView, parentAdminTemplate, RemoveDialogView,
            ItemView ) {

  var ParentAdminView = Backbone.View.extend({

    el             : '#content',
    el_headline    : '#headline',
    el_tab_menu    : '#tab-menu',
    el_tab_content : '#tab-content',

    headline: 'Default Admin Headline',

    initialize: function(){
      
      var me = this;

      //extend events with events set in Child Admin Views
      me.addTabHandlers();

      me.render();

      //display default active tab set in Child Admin Views
      me.setActiveTab(me.defaultActiveTab);

      //Render a tab when it's loaded
      GlobalEventBus.on('tabSubViewLoaded', function(tabContent, config){
        
        me.config = config; 
        me.renderTab(tabContent);
        $('.new-button').html(me.config.buttons['create']);
      
      })

    },

    events: {
     //table events Oneed to be moved to itemView)
     'dblclick .toggle-list .toggle-text'     : 'showInput',
     'blur .toggle-list .toggle-input'        : 'changed',
     'keypress .toggle-list .toggle-input'    : 'changed',

     //modal windows
     'click .save'               : 'closeModal',
     'click .open-modal-import'  : 'openModalImport',
     'click .verify-button'      : 'verifyElement'
    },


    //when page loads - load default tab
    setActiveTab: function(id){
      for(i=0; i<this.tabMenuConfig.length; i++){
        if(this.tabMenuConfig[i]['id'] == id){
          var action = this.tabMenuConfig[i]['action'];
          this[action]();
        }
      }
    },

    //add click handler for each tab
    addTabHandlers: function(){
      var me = this;
      _.each(this.tabMenuConfig, function (item){
        me.events['click #'+ item['id']] = item['action'];
      })
    },

    //add active class to tab menu
    addActiveClass: function(id){
      $('.nav-tabs *').removeClass('active').find('#'+id).addClass('active');
    },

    reloadTab: function () {
      $('.nav-tabs .active').trigger('click');
    },



    appendNewElementRow: function(){
      var me = this;
      if ($('#new_entity').length < 1){
        
        var newModel = new me.config.model();

        me.config.newModel = true
        var newElementView = new ItemView({model: newModel, conf: me.config});
        
        $(me.el_tab_content + ' table tbody').append(newElementView.render().el)

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
    },

    renderTab: function(tabContent){
      var me = this;
      $(me.el_tab_content).html(tabContent);
      me.addActiveClass(this.activeMenuId)
      $('.DataTable').dataTable();
    },

    render: function (tabContent){
      var me = this;

      //render basic template with empty divs
      var compiledTemplate = _.template(parentAdminTemplate);
      this.$el.html(compiledTemplate);

      this.renderHeadline();
      this.renderMenu();

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

    }

  });

  return ParentAdminView;
});