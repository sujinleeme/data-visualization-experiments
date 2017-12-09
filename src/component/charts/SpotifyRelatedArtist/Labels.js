import React from 'react'
import * as d3 from "d3";

class Label extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hover: false
		};
	}
	
	triggerSuccess() {
		this.setState({
			hover: !this.state.hover
		})
		console.log(this.state.hover)
	}
	
	componentDidMount() {
		d3.select(this.ref).data([this.props.node]);
	}
	
	render() {
		return (
			<a xlinkHref={this.props.node.url} target="_blank">
				<text className="label"
				      fontSize={!this.state.hover ?
					      "13px" : "24px"
				      }
				      fontWeight={!this.state.hover ?
					      "normal" : "bolder"
				      }
				      ref={(ref: SVGTextElement) => this.ref = ref}
				      onMouseOver={this.triggerSuccess.bind(this)}
				      onMouseLeave={this.triggerSuccess.bind(this)}
				>
					{this.props.node.name}
				</text>
			</a>
		)
	}
}

export default class Labels extends React.Component {
	
	render() {
		const labels = this.props.nodes.map((node, index) => {
			return (
				<Label key={index} node={node}
				/>
			);
		});
		
		return (
			<g className="labels">
				{labels}
			</g>
		);
	}
}