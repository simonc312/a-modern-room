define([
  'underscore', 
  'backbone'
  ], function(_, Backbone){

	var BasesCollection = Backbone.Collection.extend({

    // Filter down the list of all Action items that are not unlocked.
    disabled: function() {
      return this.filter(function(model){ return !model.get('enabled'); });
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
    comparator: function(model) {
      return model.get('order');
    },

    reload: function(){
      if(this.length == 0){

        var self = this;
        $.each(self.ITEM_LIST,function(index, item){
          item.id = index;
          item.order = self.nextOrder();
          self.create(item);
        });
      }
    }

  });
  return BasesCollection;
});
