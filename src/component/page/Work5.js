import React from 'react'
import PropTypes from 'prop-types'
import StravaCalendarHeatMap from '../charts/StravaCalendarHeatMap/StravaCalendarHeatMap'
import BodyHeader from '../assests/BodyHeader'
import BodyFooter from '../assests/BodyFooter'
import ChartInfo from '../assests/ChartInfo'
import {Posts} from '../../Posts'
import Grid from 'material-ui/Grid'

const Work5 = () => {
	const post = Posts[4]
	return (
		<div>
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
				</Grid>
			</Grid>
			<BodyFooter theme="light"/>
		</div>
	)
}

Work5.propTypes = {
}

export default Work5




