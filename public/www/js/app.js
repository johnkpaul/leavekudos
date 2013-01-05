// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'views/layouts/default',
  'router', // Request router.js
  'marionette'
], function($, _, Backbone, DefaultLayout, Router){

  var App = window.App = new Marionette.Application();

  var Router = App.router = new Router();
  App.addInitializer(function(options){
    Backbone.history.start();
  });

  App.addRegions({
    mainRegion: "#page"
  });

  return App;

});
