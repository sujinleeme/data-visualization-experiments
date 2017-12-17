import React, {Component} from 'react'
import * as d3 from 'd3'
import CountryMap from './CountryMap'
import { withStyles } from 'material-ui/styles'
import * as topojson from 'topojson'
import _ from 'lodash'

const styles = theme => ({
	title: {
		color: "#182026",
		fontSize: '13px',
		textTransform: 'uppercase',
		letterSpacing: '2px',
		display: 'block',
		opacity: 0.9,
		textAlign: 'center',
		marginTop: '10px',
	}
})


class SchoolPlaceGeography extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mapData: null,
			schools: {
				elementary: null,
				middle: null,
				high: null
			},
			
			checked: {
				elementary: true,
				middle: true,
				high: true
			}
		}
		
		const width = 1000
		const height = 600
		
		
		this.zoom = d3.zoom()
			.scaleExtent([0, 3])
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
	
	
	handleChange = name => event => {
		this.setState({checked: {...this.state.checked, [name]: event.target.checked}})
	}
	
	render() {
		const {mapData, zoomTransform, schools, checked} = this.state
		const { classes } = this.props
		
		return (
			<div>
				{mapData ?
					<div>
						<h1 className={classes.title}>
							Total &middot; {schools.elementary ? schools.elementary.length + schools.middle.length +
								schools.high.length : ` ... `}  Schools
						</h1>
						<CountryMap
							checked={checked}
							width={1000}
							height={1000}
							mapData={mapData}
							zoomType="scale"
							zoomTransform={zoomTransform}
							x={0}
							y={0}
							schools={schools}
							handleChange={this.handleChange}
						/>
					</div> : null}
			</div>
		)
	}
}


export default withStyles(styles)(SchoolPlaceGeography)


