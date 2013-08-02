
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
  'views/fa/DepartmentListView',
  'views/fa/DepartmentElementView',
  'collections/fa/FaDepartmentsCollection',

  //subViews для хендлерів
  'views/fa/tabChildDepartmentsView',
  'views/fa/tabChildRolesView'

], function($, bootstrapselect, _,  Backbone, MenuView, faPageTemplate, DepartmentListView,
	        DepartmentElementView, FaDepartmentsCollection, TabChildDepartmentsView, TabChildRolesView){   
  

  
  var FaView = Backbone.View.extend({
    
    el: $('#content'),
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


      
      //Підписка до рендерингу subView             	
      GlobalEventBus.on('tabChildSupViewLoaded', function(tabContent){
        that.render(tabContent);
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
    },
    
    //tab handlers  
    manage_database: function(){
      this.setActiveMenu('database-tab');
    },
    manage_roles: function(){
	  var that = this;
	  this.setActiveMenu('roles-tab');
      this.tabParentView = new TabChildRolesView();

    },
    manage_departments: function(){   
	  var that = this;
	  this.setActiveMenu('departments-tab');
      this.tabParentView = new TabChildDepartmentsView();
    },



    //table handlers    
    showInput: function(e){
       $(e.target).css('display', 'none').prev().css('display','block');	
    },
    
    //якщо змінено одне з полів існуючих елементів
    changed: function (e){
    	
      if ((e.type == 'keypress' && e.keyCode == 13) || e.type == 'focusout'){
    	
        var field_name = $(e.target).attr('name');
        
        //отримуєм id моделі
        var entity_id = $(e.target).closest('.model').attr('id');
        var model_id = parseInt(entity_id.match(/\d+$/).join(''));	
       
        //var model = (this.FaDepartmentsCollection.get(model_id));
//
        //model.set(field_name, $(e.target).val());
        //model.save();

        $('.toggle-list .toggle-input').css('display','none');
	    $('.toggle-list .toggle-text').css('display', 'block');
       }   
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
     //GlobalEventBus.off('tabChildSupViewLoaded');
     
      GlobalEventBus.off('tabChildSupViewLoaded');
      GlobalEventBus.on('tabChildSupViewLoaded', function(tabContent){
         $(that.el_tab_content).html(tabContent) 
         $('#content select').selectpicker()      
      })
      
      $('#content select').selectpicker() 
    },
  });
  return  FaView;
});