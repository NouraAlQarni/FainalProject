const express = require('express');
const Country = require('../Models/Countries');
const City = require('../Models/cities')
const router = express.Router();

router.use(express.json())
// router.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  
//     next();
//   });


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
        name: request.body.data.name,
        image: request.body.data.image,
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


// UPDATE Country

router.patch('/updateCountry/:id', async (request,response)=> {
    const allowedUpdates = ['name','image'];
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
 


// DELETE Country

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

    /// Add City

router.post ('/createCity/:id', async (request,response) => {
    const country= await Country.findById(request.params.id)
      const createCity = new City ({
          name: request.body.data.name,
          image: request.body.data.image,
      })
      console.log(createCity);
      country.cities.push(createCity)
      try {
          await country.save()
          response.status(201)
          response.send(country)
      }
      catch(e) {
          console.error(e)
      }
      console.log("Add");
  })

  // Delete City

  router.delete ('/deleteCity/:countryID/:cityID', async (request,response) => {
    const cityId = request.params.cityID;
     try {
       const country = await Country.findById(request.params.countryID)
        if (!country){
           return response.status(404),send()
        }
        await country.cities.pull({_id: cityId})
        await country.save()
        response.status(201).send(country)
     }
     catch(e) {
         response.status(500).send();
         console.error(e)
     }
 })

  // Update City

  router.put("/updateCity/:countryID/:cityID", async (request,response) => {

    Country.update (
        {'cities._id':request.params.cityID },{
            $set :{
                'cities.$.name': request.body.data.name,
                'cities.$.image': request.body.data.image,
            },
        },
        async function (err,model){
            if (err) {
                console.log(err);
                return response.send(err);
            }  
            const country = await Country.findById(request.params.countryID);
    response.status(201).send(country.cities)
        }
    );
  
  });
  
module.exports = router;