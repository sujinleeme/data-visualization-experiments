const request = require('request')
const express = require('express')
const rp = require('request-promise')
const fs = require('fs')
const errors = require('request-promise/errors')

const app = express()

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

const authOptions = {
	method: 'POST',
	url: 'https://accounts.spotify.com/api/token',
	headers: {
		Authorization:
		'Basic ' +
		new Buffer(client_id + ':' + client_secret).toString('base64')
	},
	form: {
		grant_type: 'client_credentials'
	},
	json: true
}

app.set('port', process.env.PORT || 3001)

app.all('/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	next()
})

app.get('/token', function (req, resp) {
	
	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			resp.json({token: body.access_token})
		}
	})
})

app.get('/related-artists/:id', function (req, resp) {
	let id = req.params.id
	rp.post(authOptions).then(function (res) {
		let token = res.access_token
		let options = {
			url: `https://api.spotify.com/v1/artists/${id}/related-artists`,
			headers: {
				'Authorization': 'Bearer ' + token
			},
			json: true
		}
		return options
	}).then((options) => {
		return rp.get(options)
	}).then((body) => resp.json(body))
})

app.get('/related-artists-all/:id/', function (req, resp) {
	let id = req.params.id
	let dataSet = {'links': []}
	let filterFalse = arr => arr.filter(val => val);
	console.log(`start id: ${id}`)
	rp.post(authOptions)
		.catch(errors.StatusCodeError, function (reason) {
			console.log('errors', reason.response.headers['retry-after'])
		})
		.then(function (res) {
			let token = res.access_token
			return token
		})
		.then((token) => getRelatedArtist(token, id, dataSet, 0)
			.then(res => new Promise((resolve) => res.links[0].map(value =>
				(getRelatedArtist(token, value.target, res, 1)
						.then((res) => new Promise((resolve) => setTimeout(resolve, 9000, res)))
						.then((res) => res.links[1].map(value => (
							getRelatedArtist(token, value.target, res, 2)
								.then(res => fs.writeFileSync('artistLinks.json',
									JSON.stringify(filterFalse([].concat(...res.links)), null, 2), 'utf-8'))
						)))
				))).then((res) => new Promise((resolve) => console.log('done')))
			)
		)
})


function getRelatedArtist(token, id, array, num) {
	const options = {
		url: `https://api.spotify.com/v1/artists/${id}/related-artists`,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		resolveWithFullResponse: true,
		json: true
	}
	return rp.get(options)
		.then((response) =>
			response.body.artists.map(value => ({
				group: num,
				target: value.id,
				source: id,
				name: value.name,
				image: value.images[0].url,
				url: value.external_urls.spotify
			})))
		.catch(errors.StatusCodeError, function (reason) {
			console.log('retry-after',
				reason.response.headers['retry-after'])
		})
		.then((response) => array.links.push(response))
		.then(() => new Promise(res => res(array)))
}

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'))
})