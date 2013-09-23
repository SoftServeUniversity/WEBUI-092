//registration form script

$(function () {
  //session
  $('#launch-btn').show();
  $(".tip").tooltip();
  $("input[type=text], textarea, input[type=password]").jqBootstrapValidation();
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
  });

  $('#sign-up-louncher').click(function(){
    $('#launch').slideUp(100);
  });

  $('#closeRegForm').click(function(){
    $('#regMod').slideUp(300);
  });

});

// error type for error monice bootstrap view
function alertType(data){
  var res;
  for (first in data){
    res = first;
    break;
  }
  return res
}

//check if object is json
function isJSON(data) {
    var isJson = false
    try {
        // this works with JSON string and JSON object, not sure about others
       var json = $.parseJSON(data);
       isJson = typeof json === 'object' ;
    } catch (ex) {
        console.error('data is not JSON');
    }
    return isJson;
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




// Zdyrko registration stuff
      
      appUtils = {};
      appUtils.Users = {};
      
      appUtils.Users.checkRole = function(role){
        
        var notRegistered = 'Для доступу до цієї сторінки необхідно бути зареєстрованим і мати роль ';
        var textRolePending = 'Ваш акаунт ще не підтверджений адміністратором';
        var textBadRole = 'Роль вашого користувача не надає доступу до цієї сторінки. Зареєструйте користувача з роллю '

        if(GlobalUser.currentUser != undefined){

          if(GlobalUser.currentUser.role == role){
            if(GlobalUser.currentUser.attributes.role_pending){
              return { status: true, verified: false,  text: textRolePending };
            } else {
              return { status : true, verified: true }
            }
          } else { 
            return { status: false, text: textBadRole + role }
          }

        } else {
          return { status: false, text: notRegistered + role }
        }

      }

      appUtils.Users.showWarning = function(warning, role){

        app_router.previousRoute();
        $('#content #top-warning').remove();
        $('#content').prepend($('<div id="top-warning" class="alert alert-error"><a class="close" data-dismiss="alert" href="#">×</a><span class="message">'+warning+'</span></div>'))
        $('#top-warning').delay(3000).fadeOut('slow');
      
      }

      appUtils.Users.showAdminButton = function(tagid, link, text){
        var el = '<li style="display:none" id="link_admin"><a class="page-link" id="'+tagid+'page-link" href="'+link+'">'+text+'</a></li>';
        $('#main-top-menu').append($(el));
        $('#link_admin').fadeIn();
      }
      
      appUtils.Users.hideAdminButton = function(){
        $("#link_admin").remove();
      }

      appUtils.Users.adminRoleCheck = function(){
        
        var adminCheck = this.checkRole('admin');
        if (adminCheck.status && adminCheck.verified){
          this.showAdminButton('admin', '#/admin', 'Сторінка адміністратора')
        } 
        var faCheck = this.checkRole('faculty_admin')
        if(faCheck.status && faCheck.verified){
          this.showAdminButton('fa','#/fa', 'Адміністрування факультету')
        }
      };

// Zdyrko registration stuff end
