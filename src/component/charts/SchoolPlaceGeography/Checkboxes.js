import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {FormGroup, FormControlLabel} from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import ColorSet from './ColorSet'

const styles = {
	checkedA: {
		color: ColorSet[0]
	},
	checkedB: {
		color: ColorSet[1]
	},
	checkedC: {
		color: ColorSet[2]
	},
	
	form: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	label: {
		color: "#182026",
		fontSize: '9px',
		fontWeight: '700',
		textTransform: 'uppercase',
		letterSpacing: '2px',
		textAlign: 'left',
		marginTop: '10px',
	}
}

class Checkboxes extends React.Component {
	render() {
		const {classes, checked, handleChange, schools} = this.props
		return (
			<FormGroup row className={classes.form}>
				<FormControlLabel
					className={classes.label}
					control={
						<Checkbox
							checked={checked.elementary}
							onChange={handleChange('elementary')}
							classes={{
								checked: classes.checkedA,
							}}
							value="checkedA"
						/>
					}
					label={`Elementary School (${schools.elementary.length})`}
				/>
				<FormControlLabel
					className={classes.label}
					control={
						<Checkbox
							checked={checked.middle}
							onChange={handleChange('middle')}
							classes={{
								checked: classes.checkedB,
							}}
							value="checkedB"
						/>
					}
					label={`Middle School (${schools.middle.length})`}
				/>
				<FormControlLabel
					className={classes.label}
					control={
						<Checkbox
							checked={checked.high}
							onChange={handleChange('high')}
							classes={{
								checked: classes.checkedC,
							}}
							value="checkedC"
						/>
					}
					label={`High School (${schools.high.length})`}
				/>
			</FormGroup>
		);
	}
}

Checkboxes.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Checkboxes);