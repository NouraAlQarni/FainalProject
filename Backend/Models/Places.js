
const db = require ( '../db/db');
const  mongoose  = db.mongoose;
const Schema =  db.Schema;
const PlaceSchema = new Schema({
    name:{
        type: String },
    location:{
        type: String },
    image:{ 
        type: String },
    typeOfPlace:{
        type: String,
        enum:['Restaurant',"Hotel",'Place'] },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'}]
})

const Place = mongoose.model('place', PlaceSchema);
module.exports = Place