define([
    'jquery',
    'underscore',
    'backbone',
    'views/teacher/TableRowView'
], function($, _, Backbone, TableRowView){
    var TableView = Backbone.View.extend({
        tagName: 'table',
        className: 'table table-hover table-condensed',

        initialize: function (){
          _.bindAll(this, "renderTableRow");
          _.bindAll(this, "render");
          this.render();
        },

        renderTableRow: function(model, counter){
          var tableRowView = new TableRowView({model: model});
          $(this.el).append(tableRowView.render(counter).el);
        },

        render:function(){
          var me = this;
          // Add header to the table
          $(this.el).append('<caption><h4>Студенти для підтвердження</h4></caption>');

          // counter - is used for mark each element in a table
          this.counter = 1;
          this.collection.each(function(model){
            me.renderTableRow(model, me.counter++);
          });
        }

    });

    return  TableView;
});