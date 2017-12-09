import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {DataSet} from '../../../data/oced/data'
import {palette} from '../../../style/Palette'
import SortSelection from '../../assests/SortSelection'

import {
	BarChart, ReferenceLine, Bar, XAxis, YAxis, Cell, Tooltip,
	ResponsiveContainer,
	Label,
} from 'recharts'


const styles = theme => ({
	chart: {
		marginBottom: theme.spacing.unit * 6,
	},
	root: {
		top: '20px',
	},
	hide: {
		display: 'none',
	},
	label: {
		zIndex: '9',
	},
	sortOption: {
		float: 'right',
	},
	axis: {
		fontSize: '10px !important',
	}
})

const yearList = ['2013', '2014', '2015', '2016']

class SocialExpenditureGraph extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			initData: [],
			filterData: [],
			ocedData: [],
			currentYear: '2013',
			yearIndex: 1,
			sortType: 3,
		}
		
		this.selectYear = this.selectYear.bind(this)
		this.selectSortType = this.selectSortType.bind(this)
		this.selectYearIndex = this.selectYearIndex.bind(this)
	}
	
	componentDidMount() {
		this.initDataSet().then(() => {
			this.sortDataSet(this.state.currentYear, this.state.sortType)
		})
	}
	
	initDataSet() {
		const year = this.state.currentYear
		const average = DataSet.filter(item =>
			item.country === 'OECD',
		)[0]
		const notIncludeAverage = DataSet.filter(item =>
			item !== average,
		)
		this.setState({initData: notIncludeAverage, ocedData: average})
		return new Promise((res) => {
			res('Success Fetch InitData')
		})
	}
	
	sortDataSet(currentYear, type) {
		const {initData} = this.state
		const dataSet = initData.filter(item => item[currentYear] !== null)
		let sortedData
		switch (type) {
			case 1 :
				sortedData = dataSet.sort(
					(a, b) => Number(a[currentYear]) - Number(b[currentYear]))
				break
			case 2:
				sortedData = dataSet.sort(
					(a, b) => Number(b[currentYear]) - Number(a[currentYear]))
				break
			case 3:
				sortedData = dataSet.sort((a, b) => a.country.localeCompare(b.country))
				break
		}
		return this.setState({filterData: sortedData})
	}
	
	selectSortType = name => event => {
		event.stopPropagation()
		this.setState({[name]: event.target.value})
		return this.sortDataSet(this.state.currentYear, event.target.value)
	}
	
	selectYearIndex = event => {
		event.stopPropagation()
		this.setState({yearIndex: event.target.value})
		const currentYear = yearList[event.target.value - 1]
		this.setState({currentYear: currentYear})
		return this.sortDataSet(currentYear, this.state.sortType)
	}
	
	selectYear(e) {
		let year = e.target.innerHTML
		if (e.target.tagName !== 'SPAN') {
			year = e.target.childNodes[0].innerHTML
		}
		this.setState({currentYear: year})
		return this.sortDataSet(year, this.state.sortType)
	}
	
	render() {
		const classes = this.props.classes
		const {filterData, ocedData, currentYear, yearIndex, sortType} = this.state
		const averageData = ocedData[currentYear]
		return (
			<div className={classes.chart}>
				<SortSelection
				               sortTypeVal={sortType}
				               yearIndex={yearIndex}
				               handleChange={this.selectSortType}
				               handleYearChange={this.selectYearIndex}
				/>
				<ResponsiveContainer className={classes.charts}
				                     width="100%" height={1200}>
					<BarChart
						data={filterData}
						layout="vertical"
						margin={{left: 20, top: 20, bottom: 20, right: 20}}
						className={classes.root}
					>
						<XAxis padding={{left: 10}} tickFormatter={(value) => `${value}%`}
						       tick={{fontSize: '13px', padding: '12px', color: palette.darkgrey}} type="number">
						</XAxis>
						
						<YAxis padding={{bottom: 10, left: 10}} tick={{fontSize: '13px', color: palette.darkgrey}}
						       type="category" dataKey="country"/>
						<Tooltip cursor={{fillOpacity: 0.3}}
						         itemStyle={{fontSize: '13px', color: palette.green}}/>
						<Bar dataKey={currentYear}
						     label={{fill: palette.darkgrey, fontSize: 10, position: 'right'}}
						     unit="%"
						>
							{filterData.map((entry, index) => {
								const color = entry[currentYear] > (averageData)
									? palette.green
									: palette.lightgreen
								return <Cell key={index} fill={color}/>
							})}
						</Bar>
						<ReferenceLine x={averageData} strokeDasharray="2 2"
						               stroke={palette.darkgreen}>
							<Label position="top">
								{`OECD - ${averageData}(%)`}
							</Label>
						</ReferenceLine>
					</BarChart>
				</ResponsiveContainer>
			</div>
		)
	}
}

export default withStyles(styles)(SocialExpenditureGraph)
