// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    editinplace: 'libs/jquery/edit-in-place',
    jquery: 'libs/jquery/jquery-min',
    jqueryui: 'libs/jquery-ui/jquery-ui',
    underscore: 'libs/underscore/underscore-min',
    jqBootstrapValidation: 'libs/jqBootstrapValidation/jqBootstrapValidation',
    bootstrap: 'libs/bootstrap/bootstrap',
    backbone: 'libs/backbone/backbone-min',
    reg: 'libs/reg/reg',
    highcharts: 'libs/highcharts/highcharts',
    templates: '../templates'
  }

});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});
