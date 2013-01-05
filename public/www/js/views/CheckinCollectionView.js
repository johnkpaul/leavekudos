define([
  'jquery',
  'underscore',
  'backbone',
  'views/CheckinView',
  'tpl!templates/checkinCollectionView.html',
], function($, _, Backbone, CheckinView, checkinCollectionView){
  var CheckinCollectionView = Backbone.Marionette.CompositeView.extend({
    template: checkinCollectionView,
    itemView: CheckinView,
    onRender: function(){}
  });

  return CheckinCollectionView;
  
});
