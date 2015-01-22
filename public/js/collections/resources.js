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

    findByContent: function(content){ 
      this.find(function(resource) { 
        return resource.get('content') == content; 
      });
    },

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
    },

    reload: function(){
    if(this.length == 0){
     this.create({content: "Battery Life", ResourceDescription: "Number of hours before laptop dies", amount: 10, order: this.nextOrder(), enabled: true});
     this.create({content: "Patience", ResourceDescription: "Number of minutes before you destroy laptop", amount: 10, order: this.nextOrder(), enabled: true});
    }

    }

  });
  return new ResourcesCollection();
});
