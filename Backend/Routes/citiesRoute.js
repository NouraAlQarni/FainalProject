const { response, request } = require('express');
const express = require('express');
const City = require('../Models/cities');
const router = express.Router();
const Place = require('../Models/Places')


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


    /// Add Place

    router.post ('/createPlace/:id', async (request,response) => {
        const city = await City.findById(request.params.id)
          const createPlace = new Place ({
              name: request.body.name,
              image: request.body.image,
              location: request.body.location,
          })
          console.log(createPlace);
          city.places.push(createPlace)
          try {
              await city.save()
              response.status(201)
              response.send(city)
          }
          catch(e) {
              console.error(e)
          }
          console.log("Add");
      })
      
    
      // Delete Place
    
      router.delete ('/deletePlace/:cityID/:placeID', async (request,response) => {
        const placeID = request.params.placeID;
         try {
           const city = await City.findById(request.params.cityID)
            if (!city){
               return response.status(404),send()
            }
            await city.places.pull({_id: placeID})
            await city.save()
            response.status(201).send(city)
         }
         catch(e) {
             response.status(500).send();
             console.error(e)
         }
     })
    
      // Update Place
    
      router.put("/updatePlace/:cityID/:placeID", async (request,response) => {
    
        City.update (
            {'places._id':request.params.placeID },{
                $set :{
                    'places.$.name': request.body.data.name,
                    'places.$.image': request.body.data.image,
                    'places.$.location': request.body.data.location,
                },
            },
            async function (err,model){
                if (err) {
                    console.log(err);
                    return response.send(err);
                }  
                const city = await City.findById(request.params.cityID);
                response.status(201).send(city.places)
            }
        );
      
      });
    

module.exports = router;