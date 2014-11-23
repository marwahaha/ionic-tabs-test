angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Stores', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var stores = [
    { id: 1, name: 'Offline Store 1' },
    { id: 2, name: 'Offline Store 2' },
    { id: 3, name: 'Offline Store 3' }
  ];

  return {
    all: function() {
      return stores;
    },
    get: function(storeId) {
      // Simple index lookup
      return stores[storeId];
    }
  }
});
