define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'views/kudo',
  'tpl!templates/kudosView.html'
], function($, _, Backbone, Marionette, KudoView, kudosTemplate){
  var KudosView = Marionette.CompositeView.extend({
    itemView:KudoView, 
    template: kudosTemplate,
    appendHtml: function(collectionView, itemView){
      collectionView.$("#kudos").append(itemView.el);
    }
  });

  return KudosView;
  
});
