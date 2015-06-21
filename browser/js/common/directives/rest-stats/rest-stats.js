app.directive('restStats', function ($state, RestFactory){
	return {
		restrict: 'E',
		scope: {
			restaurant: '='
		},
		templateUrl: 'js/common/directives/rest-stats/rest-stats.html'//,
		// link: function (scope) {
		// 	scope.restaurant;
		// }
	};
});