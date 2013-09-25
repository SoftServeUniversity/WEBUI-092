define([
  'jquery',
  'underscore',
  'backbone',
  'collections/faculties/FacultiesCollection',
  'views/admin/parentAdminView',
  
  //subViews
  'views/admin/tabAdminsView',
  'views/admin/tabCoursesView',
  'views/admin/tabGroupsView',
  'views/admin/tabDepartmentsView',
  'views/admin/tabTeachersView'

], function ($, _,  Backbone, FacultiesCollection,
            ParentAdminView, TabAdminsView, TabCoursesView,
             TabGroupsView, TabDepartmentsView, TabTeachersView) {
  
var AdminFacultyView = ParentAdminView.extend({  
  
  facultyName: 'Default Faculty Name',

  headline: 'Адміністратор факультету',

  defaultActiveTab: 'teachers-tab',

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
    }
  ],
  

  initialize: function(){
    this.getFacultyName(GlobalUser.currentUser.attributes.faculty_admin_attributes.faculty_id);
    this.constructor.__super__.initialize.apply(this);
  },

  getFacultyName: function(id){
    var faculties = new FacultiesCollection();
    faculties.fetch({ data:{ filter:{ id: id }, }, async:false} );
    this.facultyName = faculties.toJSON()[0].name;
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

