import React from "react"
import PropTypes from "prop-types"
import {withStyles} from "material-ui/styles"
import {CircularProgress} from "material-ui/Progress"
import {palette} from "../../style/Palette"


const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh"
    
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  }
})

function CircularIndeterminate(props) {
  const {classes} = props
  return (
    <div className={classes.container}>
      <CircularProgress className={classes.progress} size={50} style={{color: palette.pink}} thickness={10}/>
    </div>
  )
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CircularIndeterminate)
