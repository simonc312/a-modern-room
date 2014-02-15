define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/action'
  ], function(_, Backbone, Store, Action){

	var ActionsCollection = Backbone.Collection.extend({
    model: Action,

    // Save all of the Action items under the `"Actions"` namespace.
    localStorage: new Store('actions'),

    // Filter down the list of all Action items that are not unlocked.
    disabled: function() {
      return this.filter(function(Action){ return !Action.get('enabled'); });
    },

    // Filter down the list to only Action items that are enabled.
    enabled: function() {
      return this.without.apply(this, this.enabled());
    },

    //Filter down the list to only Action items that have different location matching current location selected
    notLocation: function(location) {
      return this.filter(function(Action){Action.get('location') != location});
    },

    location: function(location) {
      return this.filter(function(Action){Action.get('location') = location});
    },

    setEnabled: function(location){
      this.each(function(Action){
        if(Action.get("location") == location){Action.set("enabled",true);}
        else {Action.set("enabled", false)};
      });
      return false;
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
    },

    reload: function(){
if(this.length == 0){
    this.create({id: 1, timeOutDuration: 1000, content: "Charge computer", order:this.nextOrder(), enabled: true, cost: {"Patience": 2}, location: "Localhost", prodResource: {"Battery Life": 5}});

     this.create({id:2, timeOutDuration: 200, content: "Check facebook", order:this.nextOrder(), enabled: false, cost: {"Battery Life":5, "Patience":2}, location: "Wifi", prodResource: {"Friends":1.5}});

     this.create({id: 3, timeOutDuration: 100, content: "Watch Videos", order:this.nextOrder(), enabled: true, cost: {"Battery Life":2,"Patience": 2}, location: "Wifi", prodResource: {"Left Arm Strength": 2}});

     this.create({id: 4, timeOutDuration: 100, content: "Play Minesweeper", order:this.nextOrder(), enabled: true, cost: {"Battery Life": 1}, location: "Localhost", prodResource: {"Patience": 5}});
    }
    }

  });
  return new ActionsCollection();
});
