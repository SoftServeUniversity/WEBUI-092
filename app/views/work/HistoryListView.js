define([
  'jquery',
  'underscore',
  'backbone',
  'views/work/HistoryView'
], function($, _, Backbone, HistoryView){

  var HistoryListView = Backbone.View.extend({
    collection : null,
    tagName: 'div',
    initialize: function (){
    },
    render:function(){
      // counter -  is used for mark each element in a table
      // linkTo - is used for creating <a> links if it is needed
        var counter = 1;
        this.collection.each(function(element) {
          var historyView = new HistoryView({model: element, linkTo: this.options.linkTo});
          this.$el.append(historyView.render(counter++).el);
        }, this);

      return this;
    }

  });
  return HistoryListView;
});

