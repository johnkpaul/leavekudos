define([
  'jquery',
  'underscore',
  'backbone',
  'models/kudos',
  'tpl!templates/rootView.html',
], function($, _, Backbone, KudosModel, rootViewTemplate){
  var RootView = Backbone.Marionette.ItemView.extend({
    template: rootViewTemplate,
    events: {
        //"click .js-submit-kudos": "submitKudos"
    },
    initialize:function(){
    }
  });

  return RootView;
  
});



