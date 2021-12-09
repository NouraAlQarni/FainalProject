const { response, request } = require('express');
const express = require('express');
const City = require('../Models/cities');
const router = express.Router();
const Country = require('../Models/Countries')

router.use(express.json())
router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  
    next();
  });


// GET


router.get ( '/getCity', async (request,response) => {
    try {
        const city = await City.find()
        response.send(city)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})

// GET Specific City

router.get ( '/getCity/:id', async (request,response) => {
    const _id = request.params.id
    try {
        const city = await City.findOne({_id})
        response.send(city)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


// POST

router.post ( '/createCity/:idCountry', async (request,response) => {
    const findCountry = await Country.findById(request.params.idCountry)
    if (!findCountry){
        return response.status(404).send("Not Found")
    }
    const createCity = new City ({
        name: request.body.name,
        image: request.body.image,
    })
    findCountry.cities.push(createCity);
    console.log(createCity);

    try {
        await findCountry.save()
        response.status(201)
        response.send(findCountry)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add");
})


// UPDATE

// router.put('/updateCity/:id', async (request,response)=> {
//     const allowedUpdates = ['body'];
//     const updates = Object.keys(request.body.data)
//     const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update))
 
//     if(!isValidOperation) {
//         return response.status(400).send({erro: 'Invalid updates'});
//     }
//     try {
//         const city = await City.findOne({_id: request.params.id});

//         if(!city) {return response.status(404).send(404).send()}
//         updates.forEach((update)=> {
//             city[update] = request.body.data[update]
//         })
//         await city.save()
//         response.status(200)
//         const cities = await City.find()
//         response.send(cities)
 
//     } catch(e){
//         response.status(400).send(e)
//         console.error(e)
//     }
//  })

// UpDate

router.put('/updateCity/:countryID/:cityID', async (require,response) => {
    Country.update({'cities._id': request.params.cityID},
    { '$set': {
        'cities.$.name' : request.body.name,
        'cities.$.image' : request.body.image
    }},
    function (err,modle)  {
        if (err) {
            console.log(err);
            return response.send(err)
        }
    });
    const country = await Country.findById(request.params.countryID);
    response.status(201).send(country);
})
 


// DELETE

router.delete ( '/deleteCity/:id', async (request,response) => {
    try {
        const cities = await City.findByIdAndDelete({_id:request.params.id})
        if (!cities) {
            return response.status(404).send()
        }
        const city_ = await City.find()
        response.send(city_)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


module.exports = router;