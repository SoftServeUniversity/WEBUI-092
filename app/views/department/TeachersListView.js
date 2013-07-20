define([
    'jquery',
    'underscore',
    'backbone',
    'collections/TeachersCollection',
    'views/department/TeacherView'
], function($, _, Backbone, TeachersCollection, TeacherView){

    var TeachersListView = Backbone.View.extend({
        collection : new TeachersCollection(),
        tagName: 'ul',
        initialize: function (){
        },
        render:function(){

            this.collection.fetch({
                url: "app/mocks/teachers.json",
                async:false
            });
            this.collection.each(function(teacher) {
                var departmentView = new TeacherView({model: teacher});
                this.$el.append(departmentView.render().el);
            }, this);

            return this;
        }

    });
    return  TeachersListView;
});
