define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/location',
  'js/collections/bases'
  ], function(_, Backbone, Store, Location, BasesCollection){



	var LocationsCollection = BasesCollection.extend({
    // Reference to this collection's model.
      ITEM_LIST : [
          {content:"Office",enabled:true},
          {content:"Desktop",enabled:true},
          {content:"Wifi",enabled:true}
        ],

    model: Location,

    // Save all of the Location items under the `"Locations"` namespace.
    localStorage: new Store('Locations')

  });
  return new LocationsCollection();
});
