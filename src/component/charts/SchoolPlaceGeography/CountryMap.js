import React, {Component} from "react"
import * as d3 from "d3"
import ColorSet from "./ColorSet"
import {withStyles} from "material-ui/styles"
import Checkboxes from "./Checkboxes"

const styles = {
  marker: {
    "transition": "opacity .5s all"
  }
}

class CountryMap extends Component {
  
  get transform() {
    const {x, y, zoomTransform, zoomType} = this.props
    let transform = ""
    if (zoomTransform && zoomType === "scale") {
      transform = `translate(${x + zoomTransform.x}, ${y + zoomTransform.y}) scale(${zoomTransform.k})`
    }
    return transform
  }
  
  projection() {
    const {width, height} = this.props
    return d3.geoMercator()
      .center([128, 36])
      .scale(7000)
      .translate([width / 2, height / 2])
  }
  
  render() {
    
    const {classes, width, height, mapData, schools, checked} = this.props
    
    return (
      
      <div>
        
        {schools.elementary ?
          <div>
            <Checkboxes
              handleChange={this.props.handleChange}
              checked={checked}
              schools={schools}
            /></div> : null}
        
        <svg className="map" width={width} height={height} viewBox={`0 0 ${width} ${height}`} ref="svg">
          
          <g transform={this.transform}>
            <g className="cities">
              {
                mapData.map((d, i) => (
                  <path
                    key={`path-${i}`}
                    d={d3.geoPath().projection(this.projection())(d)}
                    className="country"
                    fill={`rgba(194,200,225,${1 / mapData.length * i})`}
                    stroke="#fff"
                    fillOpacity={0.5}
                    strokeWidth={0.5}
                  />
                ))
              }
            </g>
            
            
            {schools.elementary ?
              schools.elementary.map((d, i) => (
                <g className="markers" key={`elementary-${i}`}>
                  <circle
                    cx={this.projection()([Number(d["경도"]), Number(d["위도"])])[0]}
                    cy={this.projection()([Number(d["경도"]), Number(d["위도"])])[1]}
                    r={1.5}
                    fill={ColorSet[0]}
                    className={classes.marker}
                    fillOpacity={checked.elementary ? 0.5 : 0}
                  />
                </g>
              ))
              : null}
            
            {schools.middle ?
              schools.middle.map((d, i) => (
                <g className="markers" key={`elementary-${i}`}>
                  <circle
                    cx={this.projection()([Number(d["경도"]), Number(d["위도"])])[0]}
                    cy={this.projection()([Number(d["경도"]), Number(d["위도"])])[1]}
                    r={1.5}
                    fill={ColorSet[1]}
                    className={classes.marker}
                    fillOpacity={checked.middle ? 0.5 : 0}
                  />
                </g>
              ))
              : null}
            
            {schools.high ?
              schools.high.map((d, i) => (
                <g className="markers" key={`elementary-${i}`}>
                  <circle
                    cx={this.projection()([Number(d["경도"]), Number(d["위도"])])[0]}
                    cy={this.projection()([Number(d["경도"]), Number(d["위도"])])[1]}
                    r={1.5}
                    fill={ColorSet[2]}
                    className={classes.marker}
                    fillOpacity={checked.high ? 0.5 : 0}
                  />
                </g>
              ))
              : null}
          </g>
        
        </svg>
      </div>
    )
  }
}

export default withStyles(styles)(CountryMap)
