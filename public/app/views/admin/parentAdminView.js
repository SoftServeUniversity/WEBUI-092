//parent of all admin views

define([
  'jquery',
  'bootstrapselect',
  'underscore',
  'backbone',
  'views/shared/MenuView',
  'text!templates/admin/parentAdminTemplate.html',
  'views/admin/newElementView'

], function($, bootstrapselect, _,  Backbone, MenuView, parentAdminTemplate, NewElementView){   

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
     'dblclick .toggle-text'     : 'showInput',
     'blur .toggle-input'        : 'changed',
     'keypress .toggle-input'    : 'changed',
     
     //modal windows
     'click .open-modal' : 'openModal',
     'click .close-m'      : 'closeModal',
     'click .save'       : 'closeModal',
     'click .open-modal-import'  : 'openModalImport',
     'click #newDepartment'      : 'createNewElement', 
     'click #create_button'      : 'saveData'
    },
    //add click handler for each tab
    addTabHandlers: function(){
      var me = this;
      _.each(this.tabMenuConfig, function (item){
         me.events['click #'+ item['id']] = item['action'];
      })
    },    

    createNewElement: function(){  
      var me = this;
      
      if ($('#new_entity').length < 1){
	      
        var newElementView = new NewElementView(me.config);
	      $(me.el_tab_content + ' table tbody').append(newElementView.$el.html())
        $('#content select').selectpicker() 

        var newEntity = new me.config.model();
      
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
    	
      if ((e.type == 'keypress' && e.keyCode == 13) || e.type == 'focusout'){
        var field_name = $(e.target).attr('name'); 
        var model_id = $(e.target).closest('.model').attr('model_id'); 
        
        $('.toggle-list .toggle-input').css('display','none');
	      $('.toggle-list .toggle-text').css('display', 'block');
       }   
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

    saveData: function(){
      //Валідація поля name за допомогою регулярних виразів
      var name = document.getElementById("name_field").value;
      var ck_name = /^[A-Za-z0-9 ]{3,20}$/;
      if (ck_name.test(name)) {
        $('#content').prepend("<div class='alert alert-success'><strong>Success!</strong>You have successfully created a department.</div>");

        var newEntity = new this.config.model();
        var entityValues = $("#new_entity").find('*[name]');
        $(entityValues).each(function(index, element){
          var temp_value = $(element).val();
          var temp_name = $(element).attr('name');
          newEntity.set(temp_name, temp_value);
        })
        console.log(newEntity)
        newEntity.save()
      }
      else{
        $('#content').prepend("<div class='alert alert-error'><strong>Error!</strong>Name should be between 3 and 20 characters.</div>");
      }
      window.setTimeout(function () {
          $('.alert-success').fadeOut();
          $('.alert-error').fadeOut();
        }, 3000);
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
      $('#content select').selectpicker() 
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
      
      // next time child view loads - only tab content will render and button text update 
      GlobalEventBus.off('tabChildSupViewLoaded');
      GlobalEventBus.on('tabChildSupViewLoaded', function(tabContent, config){
        me.config = config;
        me.renderTab(tabContent);
        me.trigger('onChildConfigLoaded');
      })

      $('#content select').selectpicker() 
    }
  
  });

  return  AdminParentView;
});