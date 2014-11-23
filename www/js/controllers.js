angular.module('starter.controllers', [])

.controller('LocationCtrl', function($scope, $rootScope) {
  var mapOptions = {
    zoom: 15, 
    // center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP, 
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

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

.controller('FriendsCtrl', function($scope, $http, Friends) {
  $scope.friends = [];
  $http.get('http://philounet.herokuapp.com/api/rest/stores')
  	.success(function (data) {
  		angular.forEach(data, function (value) {
  			$scope.friends.push(value);
  		});
  	})
  	.error(function (data) {
      alert('Unable to get stores');
  		// on error loading default
  		$scope.friends = Friends.all();
  	});
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
