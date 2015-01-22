define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/event'
  ], function(_, Backbone, Store, Event){

	var EventsCollection = Backbone.Collection.extend({
    model: Event,

    // Save all of the Event items under the `"Events"` namespace.
    localStorage: new Store('events'),

    // Filter down the list of all Event items that are not unlocked.
    disabled: function() {
      return this.filter(function(Event){ return !Event.get('enabled'); });
    },

    // Filter down the list to only Event items that are enabled.
    enabled: function() {
      return this.without.apply(this, this.enabled());
    },

    // We keep the Events in reverse order, despite being saved unordered
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Events are sorted by newest insertion order.
    comparator: function(Event) {
      return Event.get('order');
    },

    reload: function(){
      if(this.length == 0){
        this.create({content: "Welcome back."})
      }
    }

  });
  return new EventsCollection();
});
