import {createMuiTheme} from 'material-ui/styles'

const CustomTheme = createMuiTheme({
	typography: {
		fontFamily: 'DDINRegular',
		body1: {
			fontWeight: 700,
			fontSize: '10px'
		}
	},
	
	MuiAppBar: {
		root: {
			boxShadow: '0'
		}
	}
})

export default CustomTheme
