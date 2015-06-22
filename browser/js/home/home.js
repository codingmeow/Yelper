app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('MainController', function ($scope, RestFactory){
	// $scope.getAllRestaurants = function () {
	// 	RestFactory.getAllRest().then(function (rests){
	// 		$scope.restaurants = rests;
	// 	});
	// };
	// $scope.getAllRestaurants();
		$scope.showRestByName = function (name) {
			RestFactory.getRestByName(name).then(function (restaurant){
				$scope.restaurant = restaurant;
			});
		};

		$scope.showRestByName();

});