define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/group/GroupModel',
  'collections/groups/GroupsCollection',
  'collections/courses/CoursesCollection',
  'collections/teachers/TeachersCollection',
  'collections/departments/DepartmentsCollection'

], function($, _, Backbone, ParentTabView, GroupModel, GroupsCollection, CoursesCollection,
            TeachersCollection, DepartmentsCollection){   
   
  var TabChildGroupsView = ParentTabView.extend({

    collections_classes: {
      groups      : GroupsCollection,
      courses     : CoursesCollection,
      teachers    : TeachersCollection,
      departments : DepartmentsCollection
    },

    setConfig: function(){
      
      var me = this;
      
      var config = {
      	
        table_class: 'DataTable',
        model     : GroupModel,
        collection: me.collections.groups,
        data      : [{
            _link: 'name',
            label: 'Група',
            type : 'text'
          },
          {  
            _link: 'course_id',
            label: 'Курс',
            type : 'select',
            src  : me.collections.courses
          },
          {
            _link: 'teacher_id',
            label: 'Куратор групи',
            type : 'select',
            src  : me.collections.teachers
          },
          {
            _link: 'department_id',
            label: 'Кафедра',
            type : 'select',
            src  : me.collections.departments
          }
        ],
        buttons: {
        	create : 'Додати групу'
        }
      
      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }

  });
  
  return  TabChildGroupsView;
  
});