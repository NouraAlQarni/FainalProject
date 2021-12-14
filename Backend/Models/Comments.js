const db = require ( '../db/db');
const  mongoose  = db.mongoose;
const Schema =  db.Schema;

const CommentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'},
    place:{
        type: Schema.Types.ObjectId,
        ref: 'place'},
    commentBody:{
          type: String },
})

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment