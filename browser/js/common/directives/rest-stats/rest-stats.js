app.directive('rest-stats', function ($state){
	return {
		restrict: 'E',
		scope: {
			restaurant: '='
		},
		templateUrl: 'js/common/directives/rest-stats.html',
		link: function (scope) {
			return;
		}
	};
});