export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'
export const LOAD_TOPOJSON = 'LOAD_TOPOJSON'


export function loadTopoJson ({topoJson}) {
	return {
		type: LOAD_TOPOJSON,
		topoJson
	}
}


export function addRecipe ({ day, recipe, meal }) {
	return {
		type: ADD_RECIPE,
		recipe,
		day,
		meal,
	}
}

export function removeFromCalendar ({ day, meal }) {
	return {
		type: REMOVE_FROM_CALENDAR,
		day,
		meal,
	}
}
