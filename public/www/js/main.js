// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  baseUrl: 'www/js', 
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    marionette: 'libs/backbone/backbone.marionette',
    templates: '../templates'
  }, 
  shim: {
    marionette : {
      deps : ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette'
    }
  }

});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  var options = {
    oauthToken:'',
    username:''
  };
  App.start(options);
});
