define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/action'
  ], function(_, Backbone, Store, Action){


  var ACTION_LIST = [

  //STAGE ZERO ACTIONS
    {duration: 400, content: "Charge computer", enabled: true, cost: {"Patience": 2}, location: "Office", resource: {"Battery Life": 5}},
   
  //STAGE ONE ACTIONS
    {duration: 200, content: "Empty Recycle Bin", enabled: false, cost: {"Battery Life":1, "Patience":1}, location: "Desktop", resource: {"Free Disk Space":1.5}},
    {duration: 100, content: "Draw in MS Paint", enabled: false, cost: {"Battery Life":1,"Patience": 1}, location: "Desktop", resource: {"Creativity": 2}},
    {duration: 100, content: "Play Minesweeper", enabled: false, cost: {"Battery Life":1}, location: "Desktop", resource: {"Patience": 2}},
  //STAGE TWO ACTIONS

    {duration: 200, content: "Check facebook", enabled: false, cost: {"Battery Life":5, "Patience":2}, location: "Wifi", resource: {"Friends":1,"Likes":8}},
    {duration: 400, content: "Watch Netflix", enabled: false, cost: {"Battery Life":2,"Patience": 3}, location: "Wifi", resource: {"Movie Trivia Knowledge": 2}},
    {duration: 500, content: "Play League of Legends", enabled: false, cost: {"Battery Life": 4, "Patience": 4}, location: "Apps", resource: {"Mouse Click Speed": 5}}
  ];

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
    //enable if location is right and enough resources to produce
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

        var self = this;
        $.each(ACTION_LIST,function(index, action){
          self.create({id: index, timeOutDuration: action.duration, content: action.content,
          order:self.nextOrder(), enabled: action.enabled, cost: action.cost, 
          location: action.location, prodResource: action.resource});
        });
      }
    }

  });
  return new ActionsCollection();
});
