app.directive('restStats', function ($state, RestFactory){
	return {
		restrict: 'E',
		scope: {
			restaurant: '='
		},
		templateUrl: 'js/common/directives/rest-stats/rest-stats.html',
		link: function (scope) {
			console.log('THIS IS RESTAURANT', scope.restaurant);
		}
	};
});