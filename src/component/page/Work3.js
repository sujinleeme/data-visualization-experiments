import React from 'react'
import SpotifyRelatedArtist from '../charts/SpotifyRelatedArtist/SpotifyRelatedArtist'
import BodyHeader from '../assests/BodyHeader'
import ChartInfo from '../assests/ChartInfo'
import BodyFooter from '../assests/BodyFooter'
import Posts from '../../Posts'
import Grid from 'material-ui/Grid'
import SEO from './SEO'


export default () => {
	const post = Posts[2]
	
	return (
		<div>
			<SEO
				title={post.title | `Data Visualization Experiments`}
				description="Sujin Lee"
				url="/#/03"
			/>
			<BodyHeader
				title={post.title}
			/>
			<ChartInfo
				type={post.chartType}
				source={post.source}
				sourceURL={post.sourceURL}
				githubURL={post.githubURL}
			/>
			<Grid container spacing={24}>
				<Grid item md={12}>
					<SpotifyRelatedArtist/>
				</Grid>
			</Grid>
			<BodyFooter theme="light"/>
		</div>
	)
}
