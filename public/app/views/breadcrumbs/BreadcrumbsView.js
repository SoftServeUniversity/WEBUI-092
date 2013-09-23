define([

  'jquery',
  'underscore',
  'backbone',
  'collections/faculties/FacultiesCollection',
  'collections/departments/DepartmentsCollection',
  'collections/courses/CoursesCollection',
  'collections/groups/GroupsCollection',
  'collections/teachers/TeachersCollection',
  'collections/students/StudentsCollection',
  'collections/work/WorkCollection',
  'collections/tasks/TasksCollection'

], function mainFunc($, _, Backbone, FacultiesCollection, 
  DepartmentsCollection, CoursesCollection, GroupsCollection, 
  TeachersCollection, StudentsCollection, WorksCollection, TasksCollection){

  var BreadcrumbsView =  Backbone.View.extend({
    initialize:function(){
      //first info from URI
      var that = this;
      var place = location.hash;
      var page = place.slice(2);
      var index = page.indexOf('\/');
      var index_page = page.slice(index+1);
      var collType = page.substr(0, index);
      var current = "";
      var breadcrumbsObj = []; 
      var seen = {};
      var parent_id = "";
      var parent_id_val = "";
     
      //first parent_id
      switch(collType){
        case "task": parent_id = "work_id";break;
        case "work": parent_id = "student_id";break;
        case "student": parent_id = "group_id";break;
        case "teacher": parent_id = "department_id";break;
        case "group": parent_id = "department_id";break;
        case "course": parent_id = "department_id";break;
        case "department": parent_id = "faculty_id";break;
        default: parent_id = "";break;
      }

      function firstBreadcrumbsFetch(){
        current.fetch({
          async:false,
          data: {
            filter: {
              id: index_page
            }
          },
          success:function (arg) {

            var a = arg.toJSON();            
            for(var i = 0; i < a.length; i++){
              var cssClass = collType;
              getInfo(a[i].name, a[i].last_name, a[i].id, cssClass);
              parent_id_val = a[i][parent_id];
              breadcrumbsFetch(parent_id, a[i][parent_id]);
            }
          }
        });
      }

      function breadcrumbsFetch(id, val){ 
        current.fetch({
          async:false,
          data: {
            filter: {
              id: val
            }
          },
          success:function (result) {
            var a = result.toJSON();
            for(var i = 0; i < a.length; i++){
              var cssClass = '';

                if (a[i].work_id){
                  current = new WorksCollection();
                  breadcrumbsFetch(parent_id, parent_id_val);
                  cssClass = "task";
                  getInfo(a[i].name, null, a[i].id, cssClass);
                
                } else if(a[i].student_id){
                  
                  if(parent_id != 'student_id'){
                    parent_id = 'student_id';
                    parent_id_val = a[i].student_id;
                  }
                  current = new StudentsCollection();
                  breadcrumbsFetch(parent_id, parent_id_val);
                  cssClass = "work";
                  getInfo(a[i].name, null, a[i].id, cssClass);
       

                } else if(a[i].group_id){
                  
                  if(parent_id != 'group_id'){
                    parent_id = 'group_id';
                    parent_id_val = a[i].group_id;
                  }
                  current = new GroupsCollection();
                  breadcrumbsFetch(parent_id, parent_id_val);
                  cssClass = "student";
                  getInfo(a[i].name, a[i].last_name, a[i].id, cssClass);


                } else if(a[i].degree){
               
                  if(parent_id != 'teacher_id'){
                    parent_id = 'teacher_id';
                    parent_id_val = a[i].teacher_id;
                  }
                  current = new DepartmentsCollection();
                  breadcrumbsFetch(parent_id, parent_id_val);

                  $('.breadcrumb a').find('.department').parent().nextAll().remove();

                  cssClass = "teacher";
                  getInfo(a[i].name, null, a[i].id, cssClass);
                
                } else if(a[i].department_id){
                  
                  if(parent_id != 'department_id'){
                    parent_id = 'department_id';
                    parent_id_val = a[i].department_id;
                  }
                  current = new DepartmentsCollection();
                  breadcrumbsFetch(parent_id, parent_id_val);
                  cssClass = "group";
                  getInfo(a[i].name, null, a[i].id, cssClass);

                } else if(a[i].faculty_id){
                  
                  if(parent_id != 'faculty_id'){
                    parent_id = 'faculty_id';
                    parent_id_val = a[i].faculty_id;
                  }
                  current = new FacultiesCollection();
                  breadcrumbsFetch(parent_id, parent_id_val);
                  cssClass = "department";
                  getInfo(a[i].name, null, a[i].id, cssClass);

                }

                if(a[i].img){
                  cssClass = "faculty";
                  getInfo(a[i].name, null, a[i].id, cssClass);

                  $('.breadcrumb a').find('.department').parent().prevAll().remove();
                }
            }
          }
        });
      }
      //push information in array to render  
      function getInfo(name, last_name, id, cssClass){
        var arr = [];
        if(last_name){
          arr.push(last_name+' '+name);
        } else if(name){
          arr.push(name);
        } else{
          return;
        }

        arr.push(id);
        arr.push(cssClass);
        breadcrumbsObj.push(arr);
        return breadcrumbsObj;
      }
      //we need to find first collection to fetch
      function breadcrumbsFind(){
        
        if(collType){
          //make first letter uppercase
          str = collType.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          });
          //if collType is Faculties it replace 'ie' for 'y' - Faculty
          str = str.replace(/y$/, "ie");
          var collectionName = str+"sCollection";  
          //dinamicaly make instanse of collection 
          eval('current = new ' + collectionName + '()');

          firstBreadcrumbsFetch();

        } else{
          return;
        }
      }
        //if router is not present in list bellow we have to remove breadcrubs 
        if( 
            collType == 'faculty' || 
            collType == 'department' || 
            collType == 'course' ||
            collType == 'group' ||
            collType == 'teacher' ||
            collType == 'student' ||
            collType == 'work' ||
            collType == 'task'
          ){
            breadcrumbsFind();
            breadcrumbsShow();
          } else{
            $('.breadcrumb li').remove();
          }
      //breadcrumb's factory
      function breadcrumbsShow(){
        //replace first and last array element and remove the last
        breadcrumbsObj[breadcrumbsObj.length-1] = breadcrumbsObj[0];
        breadcrumbsObj.shift();

        for(var i in breadcrumbsObj){
          if(breadcrumbsObj[i][2] == "teacher"){
            $('.breadcrumb').find('li a.department').parent().nextAll().remove();
          }else if(breadcrumbsObj[i][2] == "task"){
            $('.breadcrumb').find('li a.teacher').parent().remove();
          }else if(breadcrumbsObj[i][2] == "course"){
            $('.breadcrumb').find('li a.faculty').parent().nextAll().remove();
          }else if(breadcrumbsObj[i][2] == "department"){
            $('.breadcrumb').find('li a.course').parent().remove();
          }
          var a = '#/'+breadcrumbsObj[i][2]+"/"+breadcrumbsObj[i][1];
          var c = $('<li></li>');
          var b = $('<a></a>').html(breadcrumbsObj[i][0])
                    .attr('href', a)
                    .addClass(breadcrumbsObj[i][2]);
                    

            $('.breadcrumb').find('.'+breadcrumbsObj[i][2])
                      .html(breadcrumbsObj[i][0]).attr('id', a);

            var divider = $('<span>/</span>').addClass('divider');
            c.append(b).css('display', 'none');
            c.append(divider)

            $('.breadcrumb').append(c);
            $('.breadcrumb li').fadeIn(1000);
            $('.breadcrumb li').last().addClass('active');

        }

        $('.breadcrumb').append(c);
        $('.breadcrumb li').fadeIn(1000);

          checkBreadcrumbs();

        $('.breadcrumb li span').css('display', 'inline');
        $('.breadcrumb li:last-child span').css('display', 'none');
        if($('.breadcrumb li').length == 1){
           $('.breadcrumb li span').hide();
        }

        $('.breadcrumb').find('.'+collType).parent().nextAll('li').remove();

        $('header').find('button#main-header-button').on('click', function(){
          $('.breadcrumb li').remove();
          location.href = "#/";
        });
        $('.breadcrumb a').on('click', function(){
            $(this).parent().nextAll('li').remove();
        });
      }
      //if there is breadcrumb's element with the same class it will remove new element
      function checkBreadcrumbs(){
        $('.breadcrumb a').each(function() {
          var txt = $(this).attr('class');
          if (seen[txt])
            $(this).parent().remove();
            
          else
            seen[txt] = true;
        });
      }  
     }
  });
  return BreadcrumbsView;
});