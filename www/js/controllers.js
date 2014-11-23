angular.module('starter.controllers', [])

.controller('LocationCtrl', function($scope, $rootScope) {
  /*
  var mapOptions = {
    zoom: 15, 
    // center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP, 
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  */

  navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.$apply(function() {
        $scope.coords = pos.coords;
      });
    },
    function(error) {
      console.log(error);
      alert('Unable to get location: ' + error.message);
    });
})

.controller('StoresCtrl', function($scope, $http, Stores) {
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
})

.controller('StoreDetailCtrl', function($scope, $stateParams, Stores) {
  $scope.store = Stores.get($stateParams.storeId);
})

.controller('AccountCtrl', function($scope) {
});
