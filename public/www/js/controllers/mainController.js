// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
], function($, _, Backbone, HomeView) {
  
  var mainController = {
    loadTest:function(){
      alert("TEST!!!");
    },
    loadHome:function(){
      var homeView = new HomeView();
      homeView.render();
    }
  }

  return mainController;
});

