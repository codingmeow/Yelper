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
        D3Factory.removeD3();
        $scope.showing = false;

        $scope.restaurants.forEach(function(rest){
            if(name === rest.name){
                D3Factory.loadD3(rest.result);
                console.log('rest result',rest.result)
                $scope.selectRestaurant = true;
                $scope.selectedRest = rest;
                $scope.rating = averagie(rest.stars);
                $scope.negpos = posneg(averagie(rest.stars));
            }
        })
    }

    $scope.inputRest = function (rest){
        console.log('hit directive', rest)
        $scope.showing = false;
        RestFactory.addRest(rest).then(function (newRest){
            $scope.newRest.url = null;
            $scope.selectedRest = newRest;
        })
    }

    function posneg(num){
        if(num === 3) return 'NEUTRAL'
        else if (num > 3) return 'POSITIVE'
        else return 'NEGATIVE'
    }
    function averagie(arr){
        var sum = 0;
        arr.forEach(function(a){
            sum += a;
        })
        return Math.round(sum/arr.length);
    }

    function calcSent(arr){

        arr.forEach(function(a){

        })
    }

});