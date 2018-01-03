import React from "react"
import PropTypes from "prop-types"
import {withStyles} from "material-ui/styles"
import {LinearProgress} from "material-ui/Progress"

const styles = {
	root: {
		width: "100%",
		marginTop: 30
	}
}

const LoadingProgressBar = (props) => {
	const {classes} = props
	return (
		<div className={classes.root}>
			<LinearProgress/>
			<br/>
			<LinearProgress color="accent"/>
		</div>
	)
}

LoadingProgressBar.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LoadingProgressBar)