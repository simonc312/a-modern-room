define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/resource',
  'js/collections/bases'
  ], function(_, Backbone, Store, Resource, BasesCollection){

	var ResourcesCollection = BasesCollection.extend({
    ITEM_LIST : [
      {content: "Battery Life", ResourceDescription: "Number of hours before laptop dies", amount: 10, enabled: true},
      {content: "Patience", ResourceDescription: "Number of minutes before you destroy laptop", amount: 10, enabled: true}
      ],
    model: Resource,

    // Save all of the Resource items under the `"Resources"` namespace.
    localStorage: new Store('Resources'),

    findByContent: function(content){ 
      this.find(function(resource) { 
        return resource.get('content') == content; 
      });
    },

  });
  return new ResourcesCollection();
});
