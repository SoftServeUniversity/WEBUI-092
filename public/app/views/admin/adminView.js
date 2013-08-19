//admin page view

define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentAdminView',

  //subViews for handlers
  'views/admin/tabDepartmentsView',
  'views/admin/tabRolesView',
  'views/admin/tabGroupsView',

  'views/admin/tabDbView'
  
], function ($, _,  Backbone,
            ParentAdminView, TabDepartmentsView, TabRolesView, TabGroupsView, TabDbView) {   
  
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
    
    //extend inherited events with own events
    _.extend(this.events, this.events_own)
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
    this.tabView = new TabRolesView();
    this.showAdminButtons();
  },

  manage_groups: function(){
    this.activeMenuId = 'groups-tab';
    this.tabView = new TabGroupsView();
    this.showAdminButtons();
  },
    
  manage_departments: function(){   
    this.tabView = new TabDepartmentsView();
    this.activeMenuId = 'departments-tab';
    this.showAdminButtons();
  },

  events_own : {
    "click #loadData" : "imgLoader",
    "change #file" : "showFileName"
  },

  //loading imgLoader while file is loading
  imgLoader : function(){
    $('#imgLoader').show();
  },

  //show filename of loading file
  showFileName : function(){
    $('#file').each(function() {
      var name = this.value;
      reWin = /.*\\(.*)/;
      var fileTitle = name.replace(reWin, "$1");
      reUnix = /.*\/(.*)/;
      fileTitle = fileTitle.replace(reUnix, "$1");
      $('#name').html(fileTitle);
    });
  }

});

return  AdminView;

});













