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
        "": "loadRoot",
        "home": "loadHome",
        "checkins": "loadCheckins"
      }
    });

    return MyRouter;
   
});
