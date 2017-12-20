import React from 'react'
import BodyHeader from '../assests/BodyHeader'
import BodyFooter from '../assests/BodyFooter'
import ChartInfo from '../assests/ChartInfo'
import Posts from '../../Posts'
import Grid from 'material-ui/Grid'
import SchoolPlaceGeography from '../charts/SchoolPlaceGeography/SchoolPlaceGeography'
import SEO from './SEO'

export default () => {
	const post = Posts[4]
	return (
		<div>
			<SEO
				title={post.title | `Data Visualization Experiments`}
				description="Sujin Lee"
				url="/#/05"
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
					<SchoolPlaceGeography />
				</Grid>
			</Grid>
			<BodyFooter theme="light"/>
		</div>
	)
}

