import React from 'react'
import Home from './component/page/Home'
import Work1 from './component/page/Work1'
import Work2 from './component/page/Work2'
import Work3 from './component/page/Work3'
import Work4 from './component/page/Work4'
import Work5 from './component/page/Work5'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import 'normalize.css'

const App = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route path='/01' component={Work1}/>
			<Route path='/02' component={Work2}/>
			<Route path='/03' component={Work3}/>
			<Route path='/04' component={Work4}/>
			<Route path='/05' component={Work5}/>
		</Switch>
	</main>
)


export default App
