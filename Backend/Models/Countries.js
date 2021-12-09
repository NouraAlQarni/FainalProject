const db = require ( '../db/db');
const  mongoose  = db.mongoose;
const Schema =  db.Schema;

const CitySchema = require('./cities').schema;


const CountrySchema = new Schema({
    name:{
          type: String },
    image:{ 
        type: String },
    cities: [CitySchema]
})

const Country = mongoose.model('country', CountrySchema);
module.exports = Country