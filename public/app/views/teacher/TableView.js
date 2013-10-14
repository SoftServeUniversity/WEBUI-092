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
          if (this.collection.toJSON().length>0){
            //Table caption
            $(this.el).append("<caption><h4>Студенти групи " +
                              this.collection.toJSON()[0].group_name +
                              " для підтвердження</h4></caption>");
            //Table head
            $(this.el).append("<thead id='tab-head'><tr class='table-head'>");
              $(this.el).append("<th class='text-center'>Прізвище, ім'я, по батькові</th>");
              $(this.el).append("<th class='text-center'>E-mail</th>");
              $(this.el).append("<th class='text-center'>Статус</th>");
              $(this.el).append("<th class='text-center'>Зміна статусу</th>");
              $(this.el).append("<th class='text-center'>Відхилити</th>");
            $(this.el).append("</tr></thead>");


            // counter - is used for mark each element in a table
            this.counter = 1;
            this.collection.each(function(model){
              me.renderTableRow(model, me.counter++);
            });
          } else {
            $(this.el).append("<h4>У Вашій групі немає студентів або Ви не є куратором групи</h4>");
          }
        }

    });

    return  TableView;
});