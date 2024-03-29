// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'views/layouts/default',
  'router', 
  'views/HeaderView', 
  'marionette'
], function($, _, Backbone, DefaultLayout, Router, HeaderView, Marionette){

  var App = window.App = new Marionette.Application();

  var Router = App.router = new Router();
  App.addInitializer(function(options){
    Backbone.history.start();
  });

  App.addInitializer(function(options){
    var headerView = new HeaderView();
    App.headerRegion.show(headerView);
    var handleResize = _.debounce(function(){
      $(document.body).height(window.innerHeight+$(window).scrollTop())
    }, 200);
    var handleScroll = _.debounce(function(){
      $(document.body).height(window.innerHeight+$(window).scrollTop())
    }, 40);
    $(window).resize(handleResize);
    $(window).scroll(handleScroll);
    handleResize();
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
  });

  return App;
});
