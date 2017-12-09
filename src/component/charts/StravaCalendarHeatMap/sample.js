/*eslint no-console: "off"*/

var globals = {
	url: 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json',
	colors: [250, 200, 160, 100, 70, 60, 44, 30, 20, 10, 335],
	months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December'
	],
}

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			description: ''
		}
		this.handleMouse = this.handleMouse.bind(this)
		this.baseTemp = 0
		this.tooltip = document.getElementsByClassName('tt')[0]
	}
	
	componentDidMount(){
		console.log('In componentDidMount')
		// Grab data from API and store in state once App mounts
		fetch(globals.url)
			.then((response)=>{
				console.log('Fetch ' + (response.ok? 'success!' : 'failure...'))
				return response
			})
			.then((response)=>response.json())
			.then((json)=>{
				this.setState({
					data: json,
					description: 'Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.  Estimated Jan 1951-Dec 1980 absolute temperature ℃: 8.66 +/- 0.07',
					title: 'D3 Monthly Global Land-Surface Temperature 1753-2015'
				})
				this.baseTemp = json.baseTemperature
			})
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return this.props === nextProps && this.state===nextState ? false : true
	}
	
	handleMouse(showTooltip, pos, datum) {
		datum.baseTemp = this.baseTemp
		var props = {showTooltip, pos, datum}
		ReactDOM.render(<Tooltip {...props} />, document.getElementById('tooltip'))
	}
	
	render() {
		
		return (
			<div>
				<TitleBar title={this.state.title} />
				<CanvasBody
					data={this.state.data}
					desc={this.state.description}
					handleMouse={this.handleMouse}
				/>
			</div>
		)
	}
}

function TitleBar(props){
	return <div className='title display-5 text-center text-shadow unselectable'>{props.title}</div>
}

function CanvasBody(props){
	
	var canvas = {
		className: 'canvas',
		width: 1200,
		height: 600,
		style: {
			backgroundColor: '#EEE',
			boxShadow: '-8px 8px 32px #444'
		}
	}
	
	return (
		<svg {...canvas}>
			{props.data &&
			<Chart
				canvas={canvas}
				data={props.data}
				desc={props.desc}
				handleMouse={props.handleMouse}
			/>}
		</svg>
	)
}

function Chart(props) {
	
	var chart = {
			marginTop: 80,
			marginRight: 50,
			marginBottom: 80,
			marginLeft: 100,
		},
		data = props.data.monthlyVariance.map((v)=>{
			v.date = new Date(v.year, 0)
			return v
		}),
		baseTemp = props.data.baseTemperature,
		years = Array.from(new Set(data.map((v)=>v.year))).sort(),
		variance = {
			data: data.map((v)=>v.variance),
		},
		bar
	
	variance.min = d3.min(variance.data)
	variance.max = d3.max(variance.data)
	
	chart.width = props.canvas.width - chart.marginLeft - chart.marginRight
	chart.height = props.canvas.height - chart.marginTop - chart.marginBottom
	chart.x = chart.marginLeft
	chart.y = props.canvas.height - chart.marginBottom
	
	bar = {
		width: chart.width / Array.from(new Set(years)).length,
		height: chart.height / globals.months.length
	}
	
	chart.xScale = d3.scaleBand().domain(years)
	chart.xScale.range([chart.x, chart.width + chart.x])
	
	chart.yScale = d3.scaleBand().domain(globals.months)
	chart.yScale.range([chart.marginTop, chart.height+chart.marginTop])
	
	chart.colorScale = d3.scaleQuantile().domain([variance.min + baseTemp, variance.max + baseTemp])
	chart.colorScale.range(globals.colors)
	
	chart.xAxis = d3.axisBottom(chart.xScale),
		chart.yAxis = d3.axisLeft(chart.yScale)
	
	chart.xAxis.tickValues(chart.xScale.domain().filter((v)=>v%10===0))
	
	if(d3.select('.axis').empty()){
		d3.select('.canvas').append('g')
			.attr('class', 'x axis')
			.attr('transform', `translate(0, ${chart.y})`)
			.call(chart.xAxis)
		
		d3.select('.canvas').append('g')
			.attr('class', 'y axis')
			.attr('transform', `translate(${chart.x}, ${0})`)
			.call(chart.yAxis)
	}
	
	var desc = props.desc.split(/\.\s+/)
	
	return (
		<g>
			<text
				x={250}
				y={chart.marginTop-40}
			>
				{desc[0] + '.'}
			</text>
			<text
				x={350}
				y={chart.marginTop-20}
			>
				{desc[1] + '.'}
			</text>
			{data.map((v,i)=>{
				return (
					<Rect
						className={'rect'}
						color={chart.colorScale(v.variance + baseTemp)}
						datum={v}
						handleMouse={props.handleMouse}
						height={bar.height+1}
						key={`${v.month}${v.year}`}
						width={bar.width+1}
						x={chart.marginLeft + (Math.floor(i/12) * bar.width)}
						y={((i % 12) * bar.height) + chart.marginTop}
					/>
				)
			})}
			<text
				transform={'translate(-480, 420), rotate(-90)'}
				x={chart.marginLeft}
				y={chart.y}
			>
				{'Month'}
			</text>
			<text
				transform={'translate(250, 50)'}
				x={chart.marginLeft}
				y={chart.y}
			>
				{'Year'}
			</text>
			<Legend
				scale={chart.colorScale}
				x={665}
				y={chart.y + 35}
			/>
		</g>
	)
}


