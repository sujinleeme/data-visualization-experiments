import React from 'react'
import {withStyles} from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import classNames from 'classnames/bind'

const styles = theme => ({
	bar: {
		boxShadow: 'none',
		paddingBottom: theme.spacing.unit * 6,
		position: 'absolute',
		width: '100%',
	},
	dark: {
		color: "#F7F7F9",
		background: '#182026',
	},
	light: {
		color: "#182026",
		background: '#F7F7F9'
	},
	sitename: {
		fontFamily: 'DDINRegular',
		fontSize: '10px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: '2px',
		display: 'block',
		opacity: 0.7,
		textAlign: 'center'
	},
	socials: {
		fontFamily: 'DDINRegular',
		fontSize: '10px',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: '2px',
		display: 'block',
		opacity: 0.3,
		textAlign: 'center',
	},
	social: {
		opacity: 0.3,
		transition: 'all .5s'
	}
})

const BodyFooter = ({classes, theme}) => {
	const socials = {
		'website': 'https://www.sujinlee.me',
		' github': 'https://github.com/sujinleeme',
		' twitter': 'https://twitter.com/sujinleeme',
		' instagram': 'https://www.instagram.com/sujinlee.me/',
		' facebook': 'https://www.facebook.com/sujinlee.me'
	}
	
	const socialLinks = Object.keys(socials).map((key, i) => (
		<a key={i} href={socials[key]} target="_blank">
			<span className="social">{key}</span><span> / </span>
		</a>
	))
	
	return (
		<div className={classNames(classes.bar, (theme === 'light' ? classes.light : classes.dark))}>
			<AppBar position="static" color="default"
			        className={classNames(classes.bar, (theme === 'light' ? classes.light : classes.dark))}>
				<h1 className={classNames(classes.sitename, (theme === 'light' ? classes.light : classes.dark))}>
					2017. code & design by Sujin Lee. All Rights Reserved.
				</h1>
				<h1 className={classNames(classes.socials, (theme === 'light' ? classes.light : classes.dark))}>
					Follow me on : {socialLinks}
				</h1>
			</AppBar>
		</div>
	)
}


export default withStyles(styles)(BodyFooter)
