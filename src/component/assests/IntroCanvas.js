import React from 'react'
import * as d3 from 'd3'

export default class IntroCanvas extends React.Component {
	constructor(props) {
		super(props)
		
		// this.state = {
		// 	// zoomTransform: null
		// }
		//
		this.simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id((d) => d.id).distance(30))
			.force("charge", d3.forceManyBody().strength(-60))
			.nodes([{}])
		// 	.force("link", d3.forceLink().id((d) => d.id).distance(250))
		// 	.force("charge", d3.forceManyBody().strength(-200))
		// 	.force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2))
		// 	.force('collision', d3.forceCollide().radius((d) => d.r + 30).iterations(16))
		// 	.nodes(this.props.nodes)
		//
		// this.simulation.force("link").links()
	}
	
	componentDidMount() {
		
		const nodes = this.simulation.force("node")
		const links = this.simulation.force("link")
		
		
		const node = d3.selectAll(".node")
		const link = d3.selectAll(".link")
		const svg = d3.select(".introCanvas").on("mousemove", mousemove)
		
		
		
		function mousemove() {
			cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
		}
		
		//
		// var cursor = svg.append("circle")
		// 	.attr("r", 30)
		// 	.attr("transform", "translate(-100,-100)")
		// 	.attr("class", "cursor");
		//
		// // restart();
		
		
		var cursor = svg.append("circle")
			.attr("r", 30)
			.attr("transform", "translate(-100,-100)")
			.attr("fill", "#fff")
			.attr("class", "cursor");
		
		this.simulation.on("tick", tick);
		//
		function tick() {
			link.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			node.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });
		}
		
		
		function restart() {
			const node = node.data(nodes);
			
			node.enter().insert("circle", ".cursor")
				.attr("class", "node")
				.attr("r", 5)
				.on("mousedown", mousedownNode);
			
			node.exit()
				.remove();
			
			const link = link.data(links);
			
			link.enter().insert(".line", ".node")
				.attr("class", "link");
			link.exit()
				.remove();
			
			this.simulation.start();
		}
		
		function mousedownNode(d, i) {
			nodes.splice(i, 1);
			const links = links.filter(function(l) {
				return l.source !== d && l.target !== d;
			});
			d3.event.stopPropagation();
			
			restart();
		}
		
		//
		// function restart() {
		// 	const node = node.data(nodes);
		//
		// 	node.enter().insert("circle", ".cursor")
		// 		.attr("class", "node")
		// 		.attr("r", 5)
		// 		// .on("mousedown", mousedownNode);
		//
		// 	node.exit()
		// 		.remove();
		//
		// 	const link = link.data(links);
		//
		// 	link.enter().insert("line", ".node")
		// 		.attr("class", "link");
		// 	link.exit()
		// 		.remove();
		//
		// 	force.start();
		// }
		//
		//
		
		//
		// function restart() {
		// 	node = node.data(nodes);
		//
		// 	node.enter().insert("circle", ".cursor")
		// 		.attr("class", "node")
		// 		.attr("r", 5)
		// 		.on("mousedown", mousedownNode);
		//
		// 	node.exit()
		// 		.remove();
		//
		// 	link = link.data(links);
		//
		// 	link.enter().insert("line", ".node")
		// 		.attr("class", "link");
		// 	link.exit()
		// 		.remove();
		//
		// 	force.start();
		// }
		// const node = d3.selectAll(".node")
		// const link = d3.selectAll(".link")
		// const label = d3.selectAll(".label")
		// const tooltip = d3.selectAll(".tooltip")
		//
		// this.simulation.nodes(this.props.nodes).on("tick", ticked)
		//
		// function ticked() {
		// 	link
		// 		.attr("x1", (d) => d.source.x)
		// 		.attr("y1", (d) => d.source.y)
		// 		.attr("x2", (d) => d.target.x)
		// 		.attr("y2", (d) => d.target.y)
		// 	node
		// 		.attr("cx", (d) => d.x)
		// 		.attr("cy", (d) => d.y)
		// 	label
		// 		.attr("x", (d) => d.x + 5)
		// 		.attr("y", (d) => d.y + 5)
		// 	tooltip
		// 		.attr("x", (d) =>  d.x + 5)
		// 		.attr("y", (d) => d.y + 50)
		// }
	}
	
	componentDidUpdate() {
		// d3.select(this.refs.svg)
		// 	.call(this.zoom)
	}
	
	componentWillUnmount() {
		// this.simulation.stop();
	}
	
	render() {
		const {width, height, links, nodes} = this.props
		return (
			<svg className="introCanvas" width="100%" height="100%">
				<circle cy="50%" cx="50%" className="cursor" fill="#fff" r={7} />
				
			</svg>
		)
	}
}