class Rect extends React.Component {
	
	constructor(props){
		super(props)
		
		
		this.highlightColor = `hsl(${this.props.color}, 80%, 60%)`
		this.fillColor = `hsl(${this.props.color}, 60%, 50%)`
		const {x, y, height, width, className} = props
		this.attr = {x, y, height, width, className}
		
		this.state = {
			fill: this.fillColor,
			fontSize: 10,
			tag: {
				marginLeft: 10,
				marginTop: 4
			}
			
		}
		this.handleMouseOver = this.handleMouseOver.bind(this)
		this.handleMouseOut = this.handleMouseOut.bind(this)
	}
	
	shouldComponentUpdate(nextProps, nextState){
		return this.props === nextProps && this.state===nextState ? false : true
	}
	
	handleMouseOver(e){
		var pos = {x: e.pageX, y:e.pageY}
		this.props.handleMouse(true, pos, this.props.datum)
		this.setState({fill: this.highlightColor})
	}
	
	handleMouseOut(e){
		var pos = {x: e.pageX, y:e.pageY}
		this.props.handleMouse(false, pos, this.props.datum)
		this.setState({fill: this.fillColor})
	}
	
	render (){
		return (
			<g>
				<rect
					{...this.attr}
					fill={this.state.fill}
					onMouseOut={this.handleMouseOut}
					onMouseOver={this.handleMouseOver}
				/>
			</g>
		)
	}
}


function Tooltip(props){
	
	return (
		<div
			className='tt'
			style={{
				left: `${props.pos.x - 150}px`,
				top: `${props.pos.y - 100}px`,
				display: props.showTooltip ? 'block' : 'none'
			}}
		>
			<div
				className={'text-center'}
				style={{fontWeight: 'bold'}}
			>
				{`${globals.months[props.datum.month-1]}, ${props.datum.year}`}
			</div>
			<div>{`Base Temp: ${props.datum.baseTemp}`}</div>
			<div>{`Variance: ${props.datum.variance}`}</div>
			<hr style={{margin: '0', border: '1px solid black'}} />
			<div>{`Temp: ${(props.datum.baseTemp + props.datum.variance).toFixed(2)}`}</div>
		</div>
	)
}

function Legend(props) {
	
	var block = {
			width: 44,
			height: 20
		},
		colors = globals.colors,
		quantiles = [0].concat(props.scale.quantiles().map((v)=>Math.floor(v*10)/10))
	
	return (
		<g
			id='legend'
			x={props.x}
			y={props.y}
		>
			{quantiles.map((v,i)=>{
				
				return (
					<g key={v}>
						<rect
							fill={`hsl(${colors[i]}, 60%, 50%)`}
							height={block.height}
							width={block.width}
							x={props.x + (i*block.width)}
							y={props.y}
						/>
						<text
							style={{
								fill: 'black',
								fontSize: '10px',
								fontFamily: 'monospace'
							}}
							x={props.x + (i*block.width)}
							y={props.y+30}
						>
							{v}
						</text>
					</g>
				)
			})}
		</g>
	)
	
}


window.onload = function(){
	console.log('Window Loaded')
	ReactDOM.render(<App />, document.getElementById('root'))
}

