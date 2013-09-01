define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/admin/itemTemplate.html'
 
], function ($, _, Backbone, ItemTemplate) {   
  
    var ItemView = Backbone.View.extend({ 
      
      tagName: 'tr', 
      
      className: 'toggle-list',
      
      template: _.template(ItemTemplate),

      initialize: function(data){
        var me = this; 
        this.data = data;
        //$(".delete-button").on("click", "document", function(event){
        // alert('asdf');
        //});

       //this.model.on("reset", this.updateView);
       console.log(this)
      },

      events: {
        'click' : 'test',
        'click .delete-button' : function(){ alert ('pancakes') }    
      },

      updateView: function(){
        this.remove();
      },

      test: function(){
          console.log('i never fire ')
          alert('i never fire ');
      },

      render: function(){
        
        var me = this;

        me.data.model = me.data.model.toJSON();
        
        var compiledTemplate = me.template(me.data);

        me.$el.html(compiledTemplate); 
        
        return me;

      }

    });

    return  ItemView;

});
