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

require(['js/views/app', 'js/views/locationList', 'js/collections/todos', 'js/collections/actions', 'js/collections/locations','js/collections/resources', 'js/collections/events' ], function(AppView, LocationListView, TodoCollection, ActionCollection, LocationCollection, ResourceCollection, EventCollection){
  var App = function(){
    this.collections.todos = TodoCollection;
    this.collections.locations = LocationCollection;
    this.collections.actions = ActionCollection;
    this.collections.resources = ResourceCollection;
    this.collections.events = EventCollection;
    this.views.app = new AppView({collection: this.collections.todos});
    this.views.locationList = new LocationListView({collection: this.collections.locations});

  //reload the default models to each collection on page reload
   $.each(this.collections,function(index,value){
    if(value != TodoCollection){
      value.reload();
    }
    });
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
