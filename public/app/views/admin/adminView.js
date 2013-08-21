//admin page view

define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentAdminView',

  //subViews for handlers
  /*'views/admin/tabRolesView',*/
 
  'views/admin/tabAdminsView',
  'views/admin/tabFacultiesView',

  'views/admin/tabDbView'
  
], function ($, _,  Backbone,

            ParentAdminView, /*TabRolesView,*/ TabAdminsView, TabFacultiesView, TabDbView) {   
  
var AdminView = ParentAdminView.extend({  
  
  headline: 'Admin Page',
  
  defaultActiveTab: 'admins-tab',

  //tab menu buttons (you can add your buttons here)
  tabMenuConfig: [

    {
      id:'admins-tab',
      label: 'Manage faculty admins',
      action: 'manage_admins'
    },
    /*{
      id:'roles-tab',
      label: 'Manage roles',
      action: 'manage_roles'
    },*/

    {
      id:'faculties-tab',
      label: 'Manage faculties',
      action: 'manage_faculties'
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
  manage_admins: function(){
    this.activeMenuId = 'admins-tab';
    this.tabView = new TabAdminsView();
    this.showAdminButtons();
  },  
  manage_database: function(){
    this.addActiveClass('database-tab');
    var tabDbView = new TabDbView();
    $(this.el_tab_content).html(tabDbView.$el.html())
    this.hideAdminButtons();
  },

  /*manage_roles: function(){
    this.activeMenuId = 'roles-tab';
    this.tabView = new TabRolesView();
    this.showAdminButtons();
  },*/

  
  manage_faculties: function(){   
    this.tabView = new TabFacultiesView();
    this.activeMenuId = 'faculties-tab';
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













