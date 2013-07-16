define([
    'jquery',
    'underscore',
    'backbone',
    'collections/DepartmentsCollection',
    'views/department/DepartmentView'
], function($, _, Backbone, DepartmentsCollection, DepartmentView){

    var DepartmentsListView = Backbone.View.extend({
        collection : new DepartmentsCollection(),
        tagName: 'ul',
        initialize: function (){
        },
        render:function(){

            this.collection.fetch({
                url: "app/mocks/departments.json",
                async:false
            });
            this.collection.each(function(dep) {
                var departmentView = new DepartmentView({model: dep});
                this.$el.append(departmentView.render().el);
            }, this);

            return this;
        }

    });
    return  DepartmentsListView;
});

