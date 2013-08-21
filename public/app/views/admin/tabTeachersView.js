define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/group/GroupModel',
  'collections/teachers/TeachersCollection'

], function($, _, Backbone, ParentTabView, GroupModel,
            TeachersCollection){   
   
  var TabTeachersView = ParentTabView.extend({

    collections_classes: {
      teachers    : TeachersCollection,
    },

    setConfig: function(){
      
      var me = this;
      
      var config = {
      	
        model     : GroupModel,
        collection: me.collections.teachers,
        data      : [{
            _link: 'name',
            label: 'Teacher Name',
            type : 'text'
          }
        ],
        buttons: {
        	create : 'New Teacher'
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