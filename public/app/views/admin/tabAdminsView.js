define([
	
  'jquery',
  'underscore',
  'backbone',
  
  'models/admin/FaAdminModel',
  'collections/admin/FaAdminsCollection',
  'views/admin/parentTabView'
  
], function($, _, Backbone, FaAdminModel, FaAdminsCollection, ParentTabView){   
	 
  var tabChildAdminsView = ParentTabView.extend({


    collections_classes: {
      fadmins: FaAdminsCollection
    },

    setConfig: function(){
    	var me = this;

      // verification HACK
      me.verification = {
        collection:me.collections.fadmins,
        tab_id:'admins-tab'
      }

      var config = {
      	
        model: FaAdminModel,
        collection: me.collections.fadmins,
        data: [{
            _link: 'name',
            label:'Ім\'я',
            type :'text'
          },
          {
            _link: 'lastName',
            label:'Прізвище',
            type :'text'
          },
          {
            _link: 'middleName',
            label:'По-батькові',
            type :'text'
          },
          {
            _link: 'email',
            label: 'Email',
            type :'text'
          }
        ],
        buttons: {
        	create: 'Додати адміністратора факультету'
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










