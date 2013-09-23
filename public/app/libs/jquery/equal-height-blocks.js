define([
    'underscore',
    'backbone'
], function(_, Backbone) {
  
  var heightEqualizer = {

    resizeEqual: function(){
  	  //reset position to relative, so we get correct height for containing element
      $('.progress-small').css('position','relative');

  	  var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
     
      $('.equal-height>div>*').each(function() {
     
        $el = $(this);
        $el.css('height', '');

        topPostion = $el.position().top;
       
        if (currentRowStart != topPostion) {

          // we just came to a new row.  Set all the heights on the completed row
          for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
          }

          // set the variables for the new row
          rowDivs.length = 0; // empty the array
          currentRowStart = topPostion;
          currentTallest = $el.height();
          rowDivs.push($el);

        } else {

          // another div on the current row.  Add it to the list and check if it's taller
          rowDivs.push($el);
          currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        } 
       
        // do the last row
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
     
      })
    
      //reset position back to absolute, so element is positioned correctly;
      $('.progress-small').css('position','absolute');
    },

    clearResize: function(){
    	$('.equal-height>div>*').each(function() {
    		$(this).height('');
    	})
    }

  }

  $(window).on('resize', function(){
    heightEqualizer.resizeEqual();
  })

  return heightEqualizer;

})


