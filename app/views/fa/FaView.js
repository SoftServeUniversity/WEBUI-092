
/* Контейнер табів і таблиць
 * 
 * Цей View відповідає за створення таб-меню, і додавання до нього хендлерів, 
 * за підвантаження і передачу в ці хендлери subView (наприклад 'TabChildDepartmentsView').
 */

define([
  'jquery',
  'bootstrapselect',
  'underscore',
  'backbone',
  'views/shared/MenuView',
  'text!templates/fa/faPageTemplate.html',
  'views/fa/tabDbView',
  'views/fa/newElementView',  
  
  //subViews для хендлерів
  'views/fa/tabChildDepartmentsView',
  'views/fa/tabChildRolesView'
  
], function($, bootstrapselect, _,  Backbone, MenuView, faPageTemplate,
	        TabDbView, NewElementView, TabChildDepartmentsView, TabChildRolesView){   
  

  
  var FaView = Backbone.View.extend({
    
    el: $('#content'),
    el_admin_content: '#admin-content',
    el_tab_menu: '#tab-menu',
    el_tab_content: '#tab-content',

    //Додавання активного класу до таби меню
    setActiveMenu: function(id){
    	$('.nav-tabs *').removeClass('active').find('#'+id).addClass('active');
    },
    
    initialize: function(){
      var that = this;

      //Додавання таби до меню
      this.menuItems = [ 
        {
          id:'departments-tab',
          label: 'Manage departments',    
        },
        {
          id:'roles-tab',
          label: 'Manage roles',    
        },
        {
          id:'database-tab',
          label: 'Manage database',    
        }
      ];

      this.on('onChildConfigLoaded', function(){
      	//now we have child config in that.config
      	$('.new-button').html(that.config.buttons['create']);
      })
      
      //Підписка до рендерингу subView             	
      GlobalEventBus.on('tabChildSupViewLoaded', function(tabContent, config){
      	that.config = config;
        that.render(tabContent);
        that.trigger('onChildConfigLoaded');

      }) 
          //активна вкладка по замовчуванню
      this.manage_departments();
    
    },
    events: {
     //tab click
     'click #database-tab' : 'manage_database',
     'click #roles-tab' : 'manage_roles',
     'click #departments-tab' : 'manage_departments',
    	
     //table events
     'dblclick .toggle-text'     : 'showInput',
     //зберегти зміни, коли дані в інпуті змінено  
     'blur .toggle-input'        : 'changed',
     'keypress .toggle-input'    : 'changed',
     
     //modal windows
     'click .open-modal' : 'openModal',
     'click .close-m'      : 'closeModal',
     'click .save'       : 'closeModal',
     'click .open-modal-import'  : 'openModalImport',
     'click #newDepartment'      : 'showCreateNew', 
     'click #create_button'      : 'saveData'//,
    },
    
    //tab handlers  
    manage_database: function(){
      this.setActiveMenu('database-tab');
      var tabDbView = new TabDbView();
      $(this.el_tab_content).html(tabDbView.$el.html())
      this.hideAdminButtons();
    },
    
    
    manage_roles: function(){
	  var that = this;
	  this.setActiveMenu('roles-tab');
      this.tabView = new TabChildRolesView();

    },
    manage_departments: function(){   
	  var that = this;
	  this.setActiveMenu('departments-tab');
      this.tabView = new TabChildDepartmentsView();
    },


    showCreateNew: function(){
      var that = this;
      if ($('#new_entity').length < 1){
	    var newElementView = new NewElementView(that.config);
	    	
	    $(that.el_tab_content + ' table tbody').append(newElementView.$el.html())
	    var that = this;
	    var newEntity = new that.config.model();
	      $('#content select').selectpicker() 
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
    
    //якщо змінено одне з полів існуючих елементів
    changed: function (e){
    	
      if ((e.type == 'keypress' && e.keyCode == 13) || e.type == 'focusout'){
    	
        var field_name = $(e.target).attr('name');
        
        //отримуєм id моделі
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
      }
      else{
        $('#content').prepend("<div class='alert alert-error'><strong>Error!</strong>Name should be between 3 and 20 characters.</div>");
      }
      window.setTimeout(function () {
          $('.alert-success').fadeOut();
          $('.alert-error').fadeOut();
        }, 3000);
    },
    

    render: function (tabContent){
      var that = this;
      data = this.menuItems;
      var menuView = new MenuView(data);

      
      var compiledTemplate = _.template(faPageTemplate);
      this.$el.html(compiledTemplate);
      
      $(this.el_tab_menu).html(menuView.$el.html());
      $(this.el_tab_content).html(tabContent)
      
      /*
      * якщо хтось клікнув на текстове поле і нічого в ньому не змінив,
      * то ховаєм поле, коли юзер клікає деінде
      */
      $('body').on('click',function(e){
        if ($(e.target).closest('.toggle-input').length > 0){	
	    } else {
	      $('.toggle-list .toggle-input').css('display','none');
	      $('.toggle-list .toggle-text').css('display', 'block');	
	    }

      })
      
      
      //console.log(this.tabParentView.$el.html())
      
      /*забираємо всі хендлери, щоб коли буде клік на табу не 
       * рендерився увесь вю (див manage_departments - GlobalEventBus.on)
       */     
      GlobalEventBus.off('tabChildSupViewLoaded');
      GlobalEventBus.on('tabChildSupViewLoaded', function(tabContent, config){
        that.config = config;
        $(that.el_tab_content).html(tabContent);
        that.showAdminButtons();
        that.trigger('onChildConfigLoaded');
        $('#content select').selectpicker()      
      })
      
      $('#content select').selectpicker() 
    },
  });
  return  FaView;
});