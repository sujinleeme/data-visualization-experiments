const fs = require('fs')
const strava = require('strava-v3');
strava.athlete.listActivities({
	'per_page': 200
}, (err, payload, limits) => {
	if (!err) {
		console.log('start read save file');
		fs.writeFile('records.json', JSON.stringify(payload, null, 2), function (err) {
			if (err) return console.log(err);
			console.log('success save file');
		});
	}
	else {
		console.log(err);
	}
});