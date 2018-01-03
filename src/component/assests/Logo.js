import React from "react"

const Logo = () => {
	const style = {
		container: {
			width: "80px",
			height: "50px"
		},
		
		logo: {
			position: "absolute",
			display: "block",
			margin: "0 auto"
		}
	}
	const pink = '#E947F5',
		yellow = '#F5F652'
	return (
		<div style={style.container}>
			<svg className="logo" style={style.container}>
				<circle id="path" cx="50%" cy="50%" r="13"
				        // stroke="#182026" strokeWidth="2.3"
				        opacity={0.7}
				        fill={pink}>
				</circle>
				<circle cx="30%" cy="50%" r="13"
				        // stroke="#182026" strokeWidth="2.3"
				        opacity={0.7}
				        fill={yellow}>
				</circle>
			</svg>
		</div>
	)
}

export default Logo
