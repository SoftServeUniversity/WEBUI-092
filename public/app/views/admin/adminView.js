define([
  'jquery',
  'underscore',
  'backbone',
  'collections/admin/FaAdminsCollection',
  'views/admin/parentAdminView',

  //subViews for handlers
  'views/admin/tabAdminsView',
  'views/admin/tabFacultiesView',

  'views/admin/tabDbView',
  'views/admin/tabInfoView'  

], function ($, _,  Backbone, FaAdminsCollection,

            ParentAdminView, TabAdminsView, TabFacultiesView, TabDbView, TabInfoView) {   
  
  var AdminView = ParentAdminView.extend({  
    
    headline: 'Адміністратор',
    
    defaultActiveTab: 'admins-tab',

    //tab menu buttons (you can add your buttons here)
    tabMenuConfig: [

      {
        id:'admins-tab',
        label: 'Адміністратори факультетів',
        action: 'manage_admins'
      },
      {
        id:'faculties-tab',
        label: 'Факультети',
        action: 'manage_faculties'
      },    
      {
        id:'database-tab',
        label: 'Управління базою даних',
        action: 'manage_database'
      },    
      {
        id:'info-tab',
        label: 'Інформація про систему',
        action: 'manage_info'
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
    
    manage_info: function(){
      var me = this; 

      this.addActiveClass('info-tab');
      var tabInfoView = new TabInfoView();
      $(this.el_tab_content).html(tabInfoView.$el.html())
      this.hideAdminButtons();

      var editor = $('.wysiwyg').wysihtml5({locale: "ua-UA"}); 
      
      $('body iframe').load(function(){    

        var listen_event = true;
        $('body iframe').contents().find('body').bind("keydown click", function(e){
            setTimeout(function(){
                if(listen_event){
                   var content = $('body iframe').contents().find('body').html();

                   GlobalEventBus.trigger('infoChanged', content)
                }
            },1);
        });
     
      })

    },
    
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













