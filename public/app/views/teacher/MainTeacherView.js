define([
    'jquery',
    'underscore',
    'backbone',
    'collections/courses/CoursesCollection',
    'views/shared/ListView',
    'views/shared/ChartView',
    'views/teacher/TeacherAddWorkDialogView',
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
            TeacherAddWorkDialogView,
            mainTeacherTemplate,
            teacherWorksTemplate,
            TeacherChangeCollection,
            TeachersCollection,
            TeacherModel,
            WorksCollectionOfTeacher){

    var TeacherView = Backbone.View.extend({

        initialize: function(id){
          var that = this;
          this.id = id;

          this.teacherModel = new TeacherModel();
          this.teacherModel.fetch({
            data: {
              filter: {
                id: id
              }
            },
            success: function() {
              that.trigger('DataLoaded', 'Teacher');
            }
          });

          this.worksCollection = new WorksCollectionOfTeacher();
          this.worksCollection.fetch({
            data: {
              filter: {
                teacher_id: id
              }
            },
            success: function() {
              that.trigger('DataLoaded', 'Works');
            }
          });

          this.teacherChangeCollection = new TeacherChangeCollection();
          this.teacherChangeCollection.fetch({
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
              that.render(id);
            }
          });

          this.on('destroy', function(){
            me.off();
            me.remove();
          });
        },

        render: function(){
          var teacher = this.teacherModel.toJSON()[0];

          var worksJSON = this.worksCollection.toJSON();

          var works = {};
          for (var i = 0; i < worksJSON.length; i++) {
            var course_name = worksJSON[i].course_name;
            if (!(course_name in works)){
              works[course_name] = [];
            }
            works[course_name].push(worksJSON[i]);
          };

          var dataForMainTeacherTemplate = {
            teacher: teacher,
            activeLink: "teacherWorksPage"
          }
          var compiledTemplate = _.template(mainTeacherTemplate, dataForMainTeacherTemplate);
          $("#content").html(compiledTemplate);

          var dataForTeacherThesisTemplate = {
            works: works
          }
          var teacherThesisCompiledTemplate = _.template(teacherWorksTemplate, dataForTeacherThesisTemplate);
          $("#teacherPageContent").html(teacherThesisCompiledTemplate);

          var teacherAddWorkDialogView = new TeacherAddWorkDialogView(this.id);
          $("#teacherAddWorkDialogContent").html(teacherAddWorkDialogView.$el)

          var chartView = new ChartView({
            collection: this.teacherChangeCollection
          });
          chartView.render();

          return this;
        }
    });

    return TeacherView;
});