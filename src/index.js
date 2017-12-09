import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter} from 'react-router-dom'
import CustomTheme from './CustomTheme'

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

ReactDOM.render(
	<BrowserRouter>
		<MuiThemeProvider theme={CustomTheme}>
			<App/>
		</MuiThemeProvider>
	
	</BrowserRouter>,
	
	document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
	module.hot.accept();
}
