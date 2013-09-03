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
                        '<strong>' + this.model.get('student_full_name') + '</strong>';
          var header = 'Видалення студента';
          removeDialogView = new RemoveDialogView({model: this.model}, {message: message, header: header});
        },

        initialize:function(){
          var me = this;
          this.render();
          this.model.on('destroy', function(){
            console.log('Remove view');
            me.remove();
          });
        },

        render:function(counter){
            // counter -  is used for mark each element in a table
            this.model.set('counter', counter);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        removeView: function(){
          this.remove();
          alert('Remove view');
        },

        addStudentToGroup: function(){
          attrs = {'group_pending': 1}
          this.model.set(attrs);
          this.model.save(attrs, {patch: true});
        }
    });

    return TableRowView;
});