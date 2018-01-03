import React from "react"
import {Link} from "react-router-dom"
import {withStyles} from "material-ui/styles"
import Grid from "material-ui/Grid"
import Posts from "../../Posts"
import BodyFooter from "../assests/BodyFooter"
import SEO from "./SEO"

// const backgroundImage = require(`../images/background.jpg`)
// 	return <div style={{ backgroundImage: `url(${imageUrl})` }} />
// }

const styles = theme => ({
	page: {
		backgroundImage: `url(${process.env.PUBLIC_URL + "/background.jpg"})`,
		backgroundPosition: "center center",
		backgroundRepeat: "no-repeat",
		backgroundAttachment: "fixed",
		backgroundSize: "cover",
		width: "100vw",
		height: "100vh",
		overflow: "hidden",
		opacity: 1
	},
	introduction: {
		background: "black",
		padding: theme.spacing.unit * 6
	},
	main: {
		position: "relative",
		top: "50%",
		transform: "translateY(-50%)"
	},
	sitename: {
		marginBottom: theme.spacing.unit * 6
	},
	heading: {
		color: "#fff",
		opacity: "0.8",
		textTransform: "uppercase",
		letterSpacing: "3px",
		fontSize: "13px",
		fontWeight: "bold",
		marginBottom: theme.spacing.unit / 2,
		transition: "all .5s",
		"&:hover": {
			opacity: 0.5
		}
	},
	subheading: {
		color: "#fff",
		opacity: "0.3",
		textTransform: "uppercase",
		letterSpacing: "3px",
		fontSize: "11px",
		fontWeight: "bold"
	},
	
	title: {
		display: "block",
		fontFamily: "DDINRegular",
		color: "#fff",
		fontWeight: "bold",
		fontSize: "21px",
		textTransform: "uppercase",
		letterSpacing: "4px",
		margin: "3px 0 3px 0"
	},
	
	subtitle: {
		fontFamily: "DDINRegular",
		color: "#fff",
		fontSize: "13px",
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: "2px",
		display: "block",
		textAlign: "left",
		opacity: 0.5
	},
	copyright: {
		fontFamily: "DDINRegular",
		color: "#fff",
		fontSize: "10px",
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: "2px",
		display: "block",
		textAlign: "left",
		opacity: 0.5
	},
	posts: {
		display: "flex",
		marginBottom: theme.spacing.unit * 2
	},
	number: {
		display: "inline-flex",
		alignItems: "center",
		opacity: 0.5,
		marginRight: theme.spacing.unit * 4
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
			<SEO
				title="Data Visualization Experiments"
				description="Code & Design by Sujin Lee"
				url="/"
			/>
			<div>
				<Grid className={classes.page}>
					<Grid container className={classes.main} spacing={24}>
						<Grid item md={1}/>
						<Grid item xs={12} md={5}/>
						<Grid item xs={12} md={6}>
							<div className={classes.introduction}>
								<div className={classes.sitename}>
									<h1 className={classes.title}>SUJIN'S Data Visualization Experiments </h1>
									<h2 className={classes.subtitle}>Built with React.js & d3.js</h2>
								</div>
								{postList}
							</div>
						</Grid>
					
					</Grid>
					<BodyFooter/>
				
				</Grid>
			
			</div>
		
		
		</div>
	
	)
}

export default withStyles(styles)(Home)
