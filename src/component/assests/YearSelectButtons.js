import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import KeyboardBackspaceIcon from 'material-ui-icons/KeyboardBackspace'
import { Link } from 'react-router-dom'
import { Button } from 'material-ui'

const styles = theme => ({
  root: {
    marginRight: '8px',
    marginTop: '8px',
    backgroundColor: theme.palette.background.A300,
  },
  active: {
    background: '#4FC3F7 !important',
  },
})

const years = ['2013', '2014', '2015', '2016']

class YearSelectButtons extends React.Component {
  
  render () {
    const {classes, handleChange, currentYear} = this.props
    return (
      
      <div className={classes.root}>
        {years.map(year => (
          <Button key={year}
                  raised className={currentYear === year ? classes.active : ''}
                  label={year}
                  classes={{
                    root: classes.root,
                  }}
                  onClick={handleChange}
          >
            {year}
          </Button>
        ))}
      
      
      </div>
    )
  }
  
  //)
}

YearSelectButtons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(YearSelectButtons)
