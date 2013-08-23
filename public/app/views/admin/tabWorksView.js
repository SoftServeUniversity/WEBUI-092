define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/parentTabView',
  'models/work/WorkTasksModel',
  'collections/work/WorkCollection'

], function($, _, Backbone, ParentTabView, WorkModel,
            WorkCollection){   
   
  var TabWorksView = ParentTabView.extend({

    collections_classes: {
      works       : WorkCollection
    },

    setConfig: function(){
      var me = this;

      var config = {
      	
        model     : WorkModel,
        collection: me.collections.works,
        data      : [{
            _link: 'name',
            label:'Роботи',
            type:'text'
          }
        ],
        buttons: {
        	create: 'Додати роботу'
        }

      };
      
      return config;
    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  TabWorksView;
  
});