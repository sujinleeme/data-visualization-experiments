import React from 'react'
import PropTypes from 'prop-types'
import SpotifyRelatedArtist from '../charts/SpotifyRelatedArtist/SpotifyRelatedArtist'
import BodyHeader from '../assests/BodyHeader'
import ChartInfo from '../assests/ChartInfo'
import BodyFooter from '../assests/BodyFooter'
import {Posts} from '../../Posts'

import Grid from 'material-ui/Grid'

const Work3 = () => {
	const post = Posts[2]
	
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
          <SpotifyRelatedArtist/>
        </Grid>
      </Grid>
      <BodyFooter theme="light"/>
    </div>
  )
}

Work3.propTypes = {
}

export default Work3
