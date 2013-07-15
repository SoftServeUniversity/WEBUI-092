define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/department/departmentTemplate.html',
    'collections/departments/DepartmentsCollection'
], function($, _, Backbone, departmentTemplate, DepartmentsCollection){

    var DepartmentView =  Backbone.View.extend({
        tagName:'li' ,
        template: _.template(departmentTemplate),

        initialize:function(){
            this.render();
        } ,
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return DepartmentView;

});
