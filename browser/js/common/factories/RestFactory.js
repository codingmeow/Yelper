app.factory('RestFactory', function($http){
	return {
		getRest = function(link){
			var queryParams = {};
			queryParams.link = 
			return $http.get('/', {params: queryParams})
			.then(function(res){
				return res.data;
			})
		}
	}
})