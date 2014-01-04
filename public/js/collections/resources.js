define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/resource'
  ], function(_, Backbone, Store, Resource){

	var ResourcesCollection = Backbone.Collection.extend({
    model: Resource,

    // Save all of the Resource items under the `"Resources"` namespace.
    localStorage: new Store('Resources'),

    // Filter down the list of all Resource items that are not unlocked.
    disabled: function() {
      return this.filter(function(Resource){ return !Resource.get('enabled'); });
    },

    // Filter down the list to only Resource items that are enabled.
    enabled: function() {
      return this.without.apply(this, this.enabled());
    },

    // We keep the Resources in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Resources are sorted by their original insertion order.
    comparator: function(Resource) {
      return Resource.get('order');
    }

  });
  return new ResourcesCollection();
});