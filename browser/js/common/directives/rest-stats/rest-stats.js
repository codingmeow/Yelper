// app.directive('restStats', function ($rootScope, $state, RestFactory){
// 	return {
// 		restrict: 'E',
// 		scope: {
// 			selectedRest: '='
// 		},
// 		templateUrl: 'js/common/directives/rest-stats/rest-stats.html',
// 		link: function (scope) {
// 			var width = 960,
// 			    height = 500,
// 			    radius = Math.min(width, height) / 2 - 10;

// 			var data = d3.range(2).map(Math.random).sort(d3.descending);

// 			var color = d3.scale.category10();

// 			var arc = d3.svg.arc()
// 			    .outerRadius(radius);

// 			var pie = d3.layout.pie();

// 			var svg = d3.select("#body").append("svg")
// 			    .datum(data)
// 			    .attr("width", width)
// 			    .attr("height", height)
// 			  .append("g")
// 			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// 			var arcs = svg.selectAll("g.arc")
// 			    .data(pie)
// 			  .enter().append("g")
// 			    .attr("class", "arc");

// 			arcs.append("path")
// 			    .attr("fill", function(d, i) { return color(i); })
// 			  .transition()
// 			    .ease("bounce")
// 			    .duration(2000)
// 			    .attrTween("d", tweenPie)
// 			  .transition()
// 			    .ease("elastic")
// 			    .delay(function(d, i) { return 2000 + i * 50; })
// 			    .duration(750)
// 			    .attrTween("d", tweenDonut);

// 			function tweenPie(b) {
// 			  b.innerRadius = 0;
// 			  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
// 			  return function(t) { return arc(i(t)); };
// 			}

// 			function tweenDonut(b) {
// 			  b.innerRadius = radius * .6;
// 			  var i = d3.interpolate({innerRadius: 0}, b);
// 			  return function(t) { return arc(i(t)); };
// 			}
// 		}
// 	};
// });