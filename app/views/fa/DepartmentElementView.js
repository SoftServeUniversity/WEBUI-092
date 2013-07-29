define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/fa/departmentElementTemplate.html',
    'text!templates/fa/departmentElementNewTemplate.html'
], function($, _, Backbone, elementTemplate, elementNewTemplate){

    var DepartmentElementView =  Backbone.View.extend({
        tagName:'div' ,
        linkTo: null,

        initialize:function(data){
           //console.log(this.options           if (data.newElement == true){
           	this.template = _.template(elementNewTemplate);
           } else {
           	this.template = _.template(elementTemplate);
           };
           this.data = data;
           
           this.render();           
        } ,
        render:function(data){
            this.$el.html(this.template(this.data))
        }
    });
    return DepartmentElementView;

});
