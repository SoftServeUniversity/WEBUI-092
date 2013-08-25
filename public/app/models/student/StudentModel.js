define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var StudentModel = Backbone.Model.extend({
        defaults: {
          id: 1,
          name: "Петро",
          patronymic: "Петрович",
          surname: "Петренко",
          progress: 5
        },
        url: '/app/mocks/student.json'
  });

  return StudentModel;

});