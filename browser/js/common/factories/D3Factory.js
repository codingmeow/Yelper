app.factory('D3Factory', function ($http) {
	var svg;
	var count=1
	// function calcMe(arr){
	// 	var obj={}
	// 	arr.forEach(function(a){
	// 		if(a.score > 0){
	// 			obj.pos++
	// 		}else{
	// 			obj.neg++
	// 		}
	// 	})
	// 	return obj;
	// }

	return {
		loadD3: function (arr) {
			// function calcSent(arr){
			// 	if(count%2 === 0){
			// 		return

			// 		}
			// 	}else{
			// 		return .3
			// 	}

			// }
			console.log(Math.random)
			var width = 960,
			    height = 500,
			    radius = Math.min(width, height) / 2 - 10;

			var data = d3.range(2).map(Math.random).sort(d3.descending);

			var color = d3.scale.category10();

			var arc = d3.svg.arc()
			    .outerRadius(radius);

			var pie = d3.layout.pie();

			svg = d3.select("#body").append("svg")
			    .datum(data)
			    .attr("width", width)
			    .attr("height", height)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			var arcs = svg.selectAll("g.arc")
			    .data(pie)
			  .enter().append("g")
			    .attr("class", "arc");

			arcs.append("path")
			    .attr("fill", function(d, i) { return color(i); })
			  .transition()
			    .ease("bounce")
			    .duration(2000)
			    .attrTween("d", tweenPie)
			  .transition()
			    .ease("elastic")
			    .delay(function(d, i) { return 2000 + i * 50; })
			    .duration(750)
			    .attrTween("d", tweenDonut);

			function tweenPie(b) {
			  b.innerRadius = 0;
			  var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
			  return function(t) { return arc(i(t)); };
			}

			function tweenDonut(b) {
			  b.innerRadius = radius * .6;
			  var i = d3.interpolate({innerRadius: 0}, b);
			  return function(t) { return arc(i(t)); };
			}
		},
		removeD3: function () {
			if (svg) {

				d3.selectAll('svg').remove();

			}
		}
	}
})