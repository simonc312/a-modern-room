define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/location'
  ], function(_, Backbone, Store, Location){

	var LocationsCollection = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: Location,

    // Save all of the Location items under the `"Locations"` namespace.
    localStorage: new Store('Locations'),

    // Filter down the list of all Location items that are not unlocked.
    disabled: function() {
      return this.filter(function(Location){ return !Location.get('enabled'); });
    },

    // Filter down the list to only Location items that are enabled.
    enabled: function() {
      return this.without.apply(this, this.enabled());
    },

    // We keep the Locations in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    // Locations are sorted by their original insertion order.
    comparator: function(Location) {
      return Location.get('order');
    },

    reload: function(){
       if(this.length == 0){
        this.create({id: 1, content: "Localhost", order: this.nextOrder(), enabled: true});

        this.create({id: 2, content: "Wifi", order: this.nextOrder(), enabled: true});
}
    }

  });
  return new LocationsCollection();
});
