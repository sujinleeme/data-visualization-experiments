import React, { Component } from 'react'
import * as d3 from 'd3'
import ChartCanvas from './ChartCanvas'

class StravaCalendarHeatMap extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: []
		}
	}
	
	componentWillMount() {
		d3.queue()
			.defer(d3.json, 'data/strava/records.json')
			.await((error, data) => {
				this.setState({
					data
				});
			})
	}
	
	render() {
		const canvas = {
			className: 'canvas',
			width: 1200,
			height: 600,
		}
		
		return (
			<div>
				<ChartCanvas
					data={this.state.data}
					canvas={canvas}
				/>
			</div>
		)
	}
}

export default StravaCalendarHeatMap
