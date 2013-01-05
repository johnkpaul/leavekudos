// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/CheckinCollectionView',
  'views/LeaveKudosView',
  'collections/kudos/KudosCollection',
  'collections/CheckinCollection',
], function($, _, Backbone, HomeView, CheckinCollectonView, LeaveKudosView, KudosCollection, CheckinCollection) {
  
  var mainController = {

    leaveKudosFor:function(checkinModel){
      var leaveKudosView = new LeaveKudosView({model:checkinModel});
      require("app").mainRegion.show(leaveKudosView);
      require("app").headerRegion.currentView.showBack();
    },
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
          var sliced = Array.prototype.slice.call(arguments, 1)
          mainController.lastHandler = key;
          return func.apply(this, sliced);
        });
        return controller[key] = wrapped;
    }); 
  return mainController;
});

