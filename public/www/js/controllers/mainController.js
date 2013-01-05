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
        require("app").headerRegion.currentView.showBack()
      });
    },

    loadHome:function(){
      var kudosCollection = new KudosCollection();
      kudosCollection.fetch().then(function(){
        var homeView = new HomeView({collection:kudosCollection});
        require("app").mainRegion.show(homeView);
        require("app").headerRegion.currentView.hideBack()
      });
    }
  }
  _.each(mainController, function(value, key, controller) {
      var wrapped = _.wrap(value, function(func) {
          mainController.lastHandler = key;
          return func.call(this);
        });
        return controller[key] = wrapped;
    }); 
  return mainController;
});

