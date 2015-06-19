app.directive('rest-stats', function ($state, RestFactory){
	return {
		restrict: 'E',
		scope: {
			restaurant: '='
		},
		templateUrl: 'js/common/directives/rest-stats.html',
		// link: function (scope) {
		// 	return;
		// }
	};
});