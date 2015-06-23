app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'MainController'
    });
});

app.controller('MainController', function ($scope, RestFactory, D3Factory){
	$scope.showing = true;
	$scope.restaurants = [];
    $scope.selectRestaurant = null;


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
        D3Factory.removeD3();
        D3Factory.loadD3();
        $scope.restaurants.forEach(function(rest){
            if(name === rest.name){
                $scope.selectRestaurant = true;
                $scope.selectedRest = rest;
                // console.log($scope.selectedRest)
                
            }
        })
    }

    D3Factory.removeD3();

    $scope.inputRest = function (rest){
        console.log('hit directive', rest)
        RestFactory.addRest(rest).then(function (newRest){
            $scope.newRest.url = null;
        })
    }

});