define([
    'jquery',
    'underscore',
    'backbone',
    'collections/GroupsCollection',
    'views/department/GroupView'
], function($, _, Backbone, GroupsCollection, GroupView){

    var GroupsListView = Backbone.View.extend({
        collection : new GroupsCollection(),
        tagName: 'ul',
        initialize: function (){
        },
        render:function(){

            this.collection.fetch({
                url: "app/mocks/groups.json",
                async:false
            });
            this.collection.each(function(group) {
                var departmentView = new GroupView({model: group});
                this.$el.append(departmentView.render().el);
            }, this);

            return this;
        }

    });
    return  GroupsListView;
});
