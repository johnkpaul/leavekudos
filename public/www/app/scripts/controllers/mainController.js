define([
  'underscore',
  'backbone',
  'views/KudosView',
  'views/CheckinCollectionView',
  'views/LeaveKudosView',
  'views/LastKudosView',
  'views/VenueView',
  'collections/kudos/KudosCollection',
  'collections/CheckinCollection',
  'collections/EmployeeCollection',
  'models/venue'
], function(_, Backbone, KudosView, CheckinCollectonView, SelectEmployeeView, LastKudosView, VenueView, KudosCollection, 
                 CheckinCollection, EmployeeCollection, Venue) {
  
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

    loadVenue:function(venueId){
      var venue = new Venue({id:venueId});
      venue.fetch().then(function(){
        var venueView = new VenueView({model:venue});
        require("app").mainRegion.show(venueView);
      });
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
        var kudosView = new KudosView({collection:kudosCollection});
        require("app").mainRegion.show(kudosView);
        require("app").headerRegion.currentView.hideBack()
      });
    }
  }
  _.each(mainController, function(value, key, controller) {
      var wrapped = _.wrap(value, function(func) {
          var sliced = Array.prototype.slice.call(arguments, 1)
          mainController.lastHandler = mainController.currentHandler;
          mainController.lastArguments = mainController.currentArguments;
          mainController.currentHandler = key;
          mainController.currentArguments = sliced;
          return func.apply(this, sliced);
        });
        return controller[key] = wrapped;
    }); 
  return mainController;
});

