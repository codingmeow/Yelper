app.directive('restSentiment', function ($state){
	return {
		restrict: 'E',
		scope: {
			restaurant: '='
		},
		templateUrl: 'js/common/directives/rest-sentiments/rest-sent.html'//,
		// link: function (scope) {
			
		// }
	};
});