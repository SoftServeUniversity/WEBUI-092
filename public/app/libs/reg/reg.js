      //registration form script

      $(function () { 

                  $(".tip").tooltip();

        $("input[type=text], input[type=password]").jqBootstrapValidation(); 
        
        $('#launch-btn').click(function(e){
          e.preventDefault();
          console.log('Log In');
          $(this).hide();
          $('#launch').slideDown(300);

        });

        $('#close-btn, #exit-btn').click(function(){
          $('#launch').slideUp(100);
          $('#launch-btn').show();
        });
        
        $('#openModal').click(function(){
          $('#regMod').slideDown(300);
          $('#example').tooltip('show');
        });

        $('#closeRegForm').click(function(){
          $('#regMod').slideUp(300);
          $('#example').tooltip('hide');
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