const express = require('express');
const Comment = require('../Models/Comments');
const router = express.Router();

router.use(express.json())

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