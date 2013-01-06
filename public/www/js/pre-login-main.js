// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  baseUrl: 'www/js', 
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    "backbone-touch": 'libs/backbone/backbone.touch',
    marionette: 'libs/backbone/backbone.marionette',
    templates: '../templates'
  }, 
  shim: {
    marionette : {
      deps : ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette'
    }
  }

});

require([
  'collections/kudos/KudosCollection',
  'views/KudosView'
], function(KudosCollection, KudosView){
      var kudosCollection = new KudosCollection();
      kudosCollection.fetch().then(function(){
        var kudosView = new KudosView({collection:kudosCollection});
        $("#splash").empty().html(kudosView.render().$el)
        $("#leave-kudos").hide();
      });
});

