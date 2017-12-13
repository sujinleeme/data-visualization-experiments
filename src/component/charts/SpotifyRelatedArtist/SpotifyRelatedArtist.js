import React, { Component } from 'react'
import * as d3 from 'd3'
import ChartCanvas from './ChartCanvas'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
	info: {
		paddingBottom: theme.spacing.unit * 6,
	},
	
	title: {
		color: "#182026",
		fontSize: '13px',
		textTransform: 'uppercase',
		letterSpacing: '2px',
		display: 'block',
		opacity: 0.9,
		textAlign: 'center',
		marginTop: '10px',
	}
});

class SpotifyRelatedArtist extends Component {
	constructor() {
		super()
		this.state = {
			nodes: [],
			links: [],
		}
		
	}
	
	
	componentWillMount() {
		d3.queue()
			.defer(d3.json, 'data/spotifyBTS/artistNodes.json')
			.defer(d3.json, 'data/spotifyBTS/artistLinks.json')
			.await((error, nodes, links) => {
				this.setState({
					nodes,
					links
				})
			})
	}
	
	render() {
		const {nodes, links} = this.state
		const { classes } = this.props
		
		return (
			<div>
				{nodes.length > 1 && links.length > 1 ?
					<div>
						<div className={classes.info}>
							<h1 className={classes.title}>
								Related Artists &middot; {nodes.length} </h1>
							<h1 className={classes.title}>
								Artists's Connections &middot; {links.length} </h1>
						</div>
						
						<ChartCanvas
							width={1200} height={1500} nodes={nodes} links={links}
							zoomType="scale"
						/>
					</div>
					: null}
			</div>
		)
	}
}



export default withStyles(styles)(SpotifyRelatedArtist)
