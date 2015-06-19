app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

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
                'Dig Inn'
            ]

            scope.getRestaurant = function(rest){
                RestFactory.getRest(rest).then(fuction(main){
                    scope.main = main;
                })
            }

        }

    };

});