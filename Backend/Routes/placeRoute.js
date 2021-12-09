const express = require('express');
const Places = require('../Models/Places');
const  City = require('../Models/cities');
const  Country = require('../Models/Countries')
const router = express.Router();

router.use(express.json())
router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  
    next();
  });


// GET


router.get ( '/getPlace', async (request,response) => {
    try {
        const Place = await Places.find()
        response.send(Place)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


// POST

router.post ( '/createPlace2/:idCountry/:idCity', async (request,response) => {
    const findCountry = await Country.findById(request.params.idCountry).select('cities')
        const test = findCountry.cities.map(city => {
            if (city._id  == request.params.idCity ){
                return city
            }
        })   
    const findCity = await Country.findOne({_id: request.params.idCountry});
    findCity['cities'].forEach ( city => {
        if ( city._id == request.params.idCity){
            const createPlaces = new Places ({
                name: request.body.name,
                location: request.body.location,
                image: request.body.image,
                typeOfPlace: request.body.typeOfPlace
            })
            city.places.push(createPlaces);
            console.log(city.places);
        }
    })
    if (!findCity){
        return response.status(404).send("Not Found")
    }

    try {
        await findCity.save()
        response.status(201)
        response.send(findCity)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add"); 
    if (!findCountry){
        return response.status(404).send("Not Found")
    }  

})


// UPDATE

router.put('/updatePlace/:id', async (request,response)=> {
    const allowedUpdates = ['body'];
    const updates = Object.keys(request.body.data)
    const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update))
 
    if(!isValidOperation) {
        return response.status(400).send({erro: 'Invalid updates'});
    }
    try {
        const place = await Places.findOne({_id: request.params.id});

        if(!place) {return response.status(404).send(404).send()}
        updates.forEach((update)=> {
            place[update] = request.body.data[update]
        })
        await place.save()
        response.status(200)
        const places = await Places.find()
        response.send(places)
 
    } catch(e){
        response.status(400).send(e)
        console.error(e)
    }
 })
 


// DELETE

router.delete ( '/deletePlace/:id', async (request,response) => {
    try {
        const places = await Places.findByIdAndDelete({_id:request.params.id})
        if (!places) {
            return response.status(404).send()
        }
        const place_ = await Places.find()
        response.send(place_)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})



module.exports = router;