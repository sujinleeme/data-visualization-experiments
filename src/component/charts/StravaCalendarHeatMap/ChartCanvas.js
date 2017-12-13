import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import * as Utils from "./Utils"
import Circle from "./Circle"
import Tooltip from "./Tooltip"


const global = {
	calendarStr: {
		months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
		weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	},
	colors: ['#ffc2c4', '#ff7379', '#ff111b', '#dd0009', '#c40008']
}

const style = {
	axis: {
		fontSize: '12px',
		fill: '#8A9BA8',
		fontWeight:'bold',
		letterSpacing: '2px'
	},
	title: {
		fontFamily: 'DDINRegular',
		fill: "#394B59",
		fontWeight: '800',
		fontSize: '20px',
		textTransform: 'uppercase',
		letterSpacing: '3px'
	}
}

export default class ChartCanvas extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			currentYear: null,
			totalDays: null,
			newYearDay: null
		}
		this.handleTooltip = this.handleTooltip.bind(this)
	}
	
	componentWillMount() {
		this.setCalendar(2017)
	}
	
	setCalendar(year) {
		this.setState({
			currentYear: year,
			totalDays: Utils.daysOfYear(year),
			newYearDay: new Date(`${year}/01/01`).getDay()
		})
	}
	
	handleTooltip(showTooltip, pos, records) {
		var props = {showTooltip, pos, records}
		ReactDOM.render(<Tooltip {...props} />, document.getElementById('tooltip'))
	}
	
	
	render() {
		const {currentYear, totalDays, newYearDay} = this.state
		const props = this.props
		const parseData = Utils.getAllRecordsDates(props.data)
		const years = Array.from(new Set(parseData.map((v) => v.year))).sort()
		// later new year! const yearRange = d3.range(years)
		
		const distancesVariance = Utils.getAllDistance(props.data)
		
		const variance = {
			max: d3.min(distancesVariance),
			min: d3.max(distancesVariance),
		}
		
		const chartMargin = {
				marginTop: 200,
				marginRight: 50,
				marginBottom: 200,
				marginLeft: 50,
			},
			chart = {
				width: props.canvas.width - chartMargin.marginLeft - chartMargin.marginRight,
				height: props.canvas.height - chartMargin.marginTop - chartMargin.marginBottom,
				x: chartMargin.marginLeft,
				y: props.canvas.height - chartMargin.marginBottom
			},
			item = {
				width: chart.width / (13 * 4),
				height: chart.height / 7
			}
		
		chart.colorScale = d3.scaleQuantile().domain([variance.min, variance.max]).range(global.colors)
		
		const circles = Utils.generateNumberArr(1, totalDays + 1).map(d => {
			const posX = chart.x + (item.width * Math.floor((d + newYearDay - 1) / 7))
			const posY = chartMargin.marginTop + (((d + newYearDay - 1) % 7) * item.height)
			const dayRecords = parseData.filter((e, i) =>
				new Date(e.start_date).toDateString() === new Date(currentYear, 0, d).toDateString())
			
			return (
				<Circle
					key={d}
					width={item.width}
					cx={posX}
					chart={{width: chart.width, margin: chartMargin.marginRight}}
					today={d}
					cy={posY}
					records={dayRecords}
					handleMouse={this.handleTooltip}
					colorScale={chart.colorScale}
					r={item.width / 3.5}
				/>
			)
		})
		
		const legend = global.colors.map((color, i) => (
			<g key={color}>
				<rect
					fill={color}
					height={item.height/2}
					width={item.width}
					x={(chart.width-chartMargin.marginRight) + (i*item.width)}
				  y={60}/>
			</g>
		))
		
		const yAxis = global.calendarStr.weekDays.map((day, i) => (
			<svg key={i.toString()}>
				<text x={(chart.x /3) + item.width * Math.floor((i) / 7)} y={chartMargin.marginTop + (i * item.height )}
				      style={style.axis} textAnchor="middle" fontSize={12} dy=".3em">
					{day}</text>
			</svg>
		))
		
		const xAxis = global.calendarStr.months.map((month, i) => (
			<svg key={i} x={chart.x + ((chart.width / 12) * (i))} y={chartMargin.marginTop-50} width={chart.width / 12} height="40">
				<rect fill="#F7F7F9" x="0" y="0" width={chart.width / 12} height="50"></rect>
				<text style={style.axis} x="50%" y="50%"
				      textAnchor="middle" fontSize={12} dy=".3em"
				>
					{month}
				</text>
			</svg>
		))
		
		return (
			<svg {...props.canvas}>
				<text style={style.title} x={chart.x/3} y={120}>2017</text>
				{circles}
				{xAxis}
				{yAxis}
				{legend}
				<svg id="tooltip"></svg>
			</svg>
		)
	}
}

