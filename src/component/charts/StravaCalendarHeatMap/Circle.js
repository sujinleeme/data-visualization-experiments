import React from 'react'

export default class Circle extends React.Component {
	
	constructor(props) {
		super(props)
		
		this.handleMouseHoverOut = this.handleMouseHoverOut.bind(this)
		this.handleMouseHoverOver = this.handleMouseHoverOver.bind(this)
	}
	
	handleMouseHoverOut(e) {
		const {cx, cy, records, chart} = this.props
		let pos = (cx >= chart.width-(chart.margin*2)) ?
			{x: cx-200, y: cy-60} : {x: cx+10, y: cy+10}
		this.props.handleMouse(false, pos, records)
	}
	
	handleMouseHoverOver(e) {
		const {cx, cy, records, chart} = this.props
		let pos = (cx >= chart.width-(chart.margin*2)) ?
			{x: cx-200, y: cy-60} : {x: cx+10, y: cy+10}
		this.props.handleMouse(true, pos, records)
	}
	
	
	render() {
		const {cx, cy, r, records, colorScale} = this.props
		const total = records.reduce((prev,next) => prev + next.distance,0);
		const color = records.length >=  1  ? colorScale(total) : '#EEEEEE'
		
		return (
			<g className="record" style={{pointer: "cursor"}}
				onMouseOut={this.handleMouseHoverOut}
				onMouseOver={this.handleMouseHoverOver}>
					<circle
						cx={cx}
						cy={cy}
						r={r}
						fill={color}
						opacity="0.95"
					/>
			</g>
		)
	}
}




