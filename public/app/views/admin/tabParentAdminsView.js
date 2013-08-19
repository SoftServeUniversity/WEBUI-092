define([
	
  'jquery',
  'underscore',
  'backbone',
  
  'models/admin/FaAdminModel',
  'collections/admin/FaAdminsCollection',
  'views/admin/tabChildView'
  
], function($, _, Backbone, FaAdminModel, FaAdminsCollection, TabChildView){   
	 
  var tabChildAdminsView = TabChildView.extend({


    collections_classes: {
      fadmins: FaAdminsCollection
    },

    setConfig: function(){
    	var me = this;

      var config = {
      	
        model: FaAdminModel,
        collection: me.collections.fadmins,
        data: [{
            _link: 'name',
            label:'Name',
            type :'text'
          },
          {
            _link: 'lastName',
            label:'Last Name',
            type :'text'
          },
          {
            _link: 'middleName',
            label:'Middle Name',
            type :'text'
          },
          {
            _link: 'email',
            label: 'Email',
            type :'text'
          }
        ],
        buttons: {
        	create: 'New Admin'
        }
      };
      
      return config;
    },

    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }
  
  });
  
  return  tabChildAdminsView;
  
});










