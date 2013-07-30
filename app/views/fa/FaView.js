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
  'views/fa/faDepartmentsView',
], function($, _, Backbone, MenuView, faPageTemplate, DepartmentListView, DepartmentElementView, TeachersCollection, FaDepartmentsCollection, FacultiesCollection, faDepartmentsView){   
   
  var FaView = Backbone.View.extend({
    el: $('#content'),

    setActiveMenu: function(id){
    	$('.nav-tabs *').removeClass('active').find('#'+id).addClass('active');
    },
    
    initialize: function(){
   
      var that = this;
    
      //set menu items for tab menu
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
    
      this.render();
      this.manage_departments()
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
    },
    manage_departments: function(){   	
      this.setActiveMenu('departments-tab');
      var FaDepartmentsView = new faDepartmentsView();  
      
    },
    

    render: function (){
      var that = this;
      data = this.menuItems;
      var menuView = new MenuView(data);

      
      var compiledTemplate = _.template( faPageTemplate);

      this.$el.html(compiledTemplate);
      $('#tab-menu').html(menuView.$el.html());
    },
  });
  return  FaView;
});