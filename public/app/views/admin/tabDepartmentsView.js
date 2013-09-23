define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/department/DepartmentModel',
  'collections/departments/DepartmentsCollection',
  'collections/teachers/teachersProxyCollection',


], function($, _, Backbone, ParentTabView, DepartmentModel, DepartmentsCollection,
             TeachersProxyCollection ){
   
  var TabDepartmentsView = ParentTabView.extend({

    collections_classes: {
      departments : DepartmentsCollection,
      teachers    : TeachersProxyCollection,
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
            label: '',
            type: 'hidden',
            value: 1
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
      if (GlobalUser.currentUser != undefined) {
        this.dataFilter = { faculty_id: GlobalUser.currentUser.attributes.faculty_admin_attributes.faculty_id }
      }
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  TabDepartmentsView;
  
});