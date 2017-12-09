import React from 'react'
import * as d3 from 'd3'

export default class Links extends React.Component {
	
	render() {
		const links = this.props.links.map((link, index) => {
			return <Link key={index} link={link}/>;
		});
		
		return (
			<g className="links">
				{links}
			</g>
		)
	}
}


class Link extends React.Component {
	componentDidMount() {
		d3.select(this.ref).data([this.props.link]);
	}
	
	render() {
		return (
			<line className="link" strokeWidth="0.5px" stroke="#dadada" ref={(ref: SVGLineElement) => this.ref = ref}
			/>
		)
	}
}

