//faculty admin page view

define([
  'jquery',
  'bootstrapselect',
  'underscore',
  'backbone',
  'views/admin/parentAdminView',

  //subViews for handlers
  'views/admin/tabAdminsView',
  'views/admin/tabCoursesView',
  
  'views/admin/tabGroupsView',
  'views/admin/tabDepartmentsView',
  'views/admin/tabTeachersView',
  'views/admin/tabWorksView'

], function ($, bootstrapselect, _,  Backbone,
            ParentAdminView, TabAdminsView, TabCoursesView,
             TabGroupsView, TabDepartmentsView, TabTeachersView, TabWorksView) {   
  
var AdminFacultyView = ParentAdminView.extend({  
  
  headline: 'Адміністратор факультету',
  
  defaultActiveTab: 'works-tab',

  //tab menu buttons (you can add your buttons here)
  tabMenuConfig: [

    {
      id:'teachers-tab',
      label: 'Викладачі',
      action: 'manage_teachers'
    },
    {
      id:'courses-tab',
      label: 'Курси',
      action: 'manage_courses'
    },
    {
      id:'departments-tab',
      label: 'Кафедри',
      action: 'manage_departments'
    },
    {
      id:'groups-tab',
      label: 'Групи',
      action: 'manage_groups'
    },
    {
      id:'works-tab',
      label: 'Роботи',
      action: 'manage_works'
    }
  ],
  

  initialize: function(){
    //call parent's initialize method
    this.constructor.__super__.initialize.apply(this);
  },

  //tab menu buttons handlers  
  manage_admins: function(){
    this.activeMenuId = 'admins-tab';
    this.tabView = new TabAdminsView();
    this.showAdminButtons();
  },
  manage_roles: function(){
    this.activeMenuId = 'roles-tab';
    this.tabView = new TabRolesView();
    this.showAdminButtons();
  },
  manage_courses: function(){
    this.activeMenuId = 'courses-tab';
    this.tabView = new TabCoursesView();
    this.showAdminButtons();
  },
  manage_groups: function(){
    this.activeMenuId = 'groups-tab';
    this.tabView = new TabGroupsView();
    this.showAdminButtons();
  },
  manage_departments: function(){
    this.activeMenuId = 'departments-tab';
    this.tabView = new TabDepartmentsView();
    this.showAdminButtons();
  },
  manage_teachers: function(){
    this.activeMenuId = 'teachers-tab';
    this.tabView = new TabTeachersView();
    this.showAdminButtons();
  },
  manage_works: function(){
    this.activeMenuId = 'works-tab';
    this.tabView = new TabWorksView();
    this.showAdminButtons();
  }

});

return  AdminFacultyView;

});

