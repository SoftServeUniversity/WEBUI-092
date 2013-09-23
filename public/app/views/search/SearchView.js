define([

  'jquery',
  'underscore',
  'backbone',
  'collections/faculties/FacultiesCollection',
  'collections/courses/CoursesCollection',
  'collections/teachers/teachersProxyCollection',
  'collections/students/StudentsProxyCollection',
  'text!templates/search/SearchTemplate.html',
  'bootstrapselect',
  'bootstrap_datatables'


], function ($, _, Backbone, FacultiesCollection, CoursesCollection, TeachersCollection, StudentsCollection, SearchTemplate, bootstrapselect, datatables){

  var SearchView =  Backbone.View.extend({
    initialize:function(){
      
      $('#ui-id-1 a').on('click', function(){
        $(this).fadeIn('fast');
      });
      var compiledTemplate = _.template( SearchTemplate );
      $("#content").html(compiledTemplate);
  
      $('select').selectpicker();
      var studCollection = new StudentsCollection();
      var teachCollection = new TeachersCollection();
      var f_id = "";
      var c_id = "";
      window.parsed = [];

      $('#search-field').on('keyup', function(){
        console.log("f_id");
        console.log(f_id);
        console.log("c_id");
        console.log(c_id);
        var letters = $(this).val();
        if(letters.length == 2){
          $('#search-field').css('background', 'white url("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/themes/smoothness/images/ui-anim_basic_16x16.gif") 310px center no-repeat');
          (function(){
            var teachObj = [];
            var studObj = [];
            var parsed = "";

            getJSON(studCollection, studObj, letters);
            getJSON(teachCollection, teachObj, letters);
            var people = [];
           
              people = teachObj[0].concat(studObj[0]);

            var str = JSON.stringify(people);
            var parsed = JSON.parse(str, function(k, v) {
                if (k === "name")
                    this.label = v;
               else
                    return v;
            });
            console.log('parsed');
            console.log(parsed);
            return window.parsed = parsed;
          }());
          auto(window.parsed);
          $('#search-field').css('background', '#fff');
        }
      });


      $('button[data-id = faculty_select]').removeClass('btn-default').addClass('btn-info btn-mini');
      $('button[data-id = course_select]').removeClass('btn-default').addClass('btn-success btn-mini');
      $('html').click(function() {
        $('#select-box div.dropdown-menu').hide();
      });

      $('button[data-id = faculty_select], button[data-id = course_select]').on('click', function(){
        $(this).siblings('div.dropdown-menu').fadeToggle();
      });
      $('#select-box div.dropdown-menu').click(function(){
        window.parsed = [];
        $('#search-field').val('');
        if($(this).siblings('button[data-id = faculty_select]').length){
          window.parsed = [];
          if($(this).find('li').first().attr('selected')){
            f_id = "";
          }else{
            f_id = $(this).find('li[class = selected] a').attr('data-val');
          }
        console.log(f_id);
        }else if($(this).siblings('button[data-id = course_select]').length){
          if($(this).find('li').first().attr('selected')){
            c_id = "";

          }else{
            c_id = $(this).find('li[class = selected]').find('a').attr('data-val');
          }
          console.log(c_id);
        }
      });

      $('#search-block').click(function(event){
          event.stopPropagation();
          $('#select-box').show();
          
      });
      $(window).on('hashchange', function() {
        $('#select-box').hide();
          $('#search-field').val("");
      });

      function getFacultyJSON(){
        var facultiesCollection = new FacultiesCollection();
        facultiesCollection.fetch({
          async:false,
          success:function (result) {
            var facul = result.toJSON();
            for(var i in facul){
              var option = $('<a></a>').attr('data-val', facul[i].id).html(facul[i].name);
              var li = $("<li></li>").html($(option));
              $('button[data-id = faculty_select] + div.dropdown-menu').find('ul').append(li);
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
            for(var i in course){
              var option = $('<a></a>').attr('data-val', course[i].id).html(course[i].name);
              var li = $("<li></li>").html($(option));
              $('button[data-id = course_select] + div.dropdown-menu').find('ul').append(li);
            }
          }
        });
      }

      function getJSON(collection, obj, letter){
        collection.fetch({
          data: {search: 'true', two_last_name: letter, s_faculty_id: f_id, s_course_id: c_id},
          async:false,
          success:function () {
            obj.push(collection.toJSON());
            return obj;
          }
        });
        return obj;
      }
      getFacultyJSON();
      getCourseJSON();
     

      $('button[data-id = faculty_select] + div.dropdown-menu').find('ul li').on('click', function(){
        $('button[data-id = faculty_select] + div.dropdown-menu').find('ul li').removeClass('selected');
        $(this).addClass('selected');
        $('#search-container div.dropdown-menu').hide();
      });

      $('button[data-id = course_select] + div.dropdown-menu').find('ul li').on('click', function(){
        $('button[data-id = course_select] + div.dropdown-menu').find('ul li').removeClass('selected');
        $(this).addClass('selected');
        $('#search-container div.dropdown-menu').hide();
      });

      $("button[data-id = course_select] + div.dropdown-menu li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.btn-group').find('button[data-id = course_select]').html(selText);
      });

      $("button[data-id = faculty_select] + div.dropdown-menu li a").click(function(){
        var selText = $(this).text();
        $(this).parents('.btn-group').find('button[data-id = faculty_select]').html(selText);
      });
          $('.searchDataTable').dataTable({
              bDestroy: true,
              "oLanguage": {
                sUrl: "app/libs/datatables/searchDataTables.ukrainian.txt"
              }
            });         
      
          $('#searchFormButton').click(drawTable); 

          function drawTable(){
            $('.searchDataTable tbody').remove();
              if($('#search-field').val().length > 1){
                var tbody = $("<tbody></tbody>");
                  for(var l in parsed){
                    if(parsed[l].degree){
                      var st = 'викладач';
                      var statusClass = 'teacher';
                      var course = "-";
                    }else{
                      var st = 'студент';
                      var statusClass = 'student';
                      var course = parsed[l].course_name;
                    }
                    var names = parsed[l].label.split(/[ ]+/);
                    var tr = $('<tr></tr>').attr('data-href', '#/'+statusClass+"/"+parsed[l].id)
                                            .append($('<td>'+(parseInt(l)+1)+'</td>'))
                                            .append($('<td>'+parsed[l].last_name+'</td>'))
                                            .append($('<td>'+names[0]+'</td>'))
                                            .append($('<td>'+parsed[l].middle_name+'</td>'))
                                            .append($('<td>'+parsed[l].faculty_name+'</td>'))
                                            .append($('<td>'+parsed[l].department_name+'</td>'))
                                            .append($('<td>'+course+'</td>'))
                                            .append($('<td>'+st+'</td>'));
                      $(tbody).append(tr);                      
        
                    
                  }
                  $('.searchDataTable').append(tbody);
              }
              $('.searchDataTable').dataTable({
                bDestroy: true,
                "oLanguage": {
                  sUrl: "app/libs/datatables/searchDataTables.ukrainian.txt"
                }
              });
          }
            
           
      function auto(source){
        $( "#search-field" ).autocomplete({
            minLength: 2,
            source: source,
            focus: function( event, ui ) {
              $( "#search-field" ).val( ui.item.label );

              return false;
            },
            select: function( event, ui ) {
              $( "#search-field" ).val( ui.item.label );
              if(ui.item.course_id){
                location.href = '#/student/'+ui.item.id;
                
              }else{
                location.href = '#/teacher/'+ui.item.id;
              }
              return false;
            }
          })
          .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
              if(item.course_id){
                var status = '<span class="status">cтудент</span>';
                var href = '#/student/'+item.id;
              }else{
                var href = '#/teacher/'+item.id;
                var status = '<span class="status">викладач</span>';
              }
            if(("#ui-id-1 li").length > 1){
                $("#ui-id-1 li").eq(8).nextAll().remove();
            }
            var searchInfo = $('<span></span>').addClass('searchInfo').html('');
            var a = $('<a>' + item.label +" "+status);
            return $( "<li>" ).append(a).appendTo( ul );
          };
      } 
      function loadSign(){
        if($('#search-field').val().length != 2){
          $('#search-field').css('background', '#fff');
        }
      }
      setInterval(loadSign, 1000);
      function HandleDOM_Change () {

            $('.searchDataTable tr').on('click', function(){
              if($(this).attr('data-href')){
                location.href = $(this).attr('data-href');
              }
            });

      }
          
          fireOnDomChange ('.searchDataTable tr', HandleDOM_Change, 100);

      function fireOnDomChange (selector, actionFunction, delay){
          $(selector).bind ('DOMSubtreeModified', fireOnDelay);

          function fireOnDelay () {
              if (typeof this.Timer == "number") {
                  clearTimeout (this.Timer);
              }
              this.Timer  = setTimeout (  function() { fireActionFunction (); },
                                          delay ? delay : 333
                                       );
          }

          function fireActionFunction () {
              $(selector).unbind ('DOMSubtreeModified', fireOnDelay);
              actionFunction ();
              $(selector).bind ('DOMSubtreeModified', fireOnDelay);
          }
      }

    }
  });
  return SearchView;
});