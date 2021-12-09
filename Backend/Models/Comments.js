const mongoose = require ("mongoose")
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user' },
    place:{
        type: Schema.Types.ObjectId,
        ref: 'place'},
    commentBody:{
          type: String },
})

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment