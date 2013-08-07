//faculty admin page view

define([
  'jquery',
  'bootstrapselect',
  'underscore',
  'backbone',
  'views/admin/parentAdminView',

  //subViews for handlers
  'views/admin/tabParentDepartmentsView',
  'views/admin/tabParentRolesView',
  
], function ($, bootstrapselect, _,  Backbone,
            ParentAdminView, TabParentDepartmentsView, TabParentRolesView) {   
  
var AdminFacultyView = ParentAdminView.extend({  
  
  headline: 'Faculty Admin Page',
  
  defaultActiveTab: 'roles-tab',

  //tab menu buttons (you can add your buttons here)
  tabMenuConfig: [
    {

      id:'roles-tab',
      label: 'Manage roles',
      action: 'manage_roles'
    }
  ],

  initialize: function(){
    //call parent's initialize method
    this.constructor.__super__.initialize.apply(this);
  },

  //tab menu buttons handlers  
  manage_roles: function(){
    this.activeMenuId = 'roles-tab';
    this.tabView = new TabParentRolesView();
    this.showAdminButtons();
  }

});

return  AdminFacultyView;

});

