const express = require('express');
const Country = require('../Models/Countries');
const router = express.Router();

router.use(express.json())
router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  
    next();
  });


// GET


router.get ( '/getCountry', async (request,response) => {
    try {
        const country = await Country.find()
        response.send(country)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})

// GET Specific Country

router.get ( '/getCountry/:id', async (request,response) => {
    const _id = request.params.id
    try {
        const country = await Country.findOne({_id})
        response.send(country)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})

// POST

router.post ( '/createCountry', async (request,response) => {

    const createCountry = new Country ({
        name: request.body.name,
        image: request.body.image,
    })
    console.log(createCountry);

    try {
        await createCountry.save()
        response.status(201)
        const countries = await Country.find()
        response.send(countries)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add");
})


// UPDATE

router.put('/updateCountry/:id', async (request,response)=> {
    const allowedUpdates = ['body'];
    const updates = Object.keys(request.body.data)
    const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update))
 
    if(!isValidOperation) {
        return response.status(400).send({erro: 'Invalid updates'});
    }
    try {
        const country = await Country.findOne({_id: request.params.id});

        if(!country) {return response.status(404).send(404).send()}
        updates.forEach((update)=> {
            country[update] = request.body.data[update]
        })
        await country.save()
        response.status(200)
        const countries = await Country.find()
        response.send(countries)
 
    } catch(e){
        response.status(400).send(e)
        console.error(e)
    }
 })
 


// DELETE

router.delete ( '/deleteCountry/:id', async (request,response) => {
    try {
        const countries = await Country.findByIdAndDelete({_id:request.params.id})
        if (!countries) {
            return response.status(404).send()
        }
        const country_ = await Country.find()
        response.send(country_)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})



module.exports = router;