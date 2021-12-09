const express = require('express');
const Comment = require('../Models/Comments');
const router = express.Router();

router.use(express.json())
router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  
    next();
  });


// GET


router.get ( '/getComment', async (request,response) => {
    try {
        const comment = await Comment.find()
        response.send(comment)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


// POST

router.post ( '/createComment', async (request,response) => {

    const createComment = new Comment ({
        body: request.body.data.body,
    })
    console.log(createComment);

    try {
        await createComment.save()
        response.status(201)
        const comments = await Comment.find()
        response.send(comments)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add");
})


// UPDATE

router.put('/updateComment/:id', async (request,response)=> {
    const allowedUpdates = ['body'];
    const updates = Object.keys(request.body.data)
    const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update))
 
    if(!isValidOperation) {
        return response.status(400).send({erro: 'Invalid updates'});
    }
    try {
        const comment = await Comment.findOne({_id: request.params.id});

        if(!comment) {return response.status(404).send(404).send()}
        updates.forEach((update)=> {
            comment[update] = request.body.data[update]
        })
        await comment.save()
        response.status(200)
        const comments = await Comment.find()
        response.send(comments)
 
    } catch(e){
        response.status(400).send(e)
        console.error(e)
    }
 })
 


// DELETE

router.delete ( '/deleteComments/:id', async (request,response) => {
    try {
        const comments = await Comment.findByIdAndDelete({_id:request.params.id})
        if (!comments) {
            return response.status(404).send()
        }
        const comments_ = await Comment.find()
        response.send(comments_)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


module.exports = router;