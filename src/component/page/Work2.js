import React from 'react'
import PropTypes from 'prop-types'
import TrafficLineGraph from '../charts/TrafficLineGraph/TrafficLineGraph'
import BodyHeader from '../assests/BodyHeader'
import BodyFooter from '../assests/BodyFooter'
import ChartInfo from '../assests/ChartInfo'
import Grid from 'material-ui/Grid'
import {Posts} from '../../Posts'


const Work2 = () => {
	const post = Posts[1]
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
        <Grid item md={3}/>
        <Grid item md={6}>
          <TrafficLineGraph/>
        </Grid>
        <Grid item md={3}/>
      </Grid>
	    <BodyFooter theme="light"/>
    </div>
  )
}

Work2.propTypes = {
}

export default Work2
