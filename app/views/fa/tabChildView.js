/*
 * Цей View отримує при ініціалізації всі необхідні дані
 * для побудови вмісту табів і рендерить універсальний tabChildTemplate
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/tabChildTemplate.html'
], function($, _, Backbone, tabChildTemplate){   
   
  var TabChildView = Backbone.View.extend({
    
    tagName: 'div',
    
    initialize: function(config){
    	      

      var data = this.buildJSON(config);
    
      this.render(data);
     
    },

    
    buildJSON: function(config){
      var json_data=config.entity.toJSON();
    //loop through all entities
      var rel = {};
      var visible_fields = [];
      var labels = [];
        //loop through data
        for (i=0; i<config.data.length; i++) {

          var rel_link = config.data[i]['_link'];
          var label = config.data[i]['label']; 
           
          if (config.data[i]['src']){
             //console.log(config.data[i]['src'])
              
             var rel_src = config.data[i]['src'];
               
             var obj = {};
              
             obj = rel_src;
               
             //array of foreign keys, mapped to collections
             rel[rel_link]=obj;
            
          }
          
          labels.push(label);
          visible_fields.push(config.data[i]['_link'])
        }

        
        for (a=0; a<json_data.length; a++){
           json_data[a]['selectbox_items'] = [];  

          for (var e_obj in json_data[a]){
            if (e_obj in rel){    

              json_data[a]['selectbox_items'].push(e_obj);
              json_data[a][e_obj+'_collection'] = rel[e_obj];
            }
            
            json_data[a]['visible_fields'] = visible_fields;
            json_data[a]['labels'] = labels;
           
          }

        }
        
        var data = {};
        data.entities = json_data;

        return data; 
    },
    
    
    
    render: function (data){
      var that = this;
      var compiledTemplate = _.template(tabChildTemplate, data);
      
     
      that.$el.html(compiledTemplate);
      
      return this;
    },
    
  });
  
  return  TabChildView;
  
});