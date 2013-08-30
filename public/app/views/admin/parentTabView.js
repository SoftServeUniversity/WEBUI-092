define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/parentTabTemplate.html',
  'views/admin/itemView',
  'views/admin/tabHeadView'
], function($, _, Backbone, parentTabTemplate, ItemView, TabHeadView){   
   
  var ParentTabView = Backbone.View.extend({
    
    tagName: 'div',
    
    initialize: function(){
      
      var me = this; 
      
      this.on('onDataLoaded', function(){
           
            var config = this.setConfig();

            this.collection = config.collection;
            config = this.buildJSON(config);
            me.render(config)

            //merge two configs (we'll need both fields and buttons config)
            GlobalEventBus.trigger('tabChildSupViewLoaded', me.$el.html(), config);
      
            // verification HACK !!!
            if (me.verification){
              me.checkVerification();
            }

            //add event handlers from current tab
            if (me.addCustomEvents) {me.addCustomEvents ()}

      })

      this.loadData();
    },

    /* 
    * bind all collections needed for select-boxes, labels, visible items
    * to items and their fields
    */
    buildJSON: function(config){

        if (!config.table_class){
          config.table_class = '';
        }
        //console.log(rel)
        /*  json_data[a]['selectbox_items'] = [];  
           json_data[a]['item_buttons'] = {};

          var counter = 0;
          for (var e_obj in json_data[a]){

            if (e_obj in rel){    
              json_data[a]['selectbox_items'].push(e_obj);
              json_data[a][e_obj+'_collection'] = rel[e_obj];
            }
            
            json_data[a]['visible_fields'] = visible_fields;
            json_data[a]['labels'] = labels;
            json_data[a]['field_types'] = field_types;
            json_data[a]['item_buttons'] = config.item_buttons
            counter++;
          }

        }*/
        return config;

    },

    render: function (config){
      var me = this;    

      //render containing table
      var compiledTemplate = _.template(parentTabTemplate, { config: config });
      me.$el.html(compiledTemplate); 
    
      //render table head
      var tabHeadView = new TabHeadView({ config: config });
      this.$('#tab-head').append(tabHeadView.render().el); 

      //render rows
      this.collection.each(function(item) {
        var jsonModel = item.toJSON();
        var itemView = new ItemView({ model: jsonModel, config: config }); 
        me.$('#tab-body').append(itemView.render().el)
      });

      return this;
    },

    // verification HACK !!!
    checkVerification: function(){
      var me = this;
      var collection = this.verification.collection.toJSON();
      $.each(collection, function(key, value){
        if (value['verified'] == 0){
          $('#'+me.verification.tab_id).addClass('needs-verification')
        }
      })
    },

    //method to load all collections for tab 
    loadData: function(){

      var me = this;
      var collections_length = 0;
      var loadCounter = 0;
      me['collections'] = {};

      for (var c in me.collections_classes){
        collections_length++;
      }

      for (var c in me.collections_classes){
        me['collections'][c] = new me.collections_classes[c]();
        me['collections'][c].fetch({ success: function(c) {
            loadCounter++;
            if (loadCounter == collections_length){
              me.trigger('onDataLoaded');
            }
          }  
        })
      }
    },

  });
  
  return  ParentTabView;
  
});