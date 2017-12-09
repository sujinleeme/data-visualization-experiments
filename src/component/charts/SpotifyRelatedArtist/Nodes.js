import React from 'react'
import * as d3 from 'd3'

export default class Nodes extends React.Component {
	componentDidMount() {
		const simulation = this.props.simulation;
		d3.selectAll(".node")
			.call(d3.drag()
				.on("start", onDragStart)
				.on("drag", onDrag)
				.on("end", onDragEnd));
		
		function onDragStart(d) {
			if (!d3.event.active) {
				simulation.alphaTarget(0.3).restart();
			}
			d.fx = d.x;
			d.fy = d.y;
		}
		
		function onDrag(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}
		
		function onDragEnd(d) {
			if (!d3.event.active) {
				simulation.alphaTarget(0);
			}
			d.fx = null;
			d.fy = null;
		}
	}
	
	render() {
		const nodes = this.props.nodes.map((node, index) => {
			return <Node key={index} node={node}/>;
		})
		
		return (
			<g className="nodes">
				{nodes}
			</g>
		)
	}
}

class Node extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false
		};
	}
	
	componentDidMount() {
		const link = d3.selectAll(".link")
		const colors = d3.scaleThreshold()
			.range(["#FFF714", "#FFDE24", "#FFC535", "#FFAC45", "#FF9456", "#FF7B67", "#FF6277", "#FF4A88", "#FF3198", "#FF00BA"])
			.domain([1, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500]);
		
		function getWeight(d) {
			return link.filter((l) =>
				l.source.index === d.index || l.target.index === d.index
			).size()
		}
		
		d3.select(this.ref).data([this.props.node])
			.attr("r", function (d) {
				d.weight = getWeight(d)
				const minRadius = 1
				return minRadius + (d.weight * 0.3);
			})
			.attr("fill", function (d) {
				d.weight = getWeight(d)
				return colors(d.weight)
			});
	}
	
	triggerSuccess() {
		this.setState({
			hover: !this.state.hover
		})
	}
	
	render() {
		return (
			<g>
				<circle className="node"
				        ref={(ref) => this.ref = ref}
				        onMouseOver={this.triggerSuccess.bind(this)}
				        onMouseLeave={this.triggerSuccess.bind(this)}
				>
				</circle>
			</g>
		
		);
	}
}
