// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'collections/kudos/KudosCollection',
], function($, _, Backbone, HomeView, KudosCollection) {
  
  var mainController = {
    loadTest:function(){
      alert("TEST!!!");
    },
    loadHome:function(){
      var kudosCollection = new KudosCollection();
      kudosCollection.fetch().then(function(){
        var homeView = new HomeView({collection:kudosCollection});
        homeView.render();
      });
    }
  }

  return mainController;
});

