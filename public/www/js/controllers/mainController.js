// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/CheckinCollectionView',
  'views/LeaveKudosView',
  'views/LastKudosView',
  'collections/kudos/KudosCollection',
  'collections/CheckinCollection',
  'collections/EmployeeCollection',
], function($, _, Backbone, HomeView, CheckinCollectonView, SelectEmployeeView, LastKudosView, KudosCollection, 
                 CheckinCollection, EmployeeCollection) {
  
  var mainController = {

    leaveKudosFor:function(checkinModel){
      var employeesCollection = new EmployeeCollection([], {venueId:checkinModel.get('venue').id});
      employeesCollection.fetch().then(function(){
        var selectEmployeeView = new SelectEmployeeView({model:checkinModel, collection:employeesCollection});
        require("app").mainRegion.show(selectEmployeeView);
        require("app").headerRegion.currentView.showBack();
      });
    },

    loadLastPage:function(kudosModel){
      var lastKudosView = new LastKudosView({model:kudosModel});
      require("app").mainRegion.show(lastKudosView);
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
          mainController.lastArguments = sliced;
          return func.apply(this, sliced);
        });
        return controller[key] = wrapped;
    }); 
  return mainController;
});

