app.factory('RestFactory', function($http){

	function fix(name){
		var temp = ""
		if(name.indexOf("'")>-1){
			name = name.replace(/'/g, "");
		}
		temp = name.replace(/\s/g, "-").toLowerCase();
		return "http://www.yelp.com/biz/"+ temp + "-new-york";
	}
	return {
		getRest: function(link){
			var queryParams = {};
			queryParams.link = fix(link);
			console.log("hit factory, queryParams.link", queryParams.link)
			return $http.get('/api/', {params: queryParams})
			.then(function(res){
				console.log(res.data);
				return res.data;
			})
		},
		getRestByName: function (name) {
			var queryParams = {};
			queryParams.name = name;
			return $http.get('/api/', {params: queryParams})
			.then(function(res){
				return res.data;
			})
		},
		getAllRest: function () {
			return $http.get('/api/')
			.then(function(response){
				return response.data;
			})
		},
		addRest: function (URL) {
			console.log('hit factory')
			return $http.post('/api/', URL)
			.then(function (res) {
				return res.data;
			})
		}
	}
})