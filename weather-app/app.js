require('dotenv').load();
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const forecast = require('./forecast/forecast');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'enter an address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;




geocode.geocodeAddress(argv.address, (error, response) => {
    if(error) {
        console.log(JSON.stringify(error, null, 4));
        return;
    }

    const {latitude, longitude, address} = response;
    forecast(latitude, longitude, (error, response) => {
        if(error) {console.log(JSON.stringify(error, null, 4));
            return;
        }
        const {temperature, apparentTemperature} = response.currently;
        let str = `Currently in ${address} it is ${temperature}`;
        if(temperature !== apparentTemperature) {
            str = `Currently in ${address} it is ${temperature} but feels like ${apparentTemperature}`;
        }

        console.log(str);

    });

});




