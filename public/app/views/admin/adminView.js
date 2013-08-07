//admin page view

define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentAdminView',

  //subViews for handlers
  'views/admin/tabParentDepartmentsView',
  'views/admin/tabParentRolesView',
  'views/admin/tabParentGroupsView',

  'views/admin/tabDbView',
  
], function ($, _,  Backbone,
            ParentAdminView, TabParentDepartmentsView, TabParentRolesView, TabParentGroupsView, TabDbView) {   
  
var AdminView = ParentAdminView.extend({  
  
  headline: 'Admin Page',
  
  defaultActiveTab: 'departments-tab',

  //tab menu buttons (you can add your buttons here)
  tabMenuConfig: [
    {

      id:'roles-tab',
      label: 'Manage roles',
      action: 'manage_roles'
    },
    {

      id:'departments-tab',
      label: 'Manage departments',
      action: 'manage_departments'
    },
    {

      id:'groups-tab',
      label: 'Manage groups',
      action: 'manage_groups'
    },
    {

      id:'database-tab',
      label: 'Manage database',
      action: 'manage_database'
    }
  ],

  initialize: function(){
    //call parent's initialize method
    this.constructor.__super__.initialize.apply(this);
  },

  //tab menu buttons handlers  
  manage_database: function(){
    this.addActiveClass('database-tab');
    var tabDbView = new TabDbView();
    $(this.el_tab_content).html(tabDbView.$el.html())
    this.hideAdminButtons();
  },

  manage_roles: function(){
    this.activeMenuId = 'roles-tab';
    this.tabView = new TabParentRolesView();
    this.showAdminButtons();
  },

  manage_groups: function(){
    this.activeMenuId = 'groups-tab';
    this.tabView = new TabParentGroupsView();
    this.showAdminButtons();
  },
    
  manage_departments: function(){   
    this.tabView = new TabParentDepartmentsView();
    this.activeMenuId = 'departments-tab';
    this.showAdminButtons();
  }

});

return  AdminView;

});













