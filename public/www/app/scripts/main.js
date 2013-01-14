// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  baseUrl: 'scripts', 
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    "backbone-touch": 'libs/backbone/backbone.touch',
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
  var isDev = window.location.href.indexOf('localhost') > -1;
  var options = {
    oauthToken:'',
    username:'', 
    mode:isDev ? "DEV" : "PROD",
    isDev:isDev,
    baseUrl:isDev ? "http://localhost:3000" : "http://www.leavekudos.com"
  };

  App.start(options);
});
