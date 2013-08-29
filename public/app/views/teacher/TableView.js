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

          // counter -  is used for mark each element in a table
          this.counter = 1;
          this.collection.each(function(model){
            me.renderTableRow(model, me.counter++)
          });
        }

    });

    return  TableView;
});
/*
    var TableView = Backbone.View.extend({
        collection : null,
        tagName: 'table',
        className: 'table table-hover .table-condensed',

        initialize: function (){
        },

        render:function(){
            // counter -  is used for mark each element in a table
            // linkTo - is used for creating <a> links if it is needed
            var counter = 1;
            this.collection.each(function(element) {
                var tableElementView = new TableElementView({model: element, linkTo: this.options.linkTo});
                this.$el.append(tableElementView.render(counter++).el);
              }
            );
            return this;
        }

    });

    return  TableView;
});
*/