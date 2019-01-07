const _ = require('lodash')
const { Pool, Client } = require('pg')

// http://127.0.0.1:58833/browser/

// pools will use environment variables
// for connection information

//.env file
//PGHOST='localhost'
//PGUSER=process.env.USER
//PGDATABASE=process.env.USER
//PGPASSWORD=null
//PGPORT=5432


//postgres://fpdevadmin:VwTnAZv57SXK98Gc@dev-fireproof.cdujdhpxflbc.eu-west-1.rds.amazonaws.com/fireproof

const pool = new Pool({
	connectionString: 'postgres://fpdevadmin:VwTnAZv57SXK98Gc@dev-fireproof.cdujdhpxflbc.eu-west-1.rds.amazonaws.com/fireproof'
})


// SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'
// SELECT * FROM users
// SELECT * FROM app_domains
// SELECT * FROM app_domain_schemas
// SELECT * FROM user_invites
// SELECT * FROM login_history
// SELECT * FROM pwd_auth
// SELECT * FROM pwd_reqs
// SELECT * FROM token_auth

pool.query('SELECT * FROM pwd_auth', (err, res) => {
	if(err) {
		return console.log(err)
	}

	//console.log(_.keys(res));

	//console.log(JSON.stringify(res, null, 4))
	console.log(JSON.stringify(res.rows, null, 4))
	//console.log(res.fields.map(f => f.name))
	console.log('Connected to the Database')
	pool.end()
})


