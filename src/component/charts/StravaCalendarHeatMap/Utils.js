const keyList = ['day', 'month', 'date', 'year', 'time', 'GMT', 'local']
export const getAllRecordsDates = (data) => {
	return [...data.map((d) =>
		Object.assign({},
			
			{
				name: d.name,
				distance: d.distance,
				moving_time: d.moving_time,
				average_speed: d.average_speed,
				start_date: d.start_date
			},
			...new Date(d.start_date).toString().split(' ').map((item, index) => (
				{[keyList[index]]: item}
			))))]
}
/*
obj.map(e => ({id: e.target, name: e.name, image: e.image, url: e.url, group: e.group}))
*/
export const getAllRecords = (data) =>
	[...data.map(e => (
		{
			
			'distance': e.distance,
			
			
		}
	
	
	
	))]

export const getAllDistance = (data) =>
	[...data.map(e => (
		e.distance
	))]


export const getDaysInMonth = (month, year) =>
	new Date(year, month, 0).getDate()


export const generateNumberArr = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start)

//2017/01
export const daysIntoYear = (date) => {
	//new Date(2016,0,1)
	return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}


export const daysOfYear = (year) => isLeapYear(year) ? 366 : 365

const isLeapYear = (year) => {
	return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}


export const meterToKilo = (meter) =>
	Math.round(meter*0.1)/100


export const secondsToHms = (d) => {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	
	return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}



export const truncate = (str, limit) => (
	(str.length < limit) ? str : str.substring(0, limit) + '...')

