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

require([ 'js/views/app', 'js/collections/todos' ], function(AppView, AppCollection){
  var app_view = new AppView({
    collection: AppCollection
  });
});
