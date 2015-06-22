app.directive('navbar', function ($rootScope, $state, RestFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.restaurants = [];

            scope.getAllRestNames = function () {
                RestFactory.getAllRest().then(function (rests){
                    scope.restaurants = rests.map(function (rest) {
                        return rest.name;
                    })
                })
            }

            scope.getAllRestNames();

            // scope.getRestaurant = function(rest){
            //     // console.log('hit directive')
            //     RestFactory
            //     .getRest(rest)
            //     .then(function(main){
            //         scope.main = main;
            //     })
            // }

            scope.inputRest = function (rest){
                console.log('hit directive', rest)
                RestFactory.addRest(rest).then(function (newRest){
                    scope.newRest.url = null;
                })
            }

        }

    };

});