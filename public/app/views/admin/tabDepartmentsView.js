define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/department/DepartmentModel',
  'collections/departments/DepartmentsCollection',
  'collections/teachers/teachersProxyCollection',
  'collections/faculties/FacultiesCollection'


], function($, _, Backbone, ParentTabView, DepartmentModel, DepartmentsCollection,
             TeachersProxyCollection, FacultiesCollection){
   
  var TabDepartmentsView = ParentTabView.extend({

    collections_classes: {
      departments : DepartmentsCollection,
      teachers    : TeachersProxyCollection,
      faculties   : FacultiesCollection

    },

    setConfig: function(){
      var me = this;

      var config = {
      	
        model     : DepartmentModel,
        
        collection: me.collections.departments,
        
        fields    : {

          name: {
            label:'Кафедра',
            type:'text'
          },

          user_id: {
            label: 'Завідувач кафедри',
            type:'select',
            collection:me.collections.teachers
          },

          faculty_id: {
            label: 'Факультет',
            type:'select',
            collection:me.collections.faculties
          }

        },
        
        buttons: {
        	create: 'Нова кафедра',
            employee: true
        }

      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  TabDepartmentsView;
  
});