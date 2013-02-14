Backbone.Marionette.CollectionView.prototype.addChildView = function(item, collection, options) {
  var filter = this.options.filter || this.filter;
  if (filter && !filter(item)) return;
  this.closeEmptyView();
  var ItemView = this.getItemView();
  return this.addItemView(item, ItemView, options.index);
};
 
Backbone.Marionette.CollectionView.prototype.showCollection = function() {
  var filter = this.options.filter || this.filter;
  var that = this;
  var ItemView = this.getItemView();
  this.collection.each(function(item, index){
	if (filter && ! filter(item)) return;
	that.addItemView(item, ItemView, index);
  });
};
