// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'controllers/mainController',
], function($, _, Backbone, mainController) {
  
    var MyRouter = Backbone.Marionette.AppRouter.extend({
      controller: mainController,
      appRoutes: {
        "": "loadHome",
        "checkins": "loadCheckins",
        "venues/:venue_id": "loadVenue"
      }
    });

    return MyRouter;
   
});
