import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Posts from '../../Posts'
import BodyFooter from '../assests/BodyFooter'
import IntroCanvas from '../assests/IntroCanvas'

const styles = theme => ({
	page: {
		background: '#182026',
		width: '100vw',
		height: '100vh',
		overflow: 'hidden',
	},
	main: {
		position: 'relative',
		top: '50%',
		transform: 'translateY(-50%)',
		padding: theme.spacing.unit
	},
	sitename: {
		marginBottom: theme.spacing.unit * 6
	},
	heading: {
		color: '#fff',
		opacity: '0.8',
		textTransform: 'uppercase',
		letterSpacing: '3px',
		fontSize: '13px',
		fontWeight: 'bold',
		marginBottom: theme.spacing.unit / 2
	},
	subheading: {
		color: '#fff',
		opacity: '0.3',
		textTransform: 'uppercase',
		letterSpacing: '3px',
		fontSize: '11px',
		fontWeight: 'bold',
	},
	
	title: {
		display: 'block',
		fontFamily: 'DDINRegular',
		color: "#fff",
		fontWeight: 'bold',
		fontSize: '21px',
		textTransform: 'uppercase',
		letterSpacing: '4px',
		margin: '3px 0 3px 0'
	},
	
	subtitle: {
		fontFamily: 'DDINRegular',
		color: "#fff",
		fontSize: '13px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: '2px',
		display: 'block',
		textAlign: 'left',
		opacity: 0.5
	},
	copyright: {
		fontFamily: 'DDINRegular',
		color: "#fff",
		fontSize: '10px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: '2px',
		display: 'block',
		textAlign: 'left',
		opacity: 0.5
	},
	posts: {
		display: 'flex',
		marginBottom: theme.spacing.unit * 2,
	},
	number: {
		display: 'inline-flex',
		alignItems: 'center',
		opacity: 0.5,
		marginRight: theme.spacing.unit * 4,
	}
})


const Home = (props) => {
	const {classes} = props
	const postList = Posts.map((post, i) => (
		<div key={i} className={classes.posts}>
			<span className={classes.number}>{i + 1}</span>
			<Link key={post.postURL} to={post.postURL}>
				<h1 className={classes.heading}>
					{post.title} <span className={classes.subheading}/>
				</h1>
				<span className={classes.subheading}>{post.chartType} </span>
			</Link>
		</div>
	))
	
	
	return (
		<div className={classes.page}>
			<Grid className={classes.page}>
				<Grid container className={classes.main} spacing={24}>
					<Grid item md={1}/>
					<Grid item xs={12} md={5}>
						<IntroCanvas />
					</Grid>
					<Grid item xs={12} md={5}>
						<div className={classes.main}>
							<div className={classes.sitename}>
								<h1 className={classes.title}>Data Visualization Experimentals </h1>
								<h2 className={classes.subtitle}>Built with React.js & d3.js</h2>
							</div>
							{postList}
						</div>
					</Grid>
					<Grid item md={1}/>
				</Grid>
			</Grid>
			<BodyFooter
				theme="dark"
			/>
		</div>
	
	)
}


export default withStyles(styles)(Home)
