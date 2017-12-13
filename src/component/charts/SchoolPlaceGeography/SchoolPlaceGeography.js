import React, {Component} from 'react'
import * as d3 from 'd3'
import {connect} from 'react-redux'
import CountryMap from './CountryMap'
import * as topojson from 'topojson'
import _ from 'lodash'

class ConvenienceStorePlaceGeography extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mapData: null,
			schools: {
				elementary: null,
				middle: null,
				high: null
				
			}
		}
		
		const width = 1000
		const height = 600
		//
		// this.zoom = d3.zoom()
		// 	.scaleExtent([-5, 5])
		// 	.translateExtent([[-100, -100], [width+100, height+100]])
		// 	.extent([[-100, -100], [width+100, height+100]])
		// 	.on("zoom", this.zoomed.bind(this))
		
		this.zoom = d3.zoom()
			.scaleExtent([0, 3])
			// .translateExtent([[0, 0], [props.width+100, props.height+100]])
			// .extent([[-100, -100], [props.width+100, props.height+100]])
			.on("zoom", this.zoomed.bind(this))
	}
	
	
	zoomed() {
		this.setState({
			zoomTransform: d3.event.transform
		})
	}
	
	
	
	componentDidMount() {
		fetch('https://sujinlee-infovisualization.firebaseio.com/records.json').then(res =>
			res.json()).then(data => {
			const elementary = _.filter(data, {'학교급구분': '초등학교'}),
				middle = _.filter(data, {'학교급구분': '중학교'}),
				high = _.filter(data, {'학교급구분': '고등학교'})
			return this.setState({
				...this.state,
				schools: {
					data,
					elementary,
					middle,
					high
				}
			})
		})
		
		
		d3.select('.map')
			.call(this.zoom)
	}
	
	componentDidUpdate() {
		d3.select('.map')
			.call(this.zoom)
	}
	
	
	componentWillMount() {
		d3.queue()
			.defer(d3.json, 'data/map/koTopo.json')
			.await((error, mapData) => {
				this.setState({
					mapData: topojson.feature(mapData, mapData.objects["municipalities-geo"]).features
				})
			})
	}
	
	render() {
		const {mapData, zoomTransform, schools} = this.state
		const canvas = {
			className: 'canvas',
			width: 1000,
			height: 400,
		}
		
		return (
			<div>
				{mapData ?
					<CountryMap
						width={1000}
						height={1000}
						mapData={mapData}
						zoomType="scale"
						zoomTransform={zoomTransform}
						x={0}
						y={0}
						schools={schools}
					/> : null}
			</div>
		)
	}
}


export default ConvenienceStorePlaceGeography
