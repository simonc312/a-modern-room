//LocationListView takes in collection of locations
define(['jquery','underscore','backbone','js/views/location'], function($,_,Backbone,locationView) {
  var LocationListView = Backbone.View.extend({
// figure out how to actually match a .top-nav in AppView 
    el: '.top-nav',
    tagName: 'ul',
    className: 'nav nav-list lists-nav',

    events: {
    },

    initialize: function() {
      this.collection.on('add', this.render, this);
    },

    render: function() {
      var $el = $(this.el)
      , self = this;

      this.collection.each(function(location) {
      var item, sidebarItem;
      item = new LocationView({ model: location });
      $el.append(item.render().el);
  });

  return this;
    }
  });

  return LocationListView;
});
