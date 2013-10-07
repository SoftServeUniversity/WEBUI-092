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
        events: {
          'click .btn-danger': 'showRemoveDialog',
          'click .confirmLoginStudent': 'confirmLoginStudent',
          'click .forbidLoginStudent': 'forbidLoginStudent'
        },

        showRemoveDialog: function(){
          var message = 'Ви дійсно бажаєте видалити студента\n' +
                        '<strong>' + this.model.get('name') + '</strong>';
          var header = 'Видалення студента';
          removeDialogView = new RemoveDialogView({model: this.model}, {message: message, header: header});
        },

        confirmLoginStudent: function(){
          var me = this;
          attrs = {'role_pending': false};
          this.model.set(attrs);
          // Save only attrs,
          // when succes - render row again
          this.model.save(
            attrs,
            {
              patch: true,
              wait: true,
              success: function(model, response){
                me.render(me.counter);
              }
            }
          );
        },

        forbidLoginStudent: function(){
          var me = this;
          attrs = {'role_pending': true};
          this.model.set(attrs);
          // Save only attrs,
          // when succes - render row again
          this.model.save(
            attrs,
            {
              patch: true,
              wait: true,
              success: function(model, response){
                me.render(me.counter);
              }
            }
          );
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
          this.counter = counter;
          this.$el.html(this.template(this.model.toJSON()));
          return this;
        }

    });

    return TableRowView;
});