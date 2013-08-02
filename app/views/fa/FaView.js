
/* Контейнер табів і таблиць
 * 
 * Цей View відповідає за створення таб-меню, і додавання до нього хендлерів, 
 * за підвантаження і передачу в ці хендлери subView (наприклад 'TabChildDepartmentsView').
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'views/shared/MenuView',
  'text!templates/fa/faPageTemplate.html',
  'views/fa/DepartmentListView',
  'views/fa/DepartmentElementView',
  'collections/teachers/TeachersCollection',
  'collections/fa/FaDepartmentsCollection',
  'collections/faculties/FacultiesCollection',
  'views/fa/tabParentView',

  //subViews для хендлерів
  'views/fa/tabChildDepartmentsView'

], function($, _, Backbone, MenuView, faPageTemplate, DepartmentListView,
	        DepartmentElementView, TeachersCollection, FaDepartmentsCollection,
	        FacultiesCollection, TabParentView, TabChildDepartmentsView){   
  

  
  var FaView = Backbone.View.extend({
    
    el: $('#content'),
    el_tab_content: '#tab-content',
    el_tab_menu: '#tab-menu',
    
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

      //активна вкладка по замовчуванню
      this.manage_departments();
      
      //Підписка до рендерингу subView             	
      GlobalEventBus.on('tabChildSupViewLoaded', function(){
        that.render();
      })
    },
    
    
    events: {
     'click #database-tab' : 'manage_database',
     'click #roles-tab' : 'manage_roles',
     'click #departments-tab' : 'manage_departments',
    },
    
    manage_database: function(){
      this.setActiveMenu('database-tab');
    },
    manage_roles: function(){
      this.setActiveMenu('roles-tab');
      var FaRolesView = new faRolesView();
    },
    manage_departments: function(){   
	  var that = this;
	  this.setActiveMenu('departments-tab');
      this.tabParentView = new TabParentView(TabChildDepartmentsView);

	  GlobalEventBus.on('tabChildSupViewLoaded', function(){
        $(this.el_tab_content).html(that.tabParentView.$el.html()) 
        
        //console.log(that.tabParentView.$el.html())
      })
    },
    

    render: function (){
      var that = this;
      data = this.menuItems;
      var menuView = new MenuView(data);

      
      var compiledTemplate = _.template(faPageTemplate);

      this.$el.html(compiledTemplate);
      $(this.el_tab_menu).html(menuView.$el.html());
      
      $(this.el_tab_content).html(this.tabParentView.$el.html())
      
      
      //console.log(this.tabParentView.$el.html())
      
      /*забираємо всі хендлери, щоб коли буде клік на табу не 
       * рендерився увесь вю (див manage_departments - GlobalEventBus.on)
       */
      GlobalEventBus.off('tabChildSupViewLoaded');
    },
  });
  return  FaView;
});