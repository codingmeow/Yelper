// app.config(function ($stateProvider) {
// 	$stateProvider.state('addRestaurant', {
// 		url: "/newRest",
// 		controller: "NewRestController",
// 		templateUrl: "js/add-rest/add-rest.html"
// 	});
// });

// app.controller('NewRestController', function ($scope, RestFactory){
// 	$scope.inputRest = function (rest){
// 		RestFactory.addRest(rest).then(function (newRest){
// 			$scope.newRest = {
// 				url: null
// 			}
// 		})
// 	}
// })