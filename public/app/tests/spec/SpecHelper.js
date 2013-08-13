beforeEach(function() {
  this.addMatchers({
    toEqualCollection: function(expectedCollection) {
      var actualCollection = this.actual;
      if (actualCollection.length != expectedCollection.length){
        return false;
      }

      for (var i = 0; i < actualCollection.length ; i++){
        if (!_.isEqual(actualCollection.at(i).attributes,expectedCollection.at(i).attributes)){
          return false;
        }
      }
      return true;
    }
  });
});
