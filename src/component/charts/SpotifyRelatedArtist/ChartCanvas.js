import React from "react"
import * as d3 from "d3"
import Nodes from "./Nodes"
import Links from "./Links"
import Labels from "./Labels"
import Legend from "./Legend"

export default class ChartCanvas extends React.Component {
	constructor(props) {
		super(props)
		
		this.simulation = d3.forceSimulation()
			.nodes(this.props.nodes)
			.velocityDecay(0.2)
			.force("link", d3.forceLink().id((d) => d.id))
			.force("charge", d3.forceManyBody().strength(-1000))
			.force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2))
			.force("collide", d3.forceCollide().radius((d) => d.radius).strength((d) => -1 * d.radius))
		
		this.simulation.force("link").links(this.props.links)
	}
	
	componentDidMount() {
		const node = d3.selectAll(".node")
		const link = d3.selectAll(".link")
		const label = d3.selectAll(".label")
		const tooltip = d3.selectAll(".tooltip")
		
		this.simulation.nodes(this.props.nodes).on("tick", ticked)
		
		function ticked() {
			link
				.attr("x1", (d) => d.source.x)
				.attr("y1", (d) => d.source.y)
				.attr("x2", (d) => d.target.x)
				.attr("y2", (d) => d.target.y)
			node
				.attr("cx", (d) => d.x)
				.attr("cy", (d) => d.y)
			label
				.attr("x", (d) => d.x + 5)
				.attr("y", (d) => d.y + 5)
			tooltip
				.attr("x", (d) => d.x + 5)
				.attr("y", (d) => d.y + 50)
		}
	}
	
	componentWillUnmount() {
		this.simulation.stop()
	}
	
	render() {
		const {width, height, links, nodes} = this.props
		const colorsPalette = ["#FFF714", "#FFDE24", "#FFC535", "#FFAC45", "#FF9456", "#FF7B67", "#FF6277", "#FF4A88", "#FF3198", "#FF00BA"]
		
		return (
			<svg className="container" width={width} height={height}>
				<g className="chart">
					<Links links={links}/>
					<Nodes nodes={nodes} simulation={this.simulation}
					       colors={colorsPalette}/>
					<Labels nodes={nodes}/>
					<Legend colors={colorsPalette}/>
				</g>
			</svg>
		)
	}
}
