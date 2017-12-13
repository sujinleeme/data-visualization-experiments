import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'



import {
	ADD_RECIPE,
	REMOVE_FROM_CALENDAR,
	LOAD_TOPOJSON
} from './actions'


const initialGeographyState = {
	topoJson: null,
	cityNames: null
}


function geography (state = initialGeographyState, action) {
	const { day, recipe, meal } = action
	
	switch (action.type) {
		
		case LOAD_TOPOJSON :
			return {
				...state,
				topoJson: action.json
			}
			
		case ADD_RECIPE :
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: recipe.label,
				}
			}
		case REMOVE_FROM_CALENDAR :
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: null,
				}
			}
		default :
			return state
	}
}


export default combineReducers({
	routing: routerReducer,
	geography
})
