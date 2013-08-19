define([
	
  'jquery',
  'underscore',
  'backbone',
  'models/admin/FaRoleModel',
  'collections/admin/FaRolesCollection',
  'views/admin/tabChildView'

], function($, _, Backbone, FaRoleModel, FaRolesCollection, TabChildView){   
	 
  var tabChildRolesView = TabChildView.extend({


    collections_classes: {
      roles: FaRolesCollection
    },

    setConfig: function(){

    	var me = this; 

      var config = {
      	
        model: FaRoleModel,
        collection: me.collections.roles,
        data: [{
            _link: 'name',
            label:'Role Name',
            type:'text'
          },
          {
            _link: 'role',
            label: 'Role',
            type:'text'
          },
          {
            _link: 'email',
            label: 'Email',
            type:'text'
          }
        ],
        buttons: {
        	create: 'New Role'
        }
      };
      
      return config;

    },
    
    initialize: function(){ 
      //call parent's initialize method
      this.constructor.__super__.initialize.apply(this);
    }

  
  });
  
  return  tabChildRolesView;
  
});
















