import React from 'react'
import Helmet from 'react-helmet'

const baseURL = 'https://sujinleeme.github.io/data-visualization-experiments'
const SEO = ({title, image, url, description}) => (
	<Helmet
		title="Data Visualization Experiments"
		meta={[
			{property: "og:type", content: "article"},
			{property: "og:description", content: description},
			{property: "og:title", content: title},
			{property: "og:url", content: baseURL+url},
			{property: "fb:app_id", content: "862956023892636"},
		]}
	/>
)


export default SEO
