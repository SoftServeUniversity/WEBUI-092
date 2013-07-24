      //registration form script

      $(function () { 
        $("input[type=text], input[type=password]").jqBootstrapValidation(); 
        
        $('#launch-btn').click(function(){
            console.log('Log In');
          $('#launch').slideDown(300);
        });

        $('#close-btn, #exit-btn').click(function(){
          $('#launch').slideUp(100);
        });
        
        $('#openModal').click(function(){
          $('#regMod').slideDown(300);
        });

        $('#closeRegForm').click(function(){
          $('#regMod').slideUp(300);
        });

      $(".roleStudent").hide();
      $(".roleTeacher").hide();


      $('#role').change(function(){
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

//registration form script end