import React, {Component} from "react"
import "./CoverImage.css"

class CoverImage extends Component {
  constructor(props) {
    super(props)
    this.coverImageHd = null
  }
  
  componentDidMount() {
    
    const hdLoaderImg = new Image()
    
    hdLoaderImg.src = this.props.srcLoaded
    
    hdLoaderImg.onload = () => {
      this.coverImageHd.setAttribute(
        "style",
        `background-image: url('${this.props.srcLoaded}')`
      )
      this.coverImageHd.classList.add("cover-image-fade-in")
    }
    
  };
  
  render() {
    return (
      <div className="cover-image-container">
        
        <div
          className="cover-image-loaded"
          ref={imageLoadedElem => this.coverImageHd = imageLoadedElem}>
        </div>
        <div
          className="cover-image-preload"
          style={{backgroundImage: `url('${this.props.srcPreload}')`}}>
        </div>
      
      </div>
    )
  }
}

export default CoverImage
