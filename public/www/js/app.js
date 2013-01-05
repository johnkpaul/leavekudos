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

  App.addInitializer(function(options){
    $(document.body).on('click', 'a.js-load-route', function(e){
      var $target = $(e.target);
      console.log("navigating to ", $target.attr("href"));
      e.preventDefault();
      App.router.navigate($target.attr("href"), {trigger:true});
    });
  });

  App.addRegions({
    mainRegion: "#page"
  });

  return App;

});
