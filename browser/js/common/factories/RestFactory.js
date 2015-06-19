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
			console.log("hit factory, queryPamas.link", queryParams.link)
			return $http.get('/', {params: queryParams})
			.then(function(res){
				return res.data;
			})
		}
	}
})