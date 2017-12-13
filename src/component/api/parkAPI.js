const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

const opitons = {
	method: 'GET',
	url: 'http://api.data.go.kr/openapi/cty-park-info-std',
	headers: {
		'Accept': 'application/json',
		Authorization: process.env.OPEN_CLIENT_SECRET
	},
	form: {
		grant_type: 'client_credentials'
	},
	json: true
}



export const getAll = () =>
	fetch(opitons.url, {headers: opitons.headers})
		.then(res => res.json())
		.then(data => data)
