//faculty admin page view

define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentAdminView',
  'bootstrapselect',
  //subViews for handlers
  'views/admin/tabAdminsView',
  'views/admin/tabCoursesView',
  
  'views/admin/tabGroupsView',
  'views/admin/tabDepartmentsView',
  'views/admin/tabTeachersView'

], function ($,  _,  Backbone,
            ParentAdminView, bootstrapselect, TabAdminsView, TabCoursesView,
             TabGroupsView, TabDepartmentsView, TabTeachersView) {
  
var AdminFacultyView = ParentAdminView.extend({  
  
  headline: 'Адміністратор факультету',

  defaultActiveTab: 'teachers-tab',

  //tab menu buttons (you can add your buttons here)
  tabMenuConfig: [

    {
      id:'teachers-tab',
      label: 'Викладачі',
      action: 'manage_teachers'
    },

   /* {
       id:'teachers_of_dep-tab',
       label: 'Викладачі кафедри',
       action: 'manage_teachers_of_dep'
    },*/

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
    }
  ],
  

  initialize: function(){

    this.constructor.__super__.initialize.apply(this);

  },

  //tab menu buttons handlers  
  manage_admins: function(){
    this.activeMenuId = 'admins-tab';
    this.tabView = new TabAdminsView();
    this.showAdminButtons();

    this.childViews.push(this.tabView);
  },
  manage_roles: function(){
    this.activeMenuId = 'roles-tab';
    this.tabView = new TabRolesView();
    this.showAdminButtons();

    this.childViews.push(this.tabView);    
  },
  manage_courses: function(){
    this.activeMenuId = 'courses-tab';
    this.tabView = new TabCoursesView();
    this.showAdminButtons();

    this.childViews.push(this.tabView);    
  },
  manage_groups: function(){
    this.activeMenuId = 'groups-tab';
    this.tabView = new TabGroupsView();
    this.showAdminButtons();

    this.childViews.push(this.tabView);    
  },
  manage_departments: function(){
    this.activeMenuId = 'departments-tab';
    this.tabView = new TabDepartmentsView();
    this.showAdminButtons();

    this.childViews.push(this.tabView);    
  },
  manage_teachers: function(){
    this.activeMenuId = 'teachers-tab';
    this.tabView = new TabTeachersView();
    this.showAdminButtons();

    this.childViews.push(this.tabView);    
  }


});

return  AdminFacultyView;

});

