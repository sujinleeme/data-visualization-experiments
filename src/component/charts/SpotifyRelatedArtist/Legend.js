import React from 'react'

const Legend = (props) => {
	
	const Legend = props.colors.map((color, i) => (
		<rect
			key={color}
			fill={color}
			height={14}
			width={20}
			x={(1000) + (i * 20)}
			y={0}/>
	))
	
	return (
	<g className="legend">
		{Legend}
	</g>
	
	)
}

export default Legend
