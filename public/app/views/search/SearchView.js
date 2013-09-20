define([

  'jquery',
  'underscore',
  'backbone',
  'collections/faculties/FacultiesCollection',
  'collections/courses/CoursesCollection',
  'collections/teachers/teachersProxyCollection',
  'collections/students/StudentsProxyCollection'


], function ($, _, Backbone, FacultiesCollection, CoursesCollection, TeachersCollection, StudentsCollection){

  var SearchView =  Backbone.View.extend({

    initialize:function(){
              $('#ui-id-1 a').on('click', function(){
                $(this).fadeIn('fast');
              });


      var studCollection = new StudentsCollection();
      var teachCollection = new TeachersCollection();
      var teachObj = [];
      var studObj = [];
      var f_id = "";
      var c_id = "";

      $('html').click(function() {
        $('#select-box').hide();
        $('#search-field').css('width', '50px').val("");
      });

      $('#search-block').click(function(event){
          event.stopPropagation();
          $('#select-box').show();
          $('#search-field').css('width', 'auto');
      });
      $(window).on('hashchange', function() {
        $('#select-box').hide();
          $('#search-field').css('width', '50px').val("");
      });
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
              $('#faculty_select').append($(option));
            }
          }
        });
      }
      $('#course_select').on('change', function(){
        if($(this).find('option:selected').attr('value')){
          f_id = $(this).find('option:selected').attr('value');
        }else{
          f_id = "";
        }
      });
      $('#faculty_select').on('change', function(){
        if($(this).find('option:selected').attr('value')){
          c_id = $(this).find('option:selected').attr('value');
        }else{
          c_id = "";
        }
      });
      function getCourseJSON(){
        var coursesCollection = new CoursesCollection();
        coursesCollection.fetch({
          async:false,
          success:function (result) {
            var course = result.toJSON();
            for(var i in course){
              var option = $('<option></option>').attr('value', course[i].id).html(course[i].name);
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
            people = teachObj[0].concat(studObj[0]);
          var str = JSON.stringify(people);
          var parsed = JSON.parse(str, function(k, v) {
              if (k === "name")
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

              if(ui.item.epartment_id){
                location.href = '#/teacher/'+ui.item.id;
              }else{
                location.href = '#/student/'+ui.item.id;
              }
              return false;
            }
          })
          .data( "ui-autocomplete" )._renderItem = function( ul, item ) {

              if(item.department_id){
                var href = '#/teacher/'+item.id;
                var status = '<span class="searchInfo"><span class="status">викладач</span><br> Факультет: Faculty of Science ABD0  -\> Кафедра: Назва кафедри</span>';
              }else{
                var status = '<span class="searchInfo"><span class="status">cтудент</span><br> Факультет: Faculty of Science ABD0  -\> Курс: 1</span>';
                var href = '#/student/'+item.id;
              }
            var searchInfo = $('<span></span>').addClass('searchInfo').html('');
            var a = $('<a>' + item.label +" "+status);
            return $( "<li>" ).append(a).appendTo( ul );
          };
     }
  });
  return SearchView;
});