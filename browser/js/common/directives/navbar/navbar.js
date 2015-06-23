app.directive('navbar', function ($rootScope, $state, RestFactory) {

    return {
        restrict: 'E',
        scope: { 
            restaurant: '=' 
        },
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            // scope.restaurants = [];
            // scope.selectRestaurant = null;

            // scope.getAllRestNames = function () {
            //     RestFactory.getAllRest().then(function (rests){
            //         scope.restaurants = rests.map(function (rest) {
            //             return rest;
            //         })
            //     })
            // }

            // scope.getRestaurantByName = function (name) {
            //     // console.log('this is name', name)
            //     scope.restaurants.forEach(function(rest){
            //         if(name === rest.name){
            //             scope.selectRestaurant = true;
            //             $rootScope.selectedRest = rest;
            //             console.log($rootScope.selectedRest)
            //         }
            //     })
            // }
            // scope.getAllRestNames();

            // scope.getRestaurant('Dominique Ansel Bakery');


            // // scope.getRestaurant = function(rest){
            // //     // console.log('hit directive')
            // //     RestFactory
            // //     .getRest(rest)
            // //     .then(function(main){
            // //         scope.main = main;
            // //     })
            // // }

            // scope.inputRest = function (rest){
            //     console.log('hit directive', rest)
            //     RestFactory.addRest(rest).then(function (newRest){
            //         scope.newRest.url = null;
            //     })
            // }

        }

    };

});