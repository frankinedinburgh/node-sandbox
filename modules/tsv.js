const request = require('request');
const fs = require('fs');
const path = require('path');


let page = 0;
const url = `https://sbsso.altv.com/api/getNotificationFeed/${page}?time=${ Date.now() }`;

//uri, opts, callback

const getNotifications = (page) => {
	return new Promise((resolve, reject) => {
		request({
			url: url,
			method: 'GET',
			json: true,
			auth: {
				bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzkxODU1NDEsImlhdCI6MTUzODU4MDc0MSwic3ViIjoxMn0.KpAy-0XMuax4ur1loB-lsRwoefkSCL5UhNaGnsvx6oI'
			}
		}, (error, response, body) => {
			//console.log('error:', error); // Print the error if one occurred
			//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			//console.log('body:', body.pageCount); // Print the HTML for the Google homepage.
			//
			if(error) {

				reject('Unable to connect to the Comtrade Servers', error)

			} else if(response.statusCode !== 200) {

				reject(response)

			} else {

				resolve(body)
			}
		});
	})
};

// https://sbsso.altv.com/api/getNotificationFeed/0?time=1538655369236
const pageList =  {
	notices: function() {
		getNotifications(0).then(function(res) {
			//console.log(res.pageCount)
			const {pageCount} = res;
			let count = 0;

			while(count <= pageCount) {

				getNotifications(count).then(function(res) {
					let { list } = res;
					list.map(d => {
						this.notifications.push(d)
					});

				}).catch(function(err) {
					console.log('unable to get notifications');
					//pageList;
					return console.log(err.statusCode)
				})

				count++;
				if(count > pageCount) {
					return this.notifications;
				}
			}
		}).catch(function(err) {
			console.log(err.statusCode)
			console.log(err.statusMessage)
		});
	}
}

const obj = {
	notifications: []
}


pageList.notices.call(obj);











