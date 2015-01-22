require.config({
  paths: {
    jquery: 'js/libs/jquery/jquery-min',
    underscore: 'js/libs/underscore/underscore-min',
    backbone: 'js/libs/backbone/backbone',
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

require(['js/views/app', 'js/views/locationList', 'js/collections/actions',
 'js/collections/locations','js/collections/resources', 'js/collections/events' ],
 function(AppView, LocationListView, ActionCollection, LocationCollection, ResourceCollection, EventCollection){
  var App = function(){
    this.collections.locations = LocationCollection;
    this.collections.actions = ActionCollection;
    this.collections.resources = ResourceCollection;
    this.collections.events = EventCollection;
    this.views.app = new AppView();
    this.views.locationList = new LocationListView({collection: this.collections.locations});

  //reload the default models to each collection on page reload
   $.each(this.collections,function(index,value){
      value.reload();
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
