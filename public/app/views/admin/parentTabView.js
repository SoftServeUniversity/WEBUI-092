define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/parentTabTemplate.html',
  'views/admin/itemView',
  'views/admin/tableHeadView'

], function($, _, Backbone, parentTabTemplate, ItemView, TableHeadView){   
   
  var ParentTabView = Backbone.View.extend({
    
    tagName: 'div',
    
    
    initialize: function(){
    
      this.childViews = [];  

      var me = this;
      var config;
      
      this.loadData();
      this.on('dataLoaded', function(){
        
        me.config = me.setConfig();
        me.config = me.augmentConfig();

        me.collection = me.config.collection;
        

        me.render(me.config)

        //all content has loaded, it's time for parent view to render tab
        GlobalEventBus.trigger('tabSubViewLoaded', me.$el, me.config, me);
        
        GlobalEventBus.on('NewItemAdded', function(model){
          me.renderSingleItem(model);
        })
        //display question mark on tab if some model needs verification
        if (me.config.verification){
          me.checkVerification(me.config.verification);
        }

        //this method is used only in works view
        if (me.addCustomEvents) {me.addCustomEvents ()}
      })


    },

    augmentConfig: function(){

        if (!this.config.table_class){
          this.config.table_class = '';
        }
        return this.config;

    },

    render: function (){
      
      var me = this;    

      //render containing table
      var compiledTemplate = _.template(parentTabTemplate, { conf: me.config });
      me.$el.html(compiledTemplate); 
    
      //render table head
      var tableHeadView = new TableHeadView({ conf: me.config });
      me.$('#tab-head').html(tableHeadView.render().$el); 
      me.childViews[tableHeadView.cid] = tableHeadView;    

      //render rows
      this.collection.each(function(item) {
        me.renderSingleItem(item)
      });
      
      return this;
    },
    
    renderSingleItem: function(item){
      var me = this;
      this.config.newModel = false;
      var itemView = new ItemView({ model: item, conf: this.config, newModel: false });

      me.childViews[itemView.cid] = itemView;    
      me.$('#tab-body').append(itemView.render().$el)
    },

    checkVerification: function(config){

      console.log('checkin verification')
      var me = this;

      var collection = me.config.collection.toJSON();
      
      $.each(collection, function(key, value){
        if (value['role_pending'] == 1){         
          $('#'+me.config.verification.tab_id).addClass('needs-verification')
        }
      })

    },

    //asynchronously load all collections what tab needs
    loadData: function(){
      var filter; 
      var me = this;
      var collections_length = 0;
      var loadCounter = 0;
      me['collections'] = {};

      if (this.dataFilter != undefined){
        filter = { filter: this.dataFilter };
      } 
      
      for (var c in me.collections_classes){
        collections_length++;
      }
      for (var c in me.collections_classes){
        me['collections'][c] = new me.collections_classes[c]();
        me['collections'][c].fetch({ data: filter, success: function(c) {
            loadCounter++;
            if (loadCounter == collections_length){
              me.trigger('dataLoaded');
            }
          }  
        })
      }
    }


 
  });
  
  return  ParentTabView;
  
});