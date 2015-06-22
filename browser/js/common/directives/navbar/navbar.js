app.directive('navbar', function ($rootScope, $state, RestFactory) {

    return {
        restrict: 'E',
        scope: { 
            restaurant: '=' 
        },
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

            scope.getRestaurantByURL = function (link) {
                scope.restaurants.forEach(function (thisRest){
                    if (thisRest.url ===  link){
                    console.log('THIS IS LINK', link);
                    console.log('THIS IS THISREST',thisRest);
                        scope.restaurant = thisRest;
                    }
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