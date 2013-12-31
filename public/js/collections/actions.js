define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/action'
  ], function(_, Backbone, Store, Action){

	var ActionsCollection = Backbone.Collection.extend({
    model: Action,

    // Save all of the Action items under the `"Actions"` namespace.
    localStorage: new Store('Actions'),

    // Filter down the list of all Action items that are not unlocked.
    disabled: function() {
      return this.filter(function(Action){ return !Action.get('enabled'); });
    },

    // Filter down the list to only Action items that are enabled.
    enabled: function() {
      return this.without.apply(this, this.enabled());
    },

    // We keep the Actions in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Actions are sorted by their original insertion order.
    comparator: function(Action) {
      return Action.get('order');
    }

  });
  return new ActionsCollection();
});