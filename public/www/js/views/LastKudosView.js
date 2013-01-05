define([
  'jquery',
  'underscore',
  'backbone',
  'models/kudos',
  'tpl!templates/lastKudosView.html',
], function($, _, Backbone, KudosModel, lastKudosViewTemplate){
  var LastKudosView = Backbone.Marionette.ItemView.extend({
    template: lastKudosViewTemplate,
    events: {
        "click .js-submit-kudos": "submitKudos"
    },
    submitKudos:function(options){
      console.log("submitting kudos");
    },
    initialize:function(options){
      this.kudos = options.kudos;
    }
  });

  return LastKudosView;
  
});


