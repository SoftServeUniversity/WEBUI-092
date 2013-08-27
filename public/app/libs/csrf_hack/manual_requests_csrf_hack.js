//sends authentication token with POST PUT DELETE requires. Add $(document).trigger('csrfToken'); before sending manual $.post $.delete $.put requests
$(document).bind('csrfToken', function(){
  var csrf_token;
  csrf_token = $('meta[name="csrf-token"]').attr('content');
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (settings.type === 'GET') {
        return;
      }
      if (csrf_token) {
        xhr.setRequestHeader('X-CSRF-Token', csrf_token);
        console.log("is not GET " + csrf_token);
      }
    }
  });
});