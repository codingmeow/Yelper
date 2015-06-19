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

            scope.getRestaurant = function(rest){
                // console.log('hit directive')
                RestFactory
                .getRest(rest)
                .then(function(main){
                    scope.main = main;
                })
            }

        }

    };

});