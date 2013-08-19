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
      teachers    : TeachersCollection
    },

    setConfig: function(){
      
      var me = this;
      
      var config = {
      	
        model     : GroupModel,
        collection: me.collections.groups,
        data      : [{
            _link: 'name',
            label: 'Group Name',
            type : 'text'
          },
          {  
            _link: 'course_id',
            label: 'Course',
            type : 'select',
            src  : me.collections.courses
          },
          {
            _link: 'teacher_id',
            label: 'Teacher Name',
            type : 'select',
            src  : me.collections.teachers
          },
          {
            _link: 'department_id',
            label: 'Department Name',
            type : 'select',
            src  : me.collections.departments
          }
        ],
        buttons: {
        	create : 'New Group'
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