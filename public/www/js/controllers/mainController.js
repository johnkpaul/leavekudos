// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'collections/kudos/KudosCollection',
  'collections/CheckinCollection',
], function($, _, Backbone, HomeView, KudosCollection, CheckinCollection) {
  
  var mainController = {
    loadCheckins:function(){
      var checkinCollection = new CheckinCollection();
      checkinCollection.fetch().then(function(){
        var checkinView = new HomeView({collection:checkinCollection});
        checkinView.render();
      });
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

