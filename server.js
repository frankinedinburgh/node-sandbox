const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000



const indexRoute = require('./routes/index')
const stravaRoute = require('./routes/strava')






/**
 * Index
 */
app.get('/', indexRoute);
app.get('/strava/', stravaRoute);




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
