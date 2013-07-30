define([
    'jquery',
    'underscore',
    'backbone',
    'views/fa/DepartmentElementView'
], function($, _, Backbone, DepartmentElementView){

    var DepartmentListView = Backbone.View.extend({
        collection : null, 
        initialize: function (data){
        	this.render();
        },
        render:function(){
          var that = this;
             
          that.options.entities.each(function(entity) {
            var data = {
              entity:entity,
              teachers: that.options.teachers.models,
              faculties: that.options.faculties.models
            };                
            var elementView = new  DepartmentElementView(data);	
            that.$el.append(elementView.$el.html())
          })
        return this;    
        }
    });
    return  DepartmentListView;
});