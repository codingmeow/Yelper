app.directive('navbar', function ($rootScope, $state, RestFactory) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.restaurants = [
                'Bahn Mi Cart',
                'Veronica\'s Kitchen',
                'Open Kitchen',
                'Sophie\'s Cuban Cuisine',
                'Dig Inn Seasonal Market'
            ]

            // scope.addRest = function (){
            //     $state.go('addRestaurant');
            // }

            scope.getRestaurant = function(rest){
                // console.log('hit directive')
                RestFactory
                .getRest(rest)
                .then(function(main){
                    scope.main = main;
                })
            }

            scope.inputRest = function (rest){
                console.log('hit directive', rest)
                RestFactory.addRest(rest).then(function (newRest){
                    scope.newRest.url = null;
                })
            }

        }

    };

});