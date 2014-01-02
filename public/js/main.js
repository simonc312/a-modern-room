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
    text: 'js/libs/require/text'
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

require(['js/views/app', 'js/views/locationList', 'js/collections/todos', 'js/collections/actions', 'js/collections/locations' ], function(AppView, LocationListView, TodoCollection, ActionCollection, LocationCollection){
  var App = function(){
    this.collections.todos = TodoCollection;
    this.collections.actions = ActionCollection;
    this.collections.locations = LocationCollection;
    this.views.app = new AppView({collection: this.collections.todos});
    this.views.locationList = new LocationListView({collection: this.collections.locations});
    this.collections.actions.create({content: "Restart the computer", order:this.collections.actions.nextOrder(), enabled: true, cost: "50 ghz"});
     this.collections.actions.create({content: "Check facebook", order:this.collections.actions.nextOrder(), enabled: true, cost: "2 hours of productivity"});
    this.collections.locations.create({id: 1, content: "Localhost", order: this.collections.locations.nextOrder(), enabled: true});
  };

  App.prototype = {
    views: {},
    collections: {},
    start: function(){
      var self = this;
      self.views.locationList.render();
      Backbone.history.start();
    }
    
  };
 window.room = new App();

});
