// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/CheckinCollectionView',
  'collections/kudos/KudosCollection',
  'collections/CheckinCollection',
], function($, _, Backbone, HomeView, CheckinCollectonView, KudosCollection, CheckinCollection) {
  
  var mainController = {
    loadCheckins:function(){
      var checkinCollection = new CheckinCollection();
      checkinCollection.fetch().then(function(){
        var checkinCollectionView = new CheckinCollectonView({collection:checkinCollection});
        require("app").mainRegion.show(checkinCollectionView);
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

