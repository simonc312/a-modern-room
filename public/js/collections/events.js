define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/event'
  ], function(_, Backbone, Store, Event){

	var EventsCollection = Backbone.Collection.extend({
    model: Event,

    // Save all of the Event items under the `"Events"` namespace.
    localStorage: new Store('Events'),

    // Filter down the list of all Event items that are not unlocked.
    disabled: function() {
      return this.filter(function(Event){ return !Event.get('enabled'); });
    },

    // Filter down the list to only Event items that are enabled.
    enabled: function() {
      return this.without.apply(this, this.enabled());
    },

    // We keep the Events in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Events are sorted by their original insertion order.
    comparator: function(Event) {
      return Event.get('order');
    }

  });
  return new EventsCollection();
});