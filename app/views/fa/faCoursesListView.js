define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/fa/coursesListTemplate.html',
  'collections/fa/FaCoursesCollection',
], function($, _, Backbone, coursesListTemplate, FaCoursesCollection){   

  var faCoursesListView = Backbone.View.extend({
    el: $('#content'),
    render: function (){
      var that = this;

      var faCoursesCollection = new FaCoursesCollection();
        faCoursesCollection.fetch({
            url: "app/mocks/fa/courses.json",
            async: false
        });
      var data = {
          entities: faCoursesCollection.models,
          _: _
        };
      var compiledTemplate = _.template( coursesListTemplate, data);

      this.$el.html(compiledTemplate);
    },
    events: {
      'click .open-modal' : 'openModal',
      'click .close-m'      : 'closeModal',
      'click .save'       : 'closeModal'
    },
    openModal: function(){
      $('#menage-role').modal('show');
    },
    closeModal: function(){
      $('#menage-role').modal('hide');
    }
  });
  return  faCoursesListView;
});