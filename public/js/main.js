// Filename: main.js

// Require.js allows us to configure mappings to paths
// as demonstrated below:
require.config({
  paths: {
    jquery: 'js/libs/jquery/jquery-min',
    underscore: 'js/libs/underscore/underscore-min',
    backbone: 'js/libs/backbone/backbone',
    // storage has built in support for requirejs
    // hence, it doesn't need to configured in 'shim'
    storage: 'js/libs/backbone/backbone.localStorage',
    text: 'js/libs/require/text',
    cprogress: 'js/libs/cprogress/cprogress',
    elementready: 'js/libs/elementready/elementready'
  },

  shim: {

    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    }
  }

});

require(['js/views/app', 'js/views/locationList', 'js/collections/todos', 'js/collections/actions', 'js/collections/locations','js/collections/resources' ], function(AppView, LocationListView, TodoCollection, ActionCollection, LocationCollection, ResourceCollection){
  var App = function(){
    this.collections.todos = TodoCollection;
    this.collections.locations = LocationCollection;
    this.collections.actions = ActionCollection;
    this.collections.resources = ResourceCollection;
    this.views.app = new AppView({collection: this.collections.todos});
    this.views.locationList = new LocationListView({collection: this.collections.locations});

    if(this.collections.locations.length == 0){
    this.collections.locations.create({id: 1, content: "Localhost", order: this.collections.locations.nextOrder(), enabled: true});

    this.collections.locations.create({id: 2, content: "Wifi", order: this.collections.locations.nextOrder(), enabled: true});
}

    if(this.collections.actions.length == 0){
    this.collections.actions.create({id: 1, timeOutDuration: 1000, content: "Charge computer", order:this.collections.actions.nextOrder(), enabled: true, cost: {"Patience": 2}, location: "Localhost", prodResource: {"Battery Life": 5}});

     this.collections.actions.create({id:2, timeOutDuration: 200, content: "Check facebook", order:this.collections.actions.nextOrder(), enabled: false, cost: {"Battery Life":5, "Patience":2}, location: "Wifi", prodResource: {"Friends":1.5}});

     this.collections.actions.create({id: 3, timeOutDuration: 100, content: "Watch Videos", order:this.collections.actions.nextOrder(), enabled: true, cost: {"Battery Life":2,"Patience": 2}, location: "Wifi", prodResource: {"Left Arm Strength": 2}});

     this.collections.actions.create({id: 4, timeOutDuration: 100, content: "Play Minesweeper", order:this.collections.actions.nextOrder(), enabled: true, cost: {"Battery Life": 1}, location: "Localhost", prodResource: {"Patience": 5}});
    }
    
    if(this.collections.resources.length == 0){
     this.collections.resources.create({content: "Battery Life", ResourceDescription: "Number of hours before laptop dies", amount: 10, order: this.collections.resources.nextOrder(), enabled: true});
     this.collections.resources.create({content: "Patience", ResourceDescription: "Number of minutes before you destroy laptop", amount: 10, order: this.collections.resources.nextOrder(), enabled: true});
    }
  };
  App.prototype = {
    views: {},
    collections: {},
    start: function(){
      var self = this;
      Backbone.history.start();
    }
    
  };
 window.room = new App();

});
