// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/CheckinView',
  'collections/kudos/KudosCollection',
  'collections/CheckinCollection',
], function($, _, Backbone, HomeView, CheckinView, KudosCollection, CheckinCollection) {
  
  var mainController = {
    loadCheckins:function(){
      var checkinCollection = new CheckinCollection();
      checkinCollection.fetch().then(function(){
        var checkinView = new CheckinView({collection:checkinCollection});
        require("app").mainRegion.show(checkinView);
      });
    },
    loadHome:function(){
      var kudosCollection = new KudosCollection();
      kudosCollection.fetch().then(function(){
        var homeView = new HomeView({collection:kudosCollection});
        require("app").mainRegion.show(homeView);
      });
    }
  }

  return mainController;
});

