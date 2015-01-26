define([
  'underscore', 
  'backbone', 
  'storage', 
  'js/models/action',
  'js/collections/bases'
  ], function(_, Backbone, Store, Action, BasesCollection){

	var ActionsCollection = BasesCollection.extend({
    ITEM_LIST: [

    //STAGE ZERO ACTIONS
      {timeOutDuration: 50, content: "Charge computer", enabled: true, cost: {"Patience": 2}, location: "Office", prodResource: {"Battery Life": 5}},
      {timeOutDuration: 50, content: "Read Command Line Manual", enabled: true, cost: {"Battery Life": 1}, location: "Office", prodResource: {"Patience": 5}},
      
    //STAGE ONE ACTIONS
      {timeOutDuration: 200, content: "Empty Recycle Bin", enabled: false, cost: {"Battery Life":1, "Patience":1}, location: "Desktop", prodResource: {"Free Disk Space":1.5}},
      {timeOutDuration: 100, content: "Draw in MS Paint", enabled: false, cost: {"Battery Life":1,"Patience": 1}, location: "Desktop", prodResource: {"Creativity": 2}},
      {timeOutDuration: 100, content: "Play Minesweeper", enabled: false, cost: {"Battery Life":1}, location: "Desktop", prodResource: {"Intuition": 2}},
    //STAGE TWO ACTIONS

      {timeOutDuration: 200, content: "Check facebook", enabled: false, cost: {"Battery Life":5, "Patience":2}, location: "Wifi", prodResource: {"Friends":1,"Likes":8}},
      {timeOutDuration: 300, content: "Watch Netflix", enabled: false, cost: {"Battery Life":2,"Patience": 3}, location: "Wifi", prodResource: {"Movie Trivia Knowledge": 2}},
      {timeOutDuration: 400, content: "Play League of Legends", enabled: false, cost: {"Battery Life": 4, "Patience": 4}, location: "Wifi", prodResource: {"Mouse Click Speed": 5}}
        ],
    model: Action,

    // Save all of the Action items under the `"Actions"` namespace.
    localStorage: new Store('actions'),

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
    }

  });
  return new ActionsCollection();
});
