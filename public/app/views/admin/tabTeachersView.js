define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/group/GroupModel',
  'collections/teachers/TeachersCollection',
  'collections/faculties/FacultiesCollection',
  'collections/groups/GroupsCollection'



], function($, _, Backbone, ParentTabView, GroupModel,
            TeachersCollection, FacultiesCollection, GroupsCollection){   
   
  var TabTeachersView = ParentTabView.extend({

    collections_classes: {
      teachers     : TeachersCollection,
      faculties    : FacultiesCollection,
      groups       : GroupsCollection,


    },

    setConfig: function(){

      var me = this;
      
      // verification HACK
      me.verification = {
        collection:me.collections.teachers,
        tab_id:'teachers-tab'
      };

      var config = {
      	
        model     : GroupModel,
        collection: me.collections.teachers,
        data      : [{
            _link: 'name',
            label: 'Ім\'я викладача',
            type : 'text'
          },
          {
            _link: 'faculty_id',
            label: 'Факультет',
            type:'select',
            src:me.collections.faculties
          },
          {
            _link: 'group_id',
            label: 'Група',
            type:'select',
            src:me.collections.groups
          }
        ],
        buttons: {
        	create : 'Додати викладача'
        }
      
      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }

  });
  
  return  TabTeachersView;
  
});