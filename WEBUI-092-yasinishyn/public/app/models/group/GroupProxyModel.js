define([
  'underscore',
  'backbone',
  'models/group/GroupModel'
], function(_, Backbone, GroupModel) {

  var GroupProxyModel = Backbone.Model.extend({
    initialize : function (attributes) {
        var group = new GroupModel( {id: attributes.id});
        console.log(this);
        this.set('name',"Група " + attributes.name + ". " );
        this.set('progress', attributes.percentage) ;
        this.set('count',"Кількість cтудентів - " +" " + attributes.num_students) ;
        this.set('name_with_url', '<a href=#/group/'+this.id+'>'+attributes.name+'</a>');

        return group;
    }
  });

  return GroupProxyModel;

});