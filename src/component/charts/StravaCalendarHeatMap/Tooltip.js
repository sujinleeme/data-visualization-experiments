import React from 'react'
import * as Utils from "./Utils"

const Tooltip = (props) => {
	const {pos, showTooltip, records} = props
	
	const style = {
		tooltip: {
			display: showTooltip ? '' : 'none',
			opacity: showTooltip ? 1 : 0,
			transition: 'all 0.3s linear',
			zIndex: 9,
			width: 210,
			height: 100
		},
		day: {
			textTransform: 'uppercase',
			fontSize: '12.5px',
			fontWeight: 'bold',
			fill: '#8A9BA8',
			letterSpacing: '0.5px'
		},
		title: {
			textTransform: 'uppercase',
			fontSize: '12.5px',
			fontWeight: 'bold',
			letterSpacing: '0.5px',
			opacity: 0.95
			
		},
		desc: {
			textTransform: 'uppercase',
			fontSize: '12.5px',
			letterSpacing: '0.5px',
			opacity: 0.95
		}
	}
	
	
	const w = style.tooltip.width
	const h = style.tooltip.height
	const textNum = 4
	const textH = (h / textNum)
	
	
	return (
		<g transform={`translate(${pos.x}, ${pos.y})`} x={pos.x} y={pos.y} style={style.tooltip}>
			{records.length > 0 ?
				records.map((d, i) =>
					(
						<g key={d.start_date}>
							<rect rx="10" ry="10" x="0" y={(i - 1) * h} fill="#fff" width={w} height={h}></rect>
							<text style={style.day} x={textH} y={textH * -3 + (h * i)} dy=".3em">
								{d.month} {d.date} {d.day} {d.year}
							</text>
							<text style={style.title} x={textH} y={textH * -2 + (h * i)} dy=".3em">
								{Utils.truncate(d.name, 19)}
							</text>
							<text style={style.desc} x={textH} y={textH * -1 + (h * i)} dy=".3em">
								{Utils.meterToKilo(d.distance)}KM / {Utils.secondsToHms(d.moving_time)}
							</text>
						</g>)
				)
				:
				<g>
					<rect rx="10" ry="10" x="0" y="0" fill="#fff" width={w} height={h / 2}></rect>
					<text x={w / 2} y={h / 4} style={style.desc} textAnchor="middle" dy=".3em">No record</text>
				</g>
			}
		</g>
	
	)
}

export default Tooltip
