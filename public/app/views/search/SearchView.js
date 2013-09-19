define([

  'jquery',
  'underscore',
  'backbone',
  'collections/faculties/FacultiesCollection',
  'collections/courses/CoursesCollection',
  'collections/teachers/TeachersCollection',
  'collections/students/StudentsCollection',
  'text!templates/search/searchTemplate.html',
  'bootpag'

], function ($, _, Backbone, FacultiesCollection, CoursesCollection, TeachersCollection, StudentsCollection, searchTemplate, bootpag){

  var SearchView =  Backbone.View.extend({

    initialize:function(){

              $('#ui-id-1 a').on('click', function(){
                $(this).fadeIn('fast');
              });

      var templ = _.template(searchTemplate);
      $('#content').html(templ);

      var studCollection = new StudentsCollection();
      var teachCollection = new TeachersCollection();
      var teachObj = [];
      var studObj = [];

      function getJSON(collection, obj){
        collection.fetch({
          async:false,
          success:function () {
            obj.push(collection.toJSON());
            return obj;
          }

        });
        return obj;
      }
      function getFacultyJSON(){
        var facultiesCollection = new FacultiesCollection();
        facultiesCollection.fetch({
          async:false,
          success:function (result) {
            var facul = result.toJSON();
            for(var i in facul){
              var option = $('<option></option>').attr('value', facul[i].id).html(facul[i].name);
                console.log(option);
              $('#faculty_select').append($(option));
            }
          }
        });
      }
      function getCourseJSON(){
        var coursesCollection = new CoursesCollection();
        coursesCollection.fetch({
          async:false,
          success:function (result) {
            var course = result.toJSON();
            console.log(course);
            for(var i in course){
              var option = $('<option></option>').attr('value', course[i].id).html(course[i].name);
                console.log(option);
              $('#course_select').append($(option));
            }
          }
        });
      }
      getFacultyJSON();
      getCourseJSON();
            getJSON(studCollection, studObj);
            getJSON(teachCollection, teachObj);

          var people = [];
            people = teachObj.concat(studObj[0]);
          var str = JSON.stringify(people);
          var parsed = JSON.parse(str, function(k, v) {
              if (k === "last_name")
                  this.label = v;
              else
                  return v;
          });

          $( "#search-field" ).autocomplete({
            minLength: 2,
            source: parsed,
            focus: function( event, ui ) {

              $( "#search-field" ).val( ui.item.label + " "+ui.item.name );

              return false;
            },
            select: function( event, ui ) {
              $( "#search-field" ).val( ui.item.label + " "+ ui.item.name);

              if(ui.item.group_id){
                location.href = '#/student/'+ui.item.id;
              }else{
                location.href = '#/teacher/'+ui.item.id;
              }
              return false;
            }
          })
          .data( "ui-autocomplete" )._renderItem = function( ul, item ) {

              if(item.group_id){
                var status = '<span class="status">cтудент</span>';
                var href = '#/student/'+item.id;
              }else{
                var href = '#/teacher/'+item.id;
                var status = '<span class="status">викладач</span>';
              }
            var a = $('<a>' + item.label +" "+item.name+" "+status+'<br>Факультет: Faculty of Science ABD0  -\> Курс: 1 </a>').attr('href', href);
            return $( "<li>" ).append(a).appendTo( ul );
          };
     }
  });
  return SearchView;
});