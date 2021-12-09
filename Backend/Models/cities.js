const db = require ( '../db/db');
const  mongoose  = db.mongoose;
const Schema =  db.Schema;
const PlaceSchema = require('./Places').schema


const CitySchema = new Schema({
    name:{
          type: String },
    image:{ 
        type: String },
    places: [PlaceSchema]
})

const City = mongoose.model('city', CitySchema);
module.exports = City