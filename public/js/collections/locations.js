define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/location'
  ], function(_, Backbone, Store, Location){

  var LOCATION_LIST = [
    {name:"Office",enabled:true},
    {name:"Desktop",enabled:true},
    {name:"Wifi",enabled:true},
    {name:"Apps",enabled:true}
    ];

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
        var self = this;
        $.each(LOCATION_LIST,function(index, location){
          self.create({id: index, content: location.name, order: self.nextOrder(),
           enabled: location.enabled});
        });
      }
    }

  });
  return new LocationsCollection();
});
