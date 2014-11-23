'use strict';

myApp.controller('LocationCtrl', function($scope, $rootScope) {
  /*
  var mapOptions = {
    zoom: 15, 
    // center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP, 
  };

  var map = new google.maps.Map(account.getElementById('map'), mapOptions);
  */

  navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.$apply(function() {
        $scope.coords = pos.coords;
      });
    },
    function(error) {
      alert('Unable to get location: ' + error.message);
    });
});

myApp.controller('StoresCtrl', function($scope, $http, Stores) {
  $scope.stores = [];
  $http.get('http://philounet.herokuapp.com/api/rest/stores')
  	.success(function (data) {
  		angular.forEach(data, function (value) {
  			$scope.stores.push(value);
  		});
  	})
  	.error(function (data) {
      alert('Unable to get stores');
  		// on error loading default
  		$scope.stores = Stores.all();
  	});
});

myApp.controller('StoreDetailCtrl', function($scope, $stateParams, Stores) {
  $scope.store = Stores.get($stateParams.storeId);
});

myApp.controller('AccountsCtrl', function($scope, Account) {
  $scope.accounts = [ {id: '1', name: 'a1_'}, {id: '2', name: 'a2_'} ];
  Account.all().then(function(accounts) {
      $scope.accounts = accounts;
  });
});
