const mongoose = require ("mongoose")
const Schema = mongoose.Schema;


const PlaceSchema = new Schema({
    name:{
        type: String },
    location:{
        type: String },
    image:{ 
        type: String },
    typeOfPlace:{
        type: String,
        enum:['Restaurant',"Hotel",'Place'] }
})

const Place = mongoose.model('place', PlaceSchema);
module.exports = Place