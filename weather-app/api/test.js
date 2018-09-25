const request = require('request');
const bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mzc5NTMyMjksImlhdCI6MTUzNzM0ODQyOSwiaXNzIjoiaHR0cHM6Ly9zYnNzby5hbHR2LmNvbSIsInN1YiI6MTJ9.1u6R4kc_g_Q6_76NUvhDZhyIo_fROopUGa908l8CaW0';
request.debug = false;

/**
 * @param address
 * @param callback
 * @url https://developer.mapquest.com/documentation/geocoding-api/address/get/
 */


const athlete = (page) => (
	new Promise((resolve, reject) => {
		var timeStamp = new Date().getTime();
		request({
			url: `https://sbsso.altv.com/api/getNotificationFeed/${page}?time=${timeStamp}`,
			json: true,
			headers: {
				'Authorization': `Bearer ${bearer}`
			}
		}, (error, response, body) => {
			if(error) {

				reject('Unable to connect to the Strava Servers')

			} else if(response.statusCode !== 200) {

				reject(response.statusMessage)

			} else {

				resolve(body)

			}

		});
	})
)




const page = 0;
const Notices = (page) => {
	athlete(page).then(function(response) {
		let obj = {};

		const { list } = response;
		let result = list.filter(d => d.payload.type !== 'chat');
		let unread  = result.filter(res => !!res.read);

		console.log(response)
		process.exit();
		//console.log(unread.length)

		return Object.assign(obj, {
			list:result,
			pageCount: response.pageCount,
			unreadCount: unread.length
		});

	}).then(res => {

		if(res.list.length === 0) {

			//Notices();
			page++;
			Notices(page);
			return console.log('EMPTY' + page);
		}


		console.log(res.list[0].payload)

	}).catch(function(err){

		return console.log('ERROR => ', err)

	});
}

Notices(0);

//module.exports = {
//	athlete,
//};
