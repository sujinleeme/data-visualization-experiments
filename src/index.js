import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter} from 'react-router-dom'

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store, {history} from './modules/store';


import CustomTheme from './CustomTheme'


import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';


ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<MuiThemeProvider theme={CustomTheme}>
				<App/>
			</MuiThemeProvider>
		</ConnectedRouter>
	</Provider>,
	
	document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
	module.hot.accept();
}
