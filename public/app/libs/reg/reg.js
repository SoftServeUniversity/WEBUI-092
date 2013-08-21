//registration form script

$(function () { 
  //session
  $(".tip").tooltip();
  $("input[type=text], input[type=password]").jqBootstrapValidation(); 
  // #launch-btn is a dinamic element, that because we need to delegate it functionality
  $("#authBox").delegate('#launch-btn','click', function(e){
    e.preventDefault();
    console.log('Log In');
    $(this).hide();
    $('#launch').slideDown(300);

  });
  $('#close-btn, #exit-btn').click(function(){
    $('#launch').slideUp(100);
    $('#launch-btn').show();
  });
  
  //registration
  $('#openModal').click(function(){
    $('#regMod').slideDown(300);
    $('#example').tooltip('show');
  });

  $('#sign-up-louncher').click(function(){
    $('#launch').slideUp(100);
  });

  $('#closeRegForm').click(function(){
    $('#regMod').slideUp(300);
    $('#example').tooltip('hide');
  });


  $('#content').delegate('#role', 'change', function(e){
    if($(this).val() == 'Student'){
      $('.roleStudent').show();
      $('.roleTeacher').hide();
    }else if($(this).val() == 'Teacher'){
      $('.roleTeacher').show();
      $('.roleStudent').hide();
    }else if($(this).val() == 'User'){
      $('.roleTeacher').hide();
      $('.roleStudent').hide();
    }
  });
  
});

// error type
function alertType(data){
  var res;
  for (first in data){ 
    res = first;
    break;
  } 
  return res
}

// to serialize to json with mested attributes
jQuery.fn.MytoJson = function(options) {

  options = jQuery.extend({}, options);

  var self = this,
      json = {},
      push_counters = {},
      patterns = {
        "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
        "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
        "push":     /^$/,
        "fixed":    /^\d+$/,
        "named":    /^[a-zA-Z0-9_]+$/
      };

  this.build = function(base, key, value){
    base[key] = value;
    return base;
  };

  this.push_counter = function(key){
    if(push_counters[key] === undefined){
        push_counters[key] = 0;
    }
    return push_counters[key]++;
  };

  jQuery.each(jQuery(this).serializeArray(), function(){

    // skip invalid keys
    if(!patterns.validate.test(this.name)){
        return;
    }

    var k,
        keys = this.name.match(patterns.key),
        merge = this.value,
        reverse_key = this.name;

    while((k = keys.pop()) !== undefined){

      // adjust reverse_key
      reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

      // push
      if(k.match(patterns.push)){
          merge = self.build([], self.push_counter(reverse_key), merge);
      }

      // fixed
      else if(k.match(patterns.fixed)){
          merge = self.build([], k, merge);
      }

      // named
      else if(k.match(patterns.named)){
          merge = self.build({}, k, merge);
      }
    }
    json = jQuery.extend(true, json, merge);
  });
  return json;
}

//registration form script end