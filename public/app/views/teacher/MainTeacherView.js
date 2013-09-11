define([
    'jquery',
    'underscore',
    'backbone',
    'collections/courses/CoursesCollection',
    'views/shared/ListView',
    'views/shared/ChartView',
    'text!templates/teacher/mainTeacherTemplate.html',
    'text!templates/teacher/teacherWorksTemplate.html',
    'collections/teachers/TeacherChangeCollection',
    'collections/teachers/TeachersCollection',
    'models/teacher/TeacherModel',
    'collections/work/WorksCollectionOfTeacher'
], function($, _, Backbone,
            CoursesCollection,
            ListView,
            ChartView,
            mainTeacherTemplate,
            teacherWorksTemplate,
            TeacherChangeCollection,
            TeachersCollection,
            TeacherModel,
            WorksCollectionOfTeacher){

    var TeacherView = Backbone.View.extend({

        events: {
          'click .selectTeacherMenu': 'selectTeacherMenuActivate'
        },

        selectTeacherMenuActivate: function(){
          $(document).ready(function(){
            $(".selectTeacherMenu").css("background-color", "black" );
            console.info("this");
          });
        },

        initialize: function(id){
          var that = this;

          var teacherModel = new TeacherModel();
          teacherModel.fetch({
            data: {
              filter: {
                id: id
              }
            },
            success: function() {
              that.trigger('DataLoaded', 'Teacher');
            }
          });

          var worksCollection = new WorksCollectionOfTeacher();
          worksCollection.fetch({
            data: {
              filter: {
                teacher_id: id
              }
            },
            success: function() {
              that.trigger('DataLoaded', 'Works');
            }
          });

          var teacherChangeCollection = new TeacherChangeCollection();
          teacherChangeCollection.fetch({
            success:function () {
              that.trigger('DataLoaded', 'TeacherChange');
            }
          });

          var isTeachLoaded = false;
          var isWorkssLoaded = false;
          var isTeachChangeLoaded = false;

          this.on('DataLoaded', function (item) {
            if (item == 'Teacher') {
              isTeachLoaded = true;
            }

            if (item == 'Works'){
              isWorkssLoaded = true;
            }

            if (item == 'TeacherChange'){
              isTeachChangeLoaded = true;
            }

            if ((isTeachLoaded && isTeachChangeLoaded && isWorkssLoaded) == true){
              that.render(id, teacherModel, worksCollection, teacherChangeCollection);
            }
          });

          this.on('destroy', function(){
            me.off();
            me.remove();
          });
        },

        render: function(id, teacherModel, worksCollection, teacherChangeCollection){
          var teacher = teacherModel.toJSON()[0];

          var worksJSON = worksCollection.toJSON();

          var works = {};
          for (var i = 0; i < worksJSON.length; i++) {
            var course_name = worksJSON[i].course_name;
            if (!(course_name in works)){
              works[course_name] = [];
            }
            works[course_name].push(worksJSON[i]);
          };

          var dataForMainTeacherTemplate = {
            teacher: teacher
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);

          var dataForTeacherThesisTemplate = {
            works: works
          }
          var teacherThesisCompiledTemplate = _.template(teacherWorksTemplate, dataForTeacherThesisTemplate);
          $("#teacherPageContent").html(teacherThesisCompiledTemplate);

          var chartView = new ChartView({
            collection: teacherChangeCollection
          });
          chartView.render();

          return this;
        }
    });

    return TeacherView;
});