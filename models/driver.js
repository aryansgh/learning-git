const mongoose = require('mongoose');


// "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
//   },

//create geolocation schema 
const GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type:[Number],
        index: "2dsphere"
    }
});

//create driver schema
const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Name field is required']
    },
    rating: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    //add in geolocation
    //https://geojson.org/
    geometry: GeoSchema
},{ timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
