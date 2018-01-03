import React from "react"
import {withStyles} from "material-ui/styles"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import {Link} from "react-router-dom"
import Logo from "./Logo"

const styles = theme => ({
	bar: {
		top: "0",
		background: "#F7F7F9",
		boxShadow: "none",
		paddingTop: theme.spacing.unit * 6,
		paddingBottom: theme.spacing.unit * 6
	},
	
	sitename: {
		fontFamily: "DDINRegular",
		color: "#182026",
		fontSize: "13px",
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: "2px",
		display: "block",
		textAlign: "left",
		opacity: 0.7,
		margin: "3px 0 6px 3px"
	},
	
	title: {
		display: "block",
		fontFamily: "DDINRegular",
		color: "#182026",
		fontWeight: "bold",
		fontSize: "21px",
		textTransform: "uppercase",
		letterSpacing: "3px",
		margin: "3px 0 3px 0"
	}
})

const BodyHeader = (props) => {
	const {classes, title} = props
	return (
		
		<div className={classes.root}>
			<AppBar position="static" color="default" className={classes.bar}>
				<Toolbar>
					<Link to='/'>
						<Logo/>
					</Link>
					<div>
						<h1 className={classes.sitename}>
							Sujin's Data Visualization Experiments
						</h1>
						<h1 className={classes.title}>
							{title}
						</h1>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default withStyles(styles)(BodyHeader)
