define([
    'jquery',
    'underscore',
    'backbone',
    'views/fa/DepartmentElementView',
    'text!templates/fa/departmentsListTemplate.html'

], function($, _, Backbone, DepartmentElementView, DepartmentsListTemplate){

    var DepartmentListView = Backbone.View.extend({
        collection : null, 
        initialize: function (data){
        	this.render();
        },
        render:function(){
          var that = this;
          
          //all element views 
          var elViews = [];   
          
          that.options.entities.each(function(entity) {
            var data = {
              entity:entity,
              teachers: that.options.teachers.models,
              faculties: that.options.faculties.models
            };                

            
            var elementView = new  DepartmentElementView(data);	
            elViews += elementView.$el.html();
          })
          data = {
          	elViews: elViews
          }
           
            var compiledTemplate = _.template( DepartmentsListTemplate, data);
            this.$el.append(compiledTemplate);

        return this;    
        }
    });
    return  DepartmentListView;
});