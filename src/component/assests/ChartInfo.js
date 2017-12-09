import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {Link} from 'react-router-dom'
import Toolbar from 'material-ui/Toolbar'

const styles = theme => ({
		bar: {
			top: '0',
			background: '#F7F7F9',
			boxShadow: 'none',
			paddingTop: theme.spacing.unit * 6,
			paddingBottom: theme.spacing.unit * 6,
		},
		container: {
			marginLeft: '80px',
			maxWidth: '50%',
			paddingBottom: theme.spacing.unit * 6,
		},
		
		info: {
			color: "#182026",
			fontSize: '13px',
			fontWeight: 'bold',
			textTransform: 'uppercase',
			letterSpacing: '2px',
			display: 'block',
			opacity: 0.5,
			textAlign: 'left',
			marginTop: '10px',
		},
		
		sourcelink: {
			borderBottom: '1px dotted #182026'
		}
	}
)

const ChartInfo = (props) => {
	const {classes} = props
	return (
		<Toolbar>
			<div className={classes.container}>
				<span className={classes.info}>
					chart type : {props.type}
				</span>
				<span className={classes.info}>
					data source : <a href={props.sourceURL} className={classes.sourcelink} target="_blank">{props.source}</a>
				</span>
				<span className={classes.info}>
					source code : <a href={props.githubURL} className={classes.sourcelink} target="_blank">github</a>
				</span>
			</div>
		</Toolbar>
	)
}


export default withStyles(styles)(ChartInfo)
