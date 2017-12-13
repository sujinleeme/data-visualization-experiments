import React, {Component} from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import * as topojson from 'topojson'

class CountryMap extends Component {
	constructor(props) {
		super(props)
		this.updateD3(props)
	}
	
	
	componentWillUpdate(nextProps) {
		this.updateD3(nextProps)
	}
	
	updateD3(props) {
		const {data, width, height, zoomTransform, zoomType} = props;
		//
		this.xScale = d3.scaleLinear()
			.domain([0, d3.max(30, ([x, y]) => x)])
			.range([0, width]),
			this.yScale = d3.scaleLinear()
				.domain([0, d3.max(30, ([x, y]) => y)])
				.range([0, height])
		
		// if (zoomTransform && zoomType === "detail") {
		// 	this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
		// 	this.yScale.domain(zoomTransform.rescaleY(this.yScale).domain());
		// }
	}
	
	
	get transform() {
		const {x, y, zoomTransform, zoomType} = this.props;
		let transform = "";
		if (zoomTransform && zoomType === "scale") {
			transform = `translate(${x + zoomTransform.x}, ${y + zoomTransform.y}) scale(${zoomTransform.k})`;
		}
		return transform;
	}
	
	
	projection() {
		const {width, height} = this.props
		return d3.geoMercator()
			.center([128, 36])
			.scale(7000)
			.translate([width / 2, height / 2])
	}
	
	render() {
		const canvas = {
			className: 'canvas',
			width: 1200,
			height: 600,
		}
		const {width, height, mapData} = this.props
		
		return (
			<svg className="map" width={width} height={height} viewBox={`0 0 ${width} ${height}`} ref="svg">
				<g transform={this.transform}>
					<g className="cities">
						{
							mapData.map((d, i) => (
								<path
									key={`path-${ i }`}
									d={d3.geoPath().projection(this.projection())(d)}
									className="country"
									fill={`rgba(38,50,56,${1 / mapData.length * i})`}
									stroke="black"
									strokeWidth={0.5}
								/>
							))
						}
					</g>
					<g className="markers">
						<circle
							cx={this.projection()([126.9780, 37.5665])[0]}
							cy={this.projection()([126.9780, 37.5665])[1]}
							r={0.5}
							fill="#E91E63"
							className="marker"
						/>
					</g>
				</g>
			
			</svg>
		)
	}
}


export default CountryMap
