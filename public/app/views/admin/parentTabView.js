define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/parentTabTemplate.html',
  'views/admin/itemView'
], function($, _, Backbone, parentTabTemplate, ItemView){   
   
  var ParentTabView = Backbone.View.extend({
    
    tagName: 'div',
    
    initialize: function(){
      
      var me = this; 
      
      this.on('onDataLoaded', function(){
           
            me.config = this.setConfig();
            var data = me.buildJSON(me.config)
            me.render(data)
            


            //merge two configs (we'll need both fields and buttons config)
            me.config.entities = data.entities;
            GlobalEventBus.trigger('tabChildSupViewLoaded', me.$el.html(), me.config);
      
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
      this.collection = config.collection;
      var me = this;

      var json_data=config.collection.toJSON();
      
      //json_data['item_buttons'] = {};
      //loop through all entities
      var field_types = [];
      var rel = {};
      var visible_fields = [];
      var labels = [];
        
      if (!config.table_class) {
        config.table_class='';
      }
        //loop through data
        for (i=0; i<config.data.length; i++) {

          var rel_link = config.data[i]['_link'];
          var label = config.data[i]['label']; 

          //if select box
          if (config.data[i]['src']){      
             var rel_src = config.data[i]['src'].toJSON();
               
             //array of foreign keys, mapped to collections
             rel[rel_link]=rel_src;
          }
          
          //get field type to each field
          if (config.data[i]['type']){
            field_types.push(config.data[i]['type'])
          }

          labels.push(label);
          visible_fields.push(config.data[i]['_link'])
        }

        //console.log(rel)
        for (a=0; a<json_data.length; a++){
           json_data[a]['selectbox_items'] = [];  
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

        }

        var data = {};
        data.entities = json_data;
        
        data['table_class'] = config.table_class
        console.log(data)
        return data; 

    },

    render: function (data){
      var me = this;
      var compiledTemplate = _.template(parentTabTemplate, data);
      me.$el.html(compiledTemplate); 


      this.collection.each(function(item) { // iterate through the collection
        var itemView = new ItemView({model: item}); 
        me.$el.append(itemView.el);
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