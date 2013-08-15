//faculty admin page view

define([
  'jquery',
  'bootstrapselect',
  'underscore',
  'backbone',
  'views/admin/parentAdminView',

  //subViews for handlers
  'views/admin/tabParentDepartmentsView',
  'views/admin/tabParentAdminsView',
  'views/admin/tabParentRolesView',
  'views/admin/tabParentCoursesView',

], function ($, bootstrapselect, _,  Backbone,
            ParentAdminView, TabParentDepartmentsView, TabParentAdminsView, TabParentRolesView, TabParentCoursesView) {   
  
var AdminFacultyView = ParentAdminView.extend({  
  
  headline: 'Faculty Admin Page',
  
  defaultActiveTab: 'admins-tab',

  //tab menu buttons (you can add your buttons here)
  tabMenuConfig: [

    {
      id:'admins-tab',
      label: 'Manage admins',
      action: 'manage_admins'
    },
    {

      id:'roles-tab',
      label: 'Manage roles',
      action: 'manage_roles'
    },
    {
      id:'courses-tab',
      label: 'Manage Courses',
      action: 'manage_courses'
    }
  ],

  initialize: function(){
    //call parent's initialize method
    this.constructor.__super__.initialize.apply(this);
  },

  //tab menu buttons handlers  
  manage_admins: function(){
    this.activeMenuId = 'admins-tab';
    this.tabView = new TabParentAdminsView();
    this.showAdminButtons();
  },
  manage_roles: function(){
    this.activeMenuId = 'roles-tab';
    this.tabView = new TabParentRolesView();
    this.showAdminButtons();
  },
  manage_courses: function(){
    this.activeMenuId = 'courses-tab';
    this.tabView = new TabParentCoursesView();
    this.showAdminButtons();
  }

});

return  AdminFacultyView;

});

