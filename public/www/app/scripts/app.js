// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'views/layouts/default',
  'router', 
  'views/HeaderView', 
  'util/cookie', 
  'util/queryParse', 
  'marionette'
], function($, _, Backbone, DefaultLayout, Router, HeaderView, Cookie, queryParse, Marionette){

  var App = window.App = new Marionette.Application();

  var Router = App.router = new Router();

  App.addInitializer(function(options){
    if (options.isDev) {
      Backbone.history.start({pushState: true});
    }
    else {
      Backbone.history.start({pushState: true, root: '/www/app/'});
    }
   
    if (window.location.search) {
      setCookies();
      Backbone.history.navigate("home", {trigger:true});
    }
  });

  App.addInitializer(function(options){
    var headerView = new HeaderView();
    App.headerRegion.show(headerView);
  });

  App.addInitializer(function(options){
    $(document.body).on('click', '.js-load-route', function(e){
      var $target = $(e.target);
      console.log("navigating to ", $target.attr("href"));
      e.preventDefault();
      App.router.navigate($target.attr("href"), {trigger:true});
    });
  });

  App.addRegions({
    mainRegion: "#page",
    headerRegion: "#header"
  });

  App.vent.on('back', function(){
    var controller = App.router.controller;
    controller[controller.lastHandler].apply(controller, controller.lastArguments)
  });

  App.on("initialize:before", function(options){
        App.baseUrl = options.baseUrl;
        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
          options.xhrFields = {
            withCredentials: true
          };
        });
  });

  function setCookies(){
    if (window.location.search){
       var query = queryParse(window.location.search);
       _.each(query, function(value, key){
          Cookie.create(key, value);
       });
    }
  }

  return App;
});
