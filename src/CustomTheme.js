import { createMuiTheme } from 'material-ui/styles'
import { lightBlue, green } from 'material-ui/colors'

const CustomTheme = createMuiTheme({
  MuiAppBar: {
    root: {
      boxShadow: '0'
    },
  },
})

export default CustomTheme
