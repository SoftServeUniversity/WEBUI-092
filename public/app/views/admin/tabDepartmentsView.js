define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/department/DepartmentModel',
  'collections/departments/DepartmentsCollection',
  'collections/teachers/TeachersCollection'

], function($, _, Backbone, ParentTabView, DepartmentModel, DepartmentsCollection,
             TeachersCollection){
   
  var TabDepartmentsView = ParentTabView.extend({

    collections_classes: {
      departments : DepartmentsCollection,
      teachers    : TeachersCollection
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

          teacher_id: {
            label: 'Завідувач кафедри',
            type:'select',
            collection:me.collections.teachers
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