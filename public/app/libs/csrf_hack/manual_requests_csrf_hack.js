//sends authentication token with POST PUT DELETE requires. Add $(document).trigger('csrfToken'); before sending manual $.post $.delete $.put requests
$(document).bind('csrfToken', function(){
  $.ajaxSetup({
    headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });
});