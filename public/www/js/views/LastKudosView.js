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
    submitKudos:function(){
      console.log(this.kudos);
      console.log("submitting kudos");
    },
    initialize:function(){
      this.kudos = this.model
    }
  });

  return LastKudosView;
  
});


