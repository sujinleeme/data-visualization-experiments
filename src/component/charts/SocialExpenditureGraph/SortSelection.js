import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import classNames from 'classnames'

import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'

const styles = theme => ({
  root: {
    background: '#F7F7F9'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  colorPrimary: {
    color: '#0efda6',
  },
  selectors: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '25px'
  }
})

class SortSelection extends React.Component {
  
  render () {
    const {classes, handleChange, handleYearChange, sortTypeVal, yearIndex, error, caps, ...inputProps} = this.props
    return (
      <div className={classes.selectors}>
        <form className={classes.container} autoComplete="off">
          
          
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="">Filter</InputLabel>
            <Select
              value={sortTypeVal}
              onChange={handleChange('sortType')}
            >
              <MenuItem className={classes.root} value={1}>Lowest</MenuItem>
              <MenuItem value={2}>Highest</MenuItem>
              <MenuItem value={3}>Alphabetize</MenuItem>
            </Select>
          </FormControl>
        </form>
        <form className={classes.container} autoComplete="off">
          
          
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="">Year</InputLabel>
            <Select
              value={yearIndex}
              onChange={handleYearChange}
            >
              <MenuItem value={1}>2013</MenuItem>
              <MenuItem value={2}>2014</MenuItem>
              <MenuItem value={3}>2015</MenuItem>
              <MenuItem value={4}>2016</MenuItem>
            </Select>
          </FormControl>
        </form>
      </div>
    
    )
  }
}

SortSelection.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SortSelection)


