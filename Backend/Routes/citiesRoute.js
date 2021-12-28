const { response, request } = require('express');
const express = require('express');
const City = require('../Models/cities');
const Country = require('../Models/Countries');
const router = express.Router();
const Place = require('../Models/Places')


// GET Specific City


router.get ( '/getCity/:countryId/:cityId', async (request,response) => {
    const countryid = request.params.countryId
    const cityid = request.params.cityId
    try {
        const country = await Country.findById(countryid)

        country.cities.forEach((element)=>{
            if(element._id == cityid){
                response.send(element.places)
            }
            if (element.name == cityid){
                response.send(element._id)
            }

        }) 
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


// GET Specific Place


   router.get ( '/getPlace/:countryId/:cityId/:placeId', async (request,response) => {
    const countryId = request.params.countryId
    const cityId = request.params.cityId
    const placeId = request.params.placeId
    try {
        const country = await Country.findById(countryId)
        country.cities.forEach((element)=>{
            if(element._id == cityId){
                element.places.forEach((element1)=>{
                    if(element1._id == placeId){
                        response.send(element1)
                    }  
                }  
                )}
        }) 
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


    /// Add Place

    router.post ('/createPlace/:countryId/:cityId', async (request,response) => {
        const country = await Country.findById(request.params.countryId)
        console.log(country)
        const createPlace = new Place ({
            name: request.body.data.name,
            image: request.body.data.image,
            location: request.body.data.location,
        })
        console.log(createPlace);
        const cityid = request.params.cityId
        
        country.cities.forEach(async (elem)=>{
            if(elem._id == cityid){
                console.log("city "+ elem)
                elem.places.push(createPlace)
                try {
              await country.save()
              response.status(201)
              response.send(elem.places)
          }
          catch(e) {
              console.error(e)
          }
            }
        })
        
          console.log("Add");
      })

    
      // Delete Place
    
      router.delete ('/deletePlace/:countryId/:cityID/:placeID', async (request,response) => {
        const country = await Country.findById(request.params.countryId)
        const cityid = request.params.cityID
        const placeID = request.params.placeID;
         try {
            if (!country){    
               return response.status(404).send()
            }
            country.cities.forEach(async (elem)=>{
                if(elem._id == cityid){
                    console.log("city "+ elem)
                    await elem.places.pull({_id: placeID})
                    try {
                  await country.save()
                  response.status(201)
                  response.send(elem.places)
                        }
              catch(e) {
                  console.error(e)
              }
                }
            })
         }
         catch(e) {
             response.status(500).send();
             console.error(e)
         }
     })
    
      // Update Place
    
    //   router.put("/updatePlace/:countryId/:cityID/:placeID",
    //    async (request,response) => {
    //     const country = await Country.findById(request.params.countryId)
    //     const cityid = request.params.cityID
    //     const placeid = request.params.placeID

    //     try {
    //         if (!country){    
    //            return response.status(404).send()
    //         }

    //         country.cities.forEach(async (elem)=>{
    //             if(elem._id == cityid){
    //                 // console.log(elem.places);
    //                 elem.places.forEach(async (elem2)=>{
    //                     if(elem2._id == placeid){
    //                         console.log(elem2);
    //                         Country.update ( {_id :request.params.placeID }
    //                             ,{
    //                                 $set :{
    //                                     'places.$.name': request.body.name,
    //                                     'places.$.image': request.body.image,
    //                                     'places.$.location': request.body.location,
    //                                 },
    
    //                             },
    //                             async function (err,model){
    //                                 if (err) {
    //                                     console.log(err);
    //                                     return response.send(err);
    //                                 }  
    //                             }
    //                         ).exec();
    //                     }
    //                 // console.log(elem2)
    //                 })
    //                 try {
    //               await country.save()
    //               response.status(201)
    //               response.send(elem.places)
    //           }
    //           catch(e) {
    //               console.error(e)
    //           }
    //             }
    //         })
    //      }
    //      catch(e) {
    //          response.status(500).send();
    //          console.error(e)
    //      }       
    //   });
    

module.exports = router;