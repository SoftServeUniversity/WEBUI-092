define([
    'jquery',
    'underscore',
    'backbone',
    'collections/departments/DepartmentsCollection',
    'views/department/DepartmentView'
], function($, _, Backbone, DepartmentsCollection, DepartmentView){
    var depJSON = [
        {
            name: 'Кафедра прикладної математики',
            percentage: 25
        },
        {
            name: 'Кафедра геодезії',
            percentage: 80
        },
        {
            name: 'Кафедра міжнародних відносин'
        },
        {
            name: 'Кафедра економіки',
            percentage: 100
        },
        {
            name: 'Кафедра автоматики та метрології',
            percentage: 50
        }
    ];
    var DepartmentsListView = Backbone.View.extend({
        collection : new DepartmentsCollection(depJSON),
        tagName: 'ul',
        initialize: function (){
        },
        render:function(){

            this.collection.each(function(dep) {
                var departmentView = new DepartmentView({model: dep});
                this.$el.append(departmentView.render().el);
            }, this);

            return this;
        }

    });
    return  DepartmentsListView;
});

