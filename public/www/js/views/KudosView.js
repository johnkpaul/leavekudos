define([
  'jquery',
  'underscore',
  'backbone',
  'views/kudo',
  'tpl!templates/kudosView.html',
], function($, _, Backbone, KudoView, kudosTemplate){
  var KudosView = Backbone.Marionette.CompositeView.extend({
    itemView:KudoView, 
    template: kudosTemplate,
    appendHtml: function(collectionView, itemView){
      collectionView.$("#kudos-list").append(itemView.el);
    }
  });

  return KudosView;
  
});
