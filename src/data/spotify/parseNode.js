const fs = require('fs')
let obj

// Read the file and send to the callback
fs.readFile('artistLinks.json', handleFile)

// Write the callback function
function handleFile(err, data) {
	if (err) throw err
	obj = JSON.parse(data)
	const result = obj.map(e => ({id: e.target, name: e.name, image: e.image, url: e.url, group: e.group}))
	const newResult = removeDuplicateNode(result)
	fs.writeFile('artistNodes.json', JSON.stringify(newResult, null, 2), function (err) {
		if (err) return console.log(err);
		console.log('success save file');
	});
}


function removeDuplicateNode(arr) {
	return arr.filter((elem, index, self) => self.findIndex((t) => {
		return (t.id === elem.id)
	}) === index)
}
