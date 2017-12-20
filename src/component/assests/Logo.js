import React from 'react'


const Logo = () => {
	const style = {
		container: {
			width: '80px',
			height: '50px'
		},
		
		logo: {
			position: 'absolute',
			display: 'block',
			margin: '0 auto'
		}
	}
	
	return (
		<div style={style.container}>
			<svg className="logo" style={style.container}>
				<circle id="path" cx="50%" cy="50%" r="9"
				        stroke="#182026" strokeWidth="2.3"
				        fill="#F7F7F9">
				</circle>
				<circle cx="27%" cy="20%" r="4"
				        stroke="#182026" strokeWidth="2.3"
				        fill="#F7F7F9">
				</circle>
			</svg>
		</div>
	)
}

export default Logo
