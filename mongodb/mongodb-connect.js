'use strict';
const _ = require('lodash');
const { MongoClient, ObjectID, Logger } = require('mongodb');
//const url = 'mongodb://localhost:27017';
//const url = `mongodb://fpadmin:LV2asAK4ou5CMNT5@cluster2-shard-00-00-14wui.mongodb.net:27017`;
const url = `mongodb://fpadmin:LV2asAK4ou5CMNT5@cluster2-shard-00-00-14wui.mongodb.net:27017,cluster2-shard-00-01-14wui.mongodb.net:27017,cluster2-shard-00-02-14wui.mongodb.net:27017/fireproof`;
const dbName = 'fireproof';
const d = new Date();
const mongoClient = new MongoClient(url, {
	useNewUrlParser: true,
	server: {
		sslValidate:true,
		ssl: true,
		replicaSet: 'Cluster2-shard-0',
		authSource: 'admin'
	}
});


//?ssl=true&replicaSet=Cluster2-shard-0&authSource=admin

//Logger.setLevel('debug')
const findOneAndDeleteCallback = (error, result) => {
	if(error) {
		return console.log(JSON.stringify(error, null, 4))
	}

	if(result.ok === 1 && !_.isEmpty(result.value)) {
		console.log(JSON.stringify(result.value, null, 4))
		return console.log('Successfully Deleted')
	}
	console.log('No more to delete')

};

const insertOneWriteOpCallback = (error, {result, ops}) => {
	if(error) {
		console.log(JSON.stringify(error, null, 4));
		return console.log(error.message)
	}

	let createdAt = ObjectID(ops[0]._id).getTimestamp();
	createdAt = createdAt.toDateString();
	return console.log(createdAt)
}

// Connect to the Database
mongoClient.connect((err, client) => {
	if(err) {
		return console.log(err)
	}
	const db = client.db('fireproof');
	console.log('Connected to the database')
	db.collection('companies').find().toArray().then(docs => {
		console.log('Todos');
		console.log(JSON.stringify(docs , null, 4));
	}, (err) => {
		console.log('unable to fetch companies');
	});

	client.close();
;})



process.on('uncaughtException', function (err) {
	console.error(err.stack);
	console.log("Node NOT Exiting...");
});





// mongodb://<user>:<password>@<url>:<port>/<database>



const config = [{
	"hosts":["cluster2-shard-00-00-14wui.mongodb.net:27017","cluster2-shard-00-01-14wui.mongodb.net:27017","cluster2-shard-00-02-14wui.mongodb.net:27017"],
	"setName":"Cluster2-shard-0",
	"setVersion":4,
	"ismaster":true,
	"secondary":false,
	"primary":"cluster2-shard-00-00-14wui.mongodb.net:27017",
	"me":"cluster2-shard-00-00-14wui.mongodb.net:27017",
	"electionId":"7fffffff000000000000000d",
	"lastWrite":{
		"opTime":{
			"ts":"6637050496227999745","t":13
		},
		"lastWriteDate":"2018-12-20T12:25:39.000Z"
	},
	"maxBsonObjectSize":16777216,
	"maxMessageSizeBytes":48000000,
	"maxWriteBatchSize":1000,
	"localTime":"2018-12-20T12:25:44.589Z",
	"maxWireVersion":5,
	"minWireVersion":0,
	"readOnly":false,
	"ok":1
}]
