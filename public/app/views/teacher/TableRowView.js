define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/teacher/tableRowTemplate.html',
    'views/shared/RemoveDialogView'
], function($, _, Backbone, tableRowTemplate, RemoveDialogView){

    var TableRowView = Backbone.View.extend({
        tagName:'tr' ,
        template: _.template(tableRowTemplate),
        linkTo: null,
        events: {
          'click .btn-danger': 'showRemoveDialog'
        },

        showRemoveDialog: function(){
          removeDialogView = new RemoveDialogView({model: this.model});
        },

        initialize:function(){
          var me = this;
          this.render();
          this.model.on('destroy', function(){
            me.removeView();
          });
        },

        render:function(counter){
            // counter -  is used for mark each element in a table
            this.model.set('counter', counter);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        removeView: function(){

        }
    });

    return TableRowView;
});