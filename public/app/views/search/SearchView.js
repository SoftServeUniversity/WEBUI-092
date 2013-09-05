define([

  'jquery',
  'underscore',
  'backbone',
  'collections/teachers/TeachersCollection',
  'collections/students/StudentsCollection',
  'text!templates/search/searchTemplate.html'

], function ($, _, Backbone, TeachersCollection, StudentsCollection, searchTemplate){

  var SearchView =  Backbone.View.extend({
    initialize:function(){
              $('#ui-id-1 a').on('click', function(){
                $(this).fadeIn('fast');
              });
    
      var templ = _.template(searchTemplate);
      $('li#search').html(templ);

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

              $( "#search-field" ).val( ui.item.last_name + " "+ui.item.label );

              return false;
            },
            select: function( event, ui ) {
              $( "#search-field" ).val( ui.item.label );
              
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
                var status = 'cтуд.';
                var href = '#/student/'+item.id;
              }else{
                var href = '#/teacher/'+item.id;
                var status = 'викл.';
              }
            var a = $('<a>' + item.last_name +" "+item.label+" "+status+'</a>').attr('href', href);
            return $( "<li>" )
            .append(a)
            .appendTo( ul );

          };
     }
  });
  return SearchView;
});