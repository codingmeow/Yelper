app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'MainController'
    });
});

app.controller('MainController', function ($scope, RestFactory){
	$scope.showing = true;
	$scope.restaurants = [];
    $scope.selectRestaurant = null;


	// var starArr = $scope.selectedRest.stars


	// $scope.averageRating = function (starArr) {
	// 	return eval(starArr.join('+'))/starArr.length;
	// }
	// console.log($scope.averageRating());


    $scope.getAllRestNames = function () {
        RestFactory.getAllRest().then(function (rests){
            $scope.restaurants = rests.map(function (rest) {
                return rest;
            })
        })
    }
    $scope.getAllRestNames();

    $scope.getRestaurantByName = function (name) {
        // console.log('this is name', name)
        $scope.showing = false;
        $scope.restaurants.forEach(function(rest){
            if(name === rest.name){
                $scope.selectRestaurant = true;
                $scope.selectedRest = rest;
                // console.log($scope.selectedRest)
            }
        })
    }

    // $scope.getRestaurant('Dominique Ansel Bakery');


    // $scope.getRestaurant = function(rest){
    //     // console.log('hit directive')
    //     RestFactory
    //     .getRest(rest)
    //     .then(function(main){
    //         $scope.main = main;
    //     })
    // }

    $scope.inputRest = function (rest){
        console.log('hit directive', rest)
        RestFactory.addRest(rest).then(function (newRest){
            $scope.newRest.url = null;
        })
    }

	// 
	// console.log($scope.averageRating);
	// $scope.getAllRestaurants = function () {
	// 	RestFactory.getAllRest().then(function (rests){
	// 		$scope.restaurants = rests;
	// 	});
	// };
	// $scope.getAllRestaurants();

		// $scope.showRestByName = function (name) {
		// 	RestFactory.getRestByName(name).then(function (restaurant){
		// 		$scope.restaurant = restaurant;
		// 	});
		// };

		// $scope.showRestByName();

});