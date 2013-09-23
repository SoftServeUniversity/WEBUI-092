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
          'click .btn-danger': 'showRemoveDialog',
          'click .btn-success': 'addStudentToGroup'
        },

        showRemoveDialog: function(){
          var message = 'Ви дійсно бажаєте видалити студента\n' +
                        '<strong>' + this.model.get('name') + '</strong>';
          var header = 'Видалення студента';
          removeDialogView = new RemoveDialogView({model: this.model}, {message: message, header: header});
        },

        addStudentToGroup: function(){
          attrs = {'group_pending': 0}
          this.model.set(attrs);
          this.model.save(attrs, {patch: true});
        },

        initialize:function(){
          var me = this;
          this.render();
          this.model.on('destroy', function(){
            me.remove();
          });
        },

        render:function(counter){
            // counter - use for mark each element in a table
            this.model.set('counter', counter);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

    return TableRowView;
});